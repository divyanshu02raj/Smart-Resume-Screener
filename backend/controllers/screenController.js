const PDFParser = require("pdf2json");
const Candidate = require("../models/Candidate");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildReport } = require('../services/reportGenerator');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getTextFromPdf = (buffer) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData) => reject(new Error(errData.parserError)));
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            let rawText = "";
            for (const page of pdfData.Pages) {
                for (const text of page.Texts) {
                    for (const run of text.R) {
                        rawText += decodeURIComponent(run.T);
                    }
                    rawText += " ";
                }
            }
            resolve(rawText.trim());
        });
        pdfParser.parseBuffer(buffer);
    });
};


const callGeminiAPI = async (resumeText, jobDescription) => {
    const prompt = `
      You are an elite technical recruiter and former Principal Engineer at a top tech company. You have extremely high standards and an expert eye for talent. Your task is to analyze the provided resume against the job description with meticulous detail and provide a brutally honest, structured evaluation in a JSON object.

      **Internal Thought Process (Follow these steps silently before generating the JSON):**
      1.  **First Pass:** Read the entire resume to get a general impression.
      2.  **Keyword Match:** Compare the specific technologies, languages, and tools listed in the "Required Skills" of the job description against the resume. Be strict.
      3.  **Impact Assessment:** Scrutinize the project and experience descriptions for quantifiable results (e.g., numbers, percentages, user metrics). Vague descriptions are a negative sign.
      4.  **Quality Assessment:** Evaluate the depth and complexity of the projects. Are they simple tutorial clones or do they demonstrate genuine problem-solving?
      5.  **Final Deliberation:** Based on the above, formulate a justification and assign scores for each criterion using the strict rubric below.

      **Scoring Rubric (Use this to assign your scores from 1 to 10):**
      -   **Experience_Relevance:** 10 = Perfect professional experience match. 7-9 = Relevant project or internship experience. 4-6 = Some related projects but not a direct match. 1-3 = No relevant experience.
      -   **Skills_Match:** 10 = Matches all required skills. 7-9 = Matches most skills. 4-6 = Matches some key skills but has significant gaps. 1-3 = Lacks most required skills.
      -   **Project_Quality:** 10 = Projects show unique problem-solving and quantifiable impact. 7-9 = Projects are well-executed and relevant. 4-6 = Projects are standard or tutorial-level. 1-3 = Projects are trivial or not described well.
      -   **Educational_Fit:** 10 = Specialized degree directly relevant to the role. 7-9 = Relevant field of study. 4-6 = Unrelated field but with some technical coursework. 1-3 = No relevant education.

      **Final Instruction:** Your entire response must be a single, raw JSON object and nothing else. Do not wrap it in markdown backticks or the word "json".

      **Required JSON Output Format:**
      {
        "candidate_name": "Full Name",
        "justification": "Your brutally honest, expert justification for the overall score.",
        "candidate_skills": ["List of skills found"],
        "missing_skills": ["List of skills missing"],
        "criteria_scores": {
          "Experience_Relevance": <Score based on rubric>,
          "Skills_Match": <Score based on rubric>,
          "Project_Quality": <Score based on rubric>,
          "Educational_Fit": <Score based on rubric>
        }
      }

      ---
      **DATA FOR ANALYSIS:**
      Job Description:
      ${jobDescription}
      ---
      Resume Text:
      ${resumeText}
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const jsonResponse = JSON.parse(cleanedText);

        const scores = jsonResponse.criteria_scores;
        if (scores) {
            const weightedScore =
                (scores.Experience_Relevance * 3.5) +
                (scores.Skills_Match * 3.5) +
                (scores.Project_Quality * 2.0) +
                (scores.Educational_Fit * 1.0);
            jsonResponse.match_score = Math.round(weightedScore);
        } else {
            jsonResponse.match_score = 50;
        }

        return jsonResponse;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};

exports.screenResume = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one resume file is required." });
        }
        const { jobDescription } = req.body;
        if (!jobDescription) {
            return res.status(400).json({ error: "Job description is required." });
        }

        const processingPromises = req.files.map(async (file) => {
            const resumeText = await getTextFromPdf(file.buffer);
            const screeningResult = await callGeminiAPI(resumeText, jobDescription);
            const newCandidate = new Candidate({
                jobDescription,
                resumeText,
                screeningResult,
            });
            newCandidate.screeningResult.candidate_name = screeningResult.candidate_name || file.originalname;
            return newCandidate.save();
        });

        const initialResults = await Promise.all(processingPromises);

        res.status(201).json(initialResults);

    } catch (error) {
        console.error("Error in screenResume controller:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
};



exports.generateReport = async (req, res) => {
    const { results } = req.body;
    
    // IMPORTANT: Replace this placeholder with your actual deployed Vercel URL
    const appUrl = "https://smart-resume-screener-one.vercel.app/";

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=screening_report.pdf');

    await buildReport(
        (chunk) => res.write(chunk),
        () => res.end(),
        results,
        appUrl
    );
};