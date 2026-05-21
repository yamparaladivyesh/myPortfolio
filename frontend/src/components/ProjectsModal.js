import React from 'react';
import ModalWrapper from './ModalWrapper';

const ProjectsModal = ({ open, onClose, projectIndex, onChangeProject, projectList }) => {
  const project = projectList[projectIndex];
  const isFirst = projectIndex === 0;
  const isLast = projectIndex === projectList.length - 1;

  return (
    <ModalWrapper open={open} onClose={onClose} title="Projects" className="projects-modal">
      <div className="projects-inner">
        <div className="project-detail project-card">
          <div className="project-header project-header-simple">
            <h4>{project.title}</h4>
            <div className="project-tags">
              {project.stack.map((stack) => (
                <span key={stack} className="project-tag">
                  {stack}
                </span>
              ))}
            </div>
          </div>

          <p className="project-summary">{project.summary}</p>

          <div className="project-features">
            <h5>Features</h5>
            <ul>
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="project-links">
            <a className="project-button" href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {project.liveDemo ? (
              <a className="project-button secondary" href={project.liveDemo} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            ) : (
              <span className="project-note">Live demo not available</span>
            )}
          </div>
        </div>

        <div className="project-navigation-simple">
          <button className="nav-button" onClick={() => onChangeProject('prev')} disabled={isFirst}>
            Previous
          </button>
          <div className="project-slide-info">
            {projectIndex + 1} / {projectList.length}
          </div>
          <button className="nav-button" onClick={() => onChangeProject('next')} disabled={isLast}>
            Next
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProjectsModal;
