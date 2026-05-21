import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutModal from './components/AboutModal';
import SkillsModal from './components/SkillsModal';
import ProjectsModal from './components/ProjectsModal';
import SkillMatchModal from './components/SkillMatchModal';
import ProfilesDropdown from './components/ProfilesDropdown';
import ContactDropdown from './components/ContactDropdown';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPopup from './components/AdminPopup';
import Footer from './components/Footer';
import { projectList as initialProjectList, skillGroups as initialSkillGroups } from './data/portfolioData';

function App() {
  const [activePanel, setActivePanel] = useState(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [skillGroups, setSkillGroups] = useState(initialSkillGroups);
  const [projectList, setProjectList] = useState(initialProjectList);

  const handleTogglePanel = (panelName) => {
    setActivePanel((current) => {
      const next = current === panelName ? null : panelName;
      if (next !== 'admin') {
        setAdminUnlocked(false);
      }
      return next;
    });
    setMobileOpen(false);
  };

  const handleClosePanel = () => {
    setActivePanel(null);
    setAdminUnlocked(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClosePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChangeProject = (direction) => {
    setProjectIndex((current) => {
      if (direction === 'next' && current < projectList.length - 1) {
        return current + 1;
      }
      if (direction === 'prev' && current > 0) {
        return current - 1;
      }
      return current;
    });
  };

  const handleUpdateSkillGroups = (newGroups) => {
    setSkillGroups(newGroups);
  };

  const handleUpdateProjects = (newProjects) => {
    setProjectList(newProjects);
    setProjectIndex((current) => Math.min(current, newProjects.length - 1));
  };

  const handleMoveProject = (index, direction) => {
    setProjectList((currentProjects) => {
      const next = [...currentProjects];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return next;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleAdminUnlock = () => {
    setAdminUnlocked(true);
  };

  const handleAdminLogout = () => {
    setAdminUnlocked(false);
    setActivePanel(null);
  };

  return (
    <div className="app-shell">
      <Navbar
        activePanel={activePanel}
        onTogglePanel={handleTogglePanel}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="page-content">
        <HeroSection />

        <Footer />
      </main>

      <AboutModal open={activePanel === 'about'} onClose={handleClosePanel} />
      <SkillsModal open={activePanel === 'skills'} onClose={handleClosePanel} skillGroups={skillGroups} />
      <ProjectsModal
        open={activePanel === 'projects'}
        onClose={handleClosePanel}
        projectIndex={projectIndex}
        onChangeProject={handleChangeProject}
        projectList={projectList}
      />
      <SkillMatchModal open={activePanel === 'skillmatch'} onClose={handleClosePanel} />
      <ProfilesDropdown open={activePanel === 'profiles'} onClose={handleClosePanel} />
      <ContactDropdown open={activePanel === 'contact'} onClose={handleClosePanel} />
      <AdminLoginModal open={activePanel === 'admin' && !adminUnlocked} onClose={handleClosePanel} onUnlock={handleAdminUnlock} />
      <AdminPopup
        open={activePanel === 'admin' && adminUnlocked}
        onClose={handleClosePanel}
        onLogout={handleAdminLogout}
        skillGroups={skillGroups}
        onUpdateSkillGroups={handleUpdateSkillGroups}
        projectList={projectList}
        onUpdateProjects={handleUpdateProjects}
        onMoveProject={handleMoveProject}
      />
    </div>
  );
}

export default App;



