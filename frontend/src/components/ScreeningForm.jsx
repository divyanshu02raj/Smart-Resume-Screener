import React from 'react';

const ScreeningForm = ({
  jobDescription,
  setJobDescription,
  handleFileChange,
  handleSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-bold mb-2">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
          rows="8"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="resume" className="block text-gray-700 text-sm font-bold mb-2">
          Upload Resume (PDF)
        </label>
        <input
          id="resume"
          type="file"
          accept=".pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Screening...' : 'Screen Resume'}
        </button>
      </div>
    </form>
  );
};

export default ScreeningForm;