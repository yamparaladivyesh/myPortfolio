import React from 'react';
import ModalWrapper from './ModalWrapper';

const SkillsModal = ({ open, onClose, skillGroups }) => {
  return (
    <ModalWrapper open={open} onClose={onClose} title="Skills">
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.title} className="skill-group">
            <h4>{group.title}</h4>
            <div className="skill-pills">
              {group.items.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default SkillsModal;
