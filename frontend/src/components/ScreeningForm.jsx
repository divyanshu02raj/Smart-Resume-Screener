import React from 'react';

const ScreeningForm = ({ jobDescription, setJobDescription, handleFileChange, handleSubmit, isLoading }) => {
  return (
    <div className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl shadow-lg transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-2xl">
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="jobDescription" className="block text-gray-800 dark:text-text-primary font-semibold mb-2">Job Description</label>
            <textarea
              id="jobDescription"
              className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg text-gray-800 dark:text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition"
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="resumes" className="block text-gray-800 dark:text-text-primary font-semibold mb-2">Upload Resumes (PDFs)</label>
            <input
              id="resumes"
              type="file"
              accept=".pdf"
              multiple
              className="block w-full text-sm text-gray-500 dark:text-text-secondary file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-700 transition cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center pt-4">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:shadow-none"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Screen Resumes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScreeningForm;