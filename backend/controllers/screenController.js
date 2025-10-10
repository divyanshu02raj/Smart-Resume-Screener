const PDFParser = require("pdf2json");
const Candidate = require("../models/Candidate");
const Groq = require("groq-sdk");

// Initialize Groq AI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Helper function to parse PDF (unchanged)
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

// Helper function to call Groq API
const callGroqAPI = async (resumeText, jobDescription) => {
    const prompt = `
        Analyze the following resume against the provided job description and return a structured JSON object.
        The JSON object must have the following schema:
        {
          "match_score": <A number from 1 to 10>,
          "justification": "<A concise paragraph explaining the score>",
          "candidate_skills": ["<An array of relevant skills from the resume>"],
          "missing_skills": ["<An array of key skills from the job description missing in the resume>"]
        }
        ---
        Job Description:
        ${jobDescription}
        ---
        Resume Text:
        ${resumeText}
    `;

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile", // Using the LLaMA 3 model you've used before
            temperature: 0.2,
            response_format: { type: "json_object" }, // This forces the output to be valid JSON
        });

        const jsonResponse = completion.choices[0]?.message?.content;
        return JSON.parse(jsonResponse);
    } catch (error) {
        console.error("Error calling Groq API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};

// Main controller function (largely unchanged)
exports.screenResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "Resume file is required." });
        const { jobDescription } = req.body;
        if (!jobDescription) return res.status(400).json({ error: "Job description is required." });

        const resumeText = await getTextFromPdf(req.file.buffer);
        const screeningResult = await callGroqAPI(resumeText, jobDescription);

        const newCandidate = new Candidate({
            jobDescription,
            resumeText,
            screeningResult,
        });
        const savedCandidate = await newCandidate.save();

        res.status(201).json(savedCandidate);
    } catch (error) {
        console.error("Error in screenResume controller:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
};