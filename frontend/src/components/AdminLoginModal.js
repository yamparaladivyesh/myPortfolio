import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { LuShield, LuLock, LuArrowRight } from 'react-icons/lu';

const AdminLoginModal = ({ open, onClose, onUnlock }) => {
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password.trim()) return;
    onUnlock();
    setPassword('');
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="" className="admin-login-modal">
      <div className="admin-login-premium">
        <div className="admin-header-premium">
          <div className="admin-icon-shield">
            <LuShield />
          </div>
          <h2 className="admin-title-premium">Admin Access</h2>
          <p className="admin-subtitle-premium">Secure portfolio management access</p>
        </div>

        <form className="admin-form-premium" onSubmit={handleSubmit}>
          <div className={`admin-input-wrapper ${isFocused ? 'focused' : ''}`}>
            <span className="admin-lock-icon">
              <LuLock />
            </span>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="admin-password-input"
            />
          </div>

          <button className="admin-unlock-button" type="submit">
            <span className="unlock-icon">
              <LuArrowRight />
            </span>
            <span>Access Dashboard</span>
          </button>

          <p className="admin-security-note">Secure portfolio management access</p>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default AdminLoginModal;
