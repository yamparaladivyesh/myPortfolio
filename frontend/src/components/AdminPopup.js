import React, { useState } from 'react';
import { LuSettings2, LuFolder, LuPencil, LuTrash2, LuGripVertical, LuX } from 'react-icons/lu';

const AdminPopup = ({ open, onClose, onLogout, skillGroups, onUpdateSkillGroups, projectList, onUpdateProjects, onMoveProject }) => {
  const [activeTab, setActiveTab] = useState('skills');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectSummary, setNewProjectSummary] = useState('');
  const [newProjectStack, setNewProjectStack] = useState('');
  const [newProjectFeatures, setNewProjectFeatures] = useState('');
  const [newProjectGithub, setNewProjectGithub] = useState('');
  const [newProjectDemo, setNewProjectDemo] = useState('');
  const [draggedSkillIndex, setDraggedSkillIndex] = useState(null);
  const [draggedSkillCategory, setDraggedSkillCategory] = useState(null);
  const [draggedProjectIndex, setDraggedProjectIndex] = useState(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  if (!open) return null;

  const handleAddSkill = (event) => {
    event.preventDefault();
    if (!newSkillName.trim()) return;
    const updated = skillGroups.map((group) =>
      group.title === newSkillCategory
        ? { ...group, items: [...group.items, newSkillName.trim()] }
        : group
    );
    onUpdateSkillGroups(updated);
    setNewSkillName('');
  };

  const handleDeleteSkill = (category, skill) => {
    const updated = skillGroups.map((group) =>
      group.title === category
        ? { ...group, items: group.items.filter((item) => item !== skill) }
        : group
    );
    onUpdateSkillGroups(updated);
  };

  const handleSkillDragStart = (e, categoryIndex, skillIndex) => {
    setDraggedSkillIndex(skillIndex);
    setDraggedSkillCategory(categoryIndex);
  };

  const handleSkillDragOver = (e) => {
    e.preventDefault();
  };

  const handleSkillDrop = (e, categoryIndex, targetSkillIndex) => {
    e.preventDefault();
    if (draggedSkillCategory === categoryIndex && draggedSkillIndex !== targetSkillIndex) {
      const group = skillGroups[categoryIndex];
      const items = [...group.items];
      const [draggedItem] = items.splice(draggedSkillIndex, 1);
      items.splice(targetSkillIndex, 0, draggedItem);
      const updated = skillGroups.map((g, idx) =>
        idx === categoryIndex ? { ...g, items } : g
      );
      onUpdateSkillGroups(updated);
    }
    setDraggedSkillIndex(null);
    setDraggedSkillCategory(null);
  };

  const resetProjectForm = () => {
    setEditingProjectIndex(null);
    setNewProjectTitle('');
    setNewProjectSummary('');
    setNewProjectStack('');
    setNewProjectFeatures('');
    setNewProjectGithub('');
    setNewProjectDemo('');
  };

  const handleProjectSubmit = (event) => {
    event.preventDefault();
    if (!newProjectTitle.trim()) return;

    const nextProject = {
      title: newProjectTitle.trim(),
      stack: newProjectStack.split(',').map((item) => item.trim()).filter(Boolean),
      summary: newProjectSummary.trim(),
      features: newProjectFeatures.split(',').map((item) => item.trim()).filter(Boolean),
      github: newProjectGithub.trim() || '#',
      liveDemo: newProjectDemo.trim(),
    };

    if (editingProjectIndex !== null) {
      const updated = projectList.map((project, index) =>
        index === editingProjectIndex ? nextProject : project
      );
      onUpdateProjects(updated);
    } else {
      onUpdateProjects([...projectList, nextProject]);
    }

    resetProjectForm();
  };

  const handleDeleteProject = (index) => {
    const updated = projectList.filter((_, projectIndex) => projectIndex !== index);
    onUpdateProjects(updated);
    if (editingProjectIndex === index) {
      resetProjectForm();
    } else if (editingProjectIndex !== null && index < editingProjectIndex) {
      setEditingProjectIndex(editingProjectIndex - 1);
    }
  };

  const handleEditProject = (index) => {
    const project = projectList[index];
    setEditingProjectIndex(index);
    setNewProjectTitle(project.title);
    setNewProjectSummary(project.summary);
    setNewProjectStack(project.stack.join(', '));
    setNewProjectFeatures(project.features.join(', '));
    setNewProjectGithub(project.github);
    setNewProjectDemo(project.liveDemo || '');
    setActiveTab('projects');
  };

  const handleProjectDragStart = (e, index) => {
    setDraggedProjectIndex(index);
  };

  const handleProjectDragOver = (e) => {
    e.preventDefault();
  };

  const handleProjectDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedProjectIndex !== null && draggedProjectIndex !== targetIndex) {
      const newProjects = [...projectList];
      const [draggedProject] = newProjects.splice(draggedProjectIndex, 1);
      newProjects.splice(targetIndex, 0, draggedProject);
      onUpdateProjects(newProjects);
    }
    setDraggedProjectIndex(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="admin-overlay" onClick={handleOverlayClick}>
      <div className="admin-panel-modal">
        {/* Header */}
        <div className="admin-panel-header">
          <div className="admin-header-content">
            <div className="admin-header-icon">
              <LuSettings2 />
            </div>
            <div>
              <h2 className="admin-title">Admin Panel</h2>
              <p className="admin-subtitle">Dashboard Management</p>
            </div>
          </div>
          <button className="admin-close-btn" onClick={onClose} title="Close">
            <LuX />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <span className="tab-icon">
              <LuSettings2 />
            </span>
            Manage Skills
          </button>
          <button
            className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="tab-icon">
              <LuFolder />
            </span>
            Manage Projects
          </button>
        </div>

        {/* Content */}
        <div className="admin-content">
          {/* Manage Skills Tab */}
          {activeTab === 'skills' && (
            <div className="admin-tab-content">
              {/* Add Skill Form */}
              <form className="admin-add-form" onSubmit={handleAddSkill}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter skill name"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="admin-input"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="admin-select"
                    >
                      {skillGroups.map((group) => (
                        <option key={group.title} value={group.title}>
                          {group.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="admin-btn-add">
                    + Add
                  </button>
                </div>
              </form>

              {/* Skills Display */}
              <div className="admin-skills-container">
                {skillGroups.map((group, categoryIndex) => (
                  <div key={group.title} className="skill-category">
                    <h4 className="category-title">{group.title}</h4>
                    <div className="skill-pills-grid">
                      {group.items.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className={`skill-pill ${draggedSkillIndex === skillIndex && draggedSkillCategory === categoryIndex ? 'dragging' : ''}`}
                          draggable
                          onDragStart={(e) => handleSkillDragStart(e, categoryIndex, skillIndex)}
                          onDragOver={handleSkillDragOver}
                          onDrop={(e) => handleSkillDrop(e, categoryIndex, skillIndex)}
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            className="skill-delete-btn"
                            onClick={() => handleDeleteSkill(group.title, skill)}
                            title="Delete skill"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manage Projects Tab */}
          {activeTab === 'projects' && (
            <div className="admin-tab-content">
              {/* Add Project Form */}
              <form className="admin-add-form" onSubmit={handleProjectSubmit}>
                <div className="form-column">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Project title"
                      value={newProjectTitle}
                      onChange={(e) => setNewProjectTitle(e.target.value)}
                      className="admin-input"
                      style={{ flex: 2 }}
                    />
                    <input
                      type="text"
                      placeholder="Tech stack (comma separated)"
                      value={newProjectStack}
                      onChange={(e) => setNewProjectStack(e.target.value)}
                      className="admin-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Description"
                      value={newProjectSummary}
                      onChange={(e) => setNewProjectSummary(e.target.value)}
                      className="admin-input"
                      style={{ flex: 1 }}
                    />
                    <input
                      type="text"
                      placeholder="Features (comma separated)"
                      value={newProjectFeatures}
                      onChange={(e) => setNewProjectFeatures(e.target.value)}
                      className="admin-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="url"
                      placeholder="GitHub link"
                      value={newProjectGithub}
                      onChange={(e) => setNewProjectGithub(e.target.value)}
                      className="admin-input"
                      style={{ flex: 1 }}
                    />
                    <input
                      type="url"
                      placeholder="Demo link"
                      value={newProjectDemo}
                      onChange={(e) => setNewProjectDemo(e.target.value)}
                      className="admin-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div className="form-row form-actions-row">
                    <button type="submit" className="admin-btn-add" style={{ width: '100%' }}>
                      {editingProjectIndex !== null ? 'Update Project' : '+ Add Project'}
                    </button>
                    {editingProjectIndex !== null && (
                      <button type="button" className="admin-btn-cancel" onClick={resetProjectForm}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Projects List */}
              <div className="admin-projects-container">
                {projectList.length === 0 ? (
                  <div className="empty-state">
                    <p>No projects yet. Add your first project above!</p>
                  </div>
                ) : (
                  projectList.map((project, index) => (
                    <div
                      key={index}
                      className={`project-card ${draggedProjectIndex === index ? 'dragging' : ''}`}
                      draggable
                      onDragStart={(e) => handleProjectDragStart(e, index)}
                      onDragOver={handleProjectDragOver}
                      onDrop={(e) => handleProjectDrop(e, index)}
                    >
                      <div className="project-drag-handle">
                        <LuGripVertical />
                      </div>
                      <div className="project-card-content">
                        <h4 className="project-title">{project.title}</h4>
                        <p className="project-summary">{project.summary || 'No description'}</p>
                        {project.stack && project.stack.length > 0 && (
                          <div className="project-stack">
                            {project.stack.map((tech) => (
                              <span key={tech} className="tech-badge">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="project-actions">
                        <button
                          type="button"
                          className="project-btn edit-btn"
                          onClick={() => handleEditProject(index)}
                          title="Edit project"
                        >
                          <LuPencil />
                        </button>
                        <button
                          type="button"
                          className="project-btn delete-btn"
                          onClick={() => handleDeleteProject(index)}
                          title="Delete project"
                        >
                          <LuTrash2 />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="admin-panel-footer">
          <button className="admin-btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPopup;
