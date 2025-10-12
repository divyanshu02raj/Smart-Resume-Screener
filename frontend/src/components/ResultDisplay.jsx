import React from 'react';

const SkillTag = ({ skill, type }) => {
  const typeClasses = type === 'candidate' ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300';
  return <span className={`px-3 py-1 text-sm font-medium rounded-md ${typeClasses}`}>{skill}</span>;
};

const CriteriaBar = ({ label, score }) => {
    const percentage = score * 10;
    const barGradient = percentage >= 80 ? 'from-green-400 to-emerald-500' : percentage >= 50 ? 'from-yellow-400 to-amber-500' : 'from-red-400 to-rose-500';
    return (
        <div>
            <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-medium text-gray-700">{label.replace(/_/g, ' ')}</span>
                <span className="font-bold text-gray-800">{score}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`bg-gradient-to-r ${barGradient} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div></div>
        </div>
    );
};

const ResultDisplay = ({ result }) => {
  if (!result) return null;
  const { justification, candidate_skills, missing_skills, criteria_scores } = result.screeningResult;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Analyst's Justification</h3>
        <p className="text-text-secondary leading-relaxed">{justification}</p>
      </div>
      {criteria_scores && (
        <div className="rounded-lg p-4 bg-background">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Score Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{Object.entries(criteria_scores).map(([key, value]) => (<CriteriaBar key={key} label={key} score={value} />))}</div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-3">Candidate's Strengths</h3>
          <div className="flex flex-wrap gap-2">{candidate_skills?.map((skill, index) => (<SkillTag key={`candidate-${index}`} skill={skill} type="candidate" />))}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-3">Areas for Improvement</h3>
          <div className="flex flex-wrap gap-2">{missing_skills?.map((skill, index) => (<SkillTag key={`missing-${index}`} skill={skill} type="missing" />))}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;