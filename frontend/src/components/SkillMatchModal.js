import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';

const sampleResults = {
  percentage: 78,
  matchingSkills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'REST APIs'],
  missingSkills: ['GraphQL', 'Docker', 'Kubernetes', 'TypeScript'],
};

const SkillMatchModal = ({ open, onClose }) => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (event) => {
    event.preventDefault();
    if (!description.trim()) return;

    setError('');
    setIsLoading(true);
    setAnalysis(null);

    await new Promise((resolve) => setTimeout(resolve, 700));
    setAnalysis(sampleResults);
    setIsLoading(false);
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="SkillMatch">
      <div className="skillmatch-inner">
        <form className="skillmatch-form" onSubmit={handleAnalyze}>
          <label htmlFor="job-description">Job Description</label>
          <textarea
            id="job-description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setAnalysis(null);
              setError('');
            }}
            placeholder="Paste the job description text here..."
          />
          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>

        {error && <div className="skillmatch-error">{error}</div>}

        {isLoading && (
          <div className="analysis-card analysis-loading">
            <div className="loading-dot" />
            <p>Matching skills and insights are being generated...</p>
          </div>
        )}

        {analysis && (
          <div className="skillmatch-result-grid">
            <div className="match-circle-card">
              <div className="match-graph">
                <div className="match-graph-inner">
                  <strong>{analysis.percentage}%</strong>
                  <span>Match</span>
                </div>
              </div>
            </div>

            <div className="match-analysis-box">
              <div className="analysis-group-header">
                <h5>Matching Skills</h5>
              </div>
              <div className="skill-match-tag-grid">
                {analysis.matchingSkills.map((skill) => (
                  <span key={skill} className="skill-match-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="match-analysis-box">
              <div className="analysis-group-header">
                <h5>Missing Skills</h5>
              </div>
              <div className="skill-match-tag-grid">
                {analysis.missingSkills.map((skill) => (
                  <span key={skill} className="skill-miss-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default SkillMatchModal;
