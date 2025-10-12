import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import ScreeningForm from './components/ScreeningForm';
import ResultsDashboard from './components/ResultsDashboard';
import ThemeToggle from './components/ThemeToggle';
import { motion } from 'framer-motion';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFiles, setResumeFiles] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  // Fetch history when the app loads
  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://smart-resume-screener-mcth.onrender.com/api/screen'); //http://localhost:5001
        setResults(response.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError('Could not load past screening results.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleFileChange = (e) => setResumeFiles(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFiles || resumeFiles.length === 0 || !jobDescription) {
      setError('Please provide a job description and at least one resume file.');
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < resumeFiles.length; i++) { formData.append('resumes', resumeFiles[i]); }
    formData.append('jobDescription', jobDescription);
    setIsLoading(true);
    setError('');
    setResults([]);
    try {
      const response = await axios.post('https://smart-resume-screener-mcth.onrender.com/api/screen', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); //http://localhost:5001
      setResults(response.data);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (results.length === 0) return;
    setIsDownloading(true);
    setError('');
    try {
        const response = await axios.post('https://smart-resume-screener-mcth.onrender.com/api/screen/report', { results }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'screening_report.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        setError("Could not generate the report.");
        console.error(err);
    } finally {
        setIsDownloading(false);
    }
  };

  const summaryStats = useMemo(() => {
    if (results.length === 0) { return { total: 0, topTier: 0, topCandidate: 'N/A' }; }
    const topTierCount = results.filter(r => r.screeningResult.match_score >= 80).length;
    const sorted = [...results].sort((a, b) => b.screeningResult.match_score - a.screeningResult.match_score);
    const top = sorted[0]?.screeningResult.candidate_name || 'N/A';
    return { total: results.length, topTier: topTierCount, topCandidate: top };
  }, [results]);

  return (
    <div className="min-h-screen w-full p-4 sm:p-8 bg-gray-100 dark:bg-background">
      <ThemeToggle />
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-3xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white">Smart Resume Screener</h1>
        <p className="text-gray-500 dark:text-text-secondary mt-3 text-lg">Instantly transform resumes into actionable intelligence.</p>
      </motion.header>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ScreeningForm
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <ResultsDashboard
            isLoading={isLoading}
            error={error}
            results={results}
            stats={summaryStats}
            onDownload={handleDownloadReport}
            isDownloading={isDownloading}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default App;