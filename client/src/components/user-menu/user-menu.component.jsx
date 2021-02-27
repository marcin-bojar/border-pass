import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../hooks/useAppState.js';

import './user-menu.styles.scss';

const UserMenu = () => {
  const { showUserMenu, setShowUserMenu } = useContext(AppContext);
  const menuRef = useRef(null);

  const handleClick = e => {
    if (e.target !== menuRef.current) setShowUserMenu(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  });

  if (!showUserMenu) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <Link className="user-menu__link" to="/preview">
        Podgląd zestawienia
      </Link>
      <Link className="user-menu__link" to="/send">
        Wyślij zestawienie
      </Link>
      <Link className="user-menu__link" to="/config">
        Ustawienia
      </Link>
    </div>
  );
};

export default UserMenu;
