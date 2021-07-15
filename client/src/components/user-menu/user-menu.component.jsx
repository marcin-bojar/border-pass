import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../hooks/useAppState.js';

import './user-menu.styles.scss';

const UserMenu = () => {
  const {
    uiState: { showUserMenu },
    setUiState,
  } = useContext(AppContext);
  const menuRef = useRef(null);

  const handleClick = e => {
    if (e.target !== menuRef.current) setUiState({ type: 'HIDE_USER_MENU' });
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  });

  if (!showUserMenu) return null;

  return (
    <div className="user-menu" ref={menuRef} data-test="user-menu">
      <ul className="user-menu__list">
        <li className="user-menu__list-item">
          <Link className="user-menu__link" to="/preview">
            Podgląd zestawienia
          </Link>
        </li>
        <li className="user-menu__list-item">
          {' '}
          <Link className="user-menu__link" to="/send">
            Wyślij zestawienie
          </Link>
        </li>
        <li className="user-menu__list-item">
          <Link className="user-menu__link" to="/archive">
            Archiwum
          </Link>
        </li>
        <li className="user-menu__list-item">
          <Link className="user-menu__link" to="/config">
            Ustawienia
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
