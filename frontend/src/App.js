import { useState } from 'react';
import axios from 'axios';
import ScreeningForm from './components/ScreeningForm';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) {
      setError('Please provide both a job description and a resume file.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5001/api/screen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      setError('An error occurred. Please check the console and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Smart Resume Screener</h1>
          <p className="text-gray-600 mt-2">Upload a resume and job description to get an AI-powered match analysis.</p>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-8">
          <ScreeningForm
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          <div className="mt-6">
            {isLoading && <Loader />}
            <ErrorMessage message={error} />
            <ResultDisplay result={result} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;