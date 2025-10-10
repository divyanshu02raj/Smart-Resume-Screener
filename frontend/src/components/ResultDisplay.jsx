import React from 'react';

const SkillTag = ({ skill, type }) => {
  const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full';
  const typeClasses = type === 'candidate'
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
  return <span className={`${baseClasses} ${typeClasses}`}>{skill}</span>;
};

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const { match_score, justification, candidate_skills, missing_skills } = result.screeningResult;

  const scoreColor = match_score >= 8 ? 'text-green-500' : match_score >= 5 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="mt-8 p-6 border rounded-lg bg-gray-50 shadow-sm animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Screening Result</h2>
      <div className="space-y-6">
        {/* Score and Justification */}
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className={`text-5xl font-bold ${scoreColor}`}>{match_score}<span className="text-3xl text-gray-400">/10</span></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Match Score</h3>
              <p className="text-gray-600 mt-1">{justification}</p>
            </div>
          </div>
        </div>

        {/* Candidate Skills */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Candidate's Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {candidate_skills.map((skill, index) => (
              <SkillTag key={`candidate-${index}`} skill={skill} type="candidate" />
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Areas for Improvement</h3>
          <div className="flex flex-wrap gap-2">
            {missing_skills.map((skill, index) => (
              <SkillTag key={`missing-${index}`} skill={skill} type="missing" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;