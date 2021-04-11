import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';
import UserMenu from '../user-menu/user-menu.component';

import { AppContext } from '../../hooks/useAppState';

import './nav-bar.styles.scss';

const NavBar = () => {
  const {
    userState: { currentUser, userLoading },
    uiState: { showUserMenu },
    setUserState,
    setUiState,
  } = useContext(AppContext);

  return (
    <div className="nav-bar">
      {userLoading ? (
        <Spinner isLoading={userLoading} />
      ) : currentUser ? (
        <div className="nav-bar__user">
          <div className="nav-bar__block">
            <CustomButton
              navbar
              navbarUser
              handleClick={() => setUiState({ type: 'TOOGLE_USER_MENU' })}
            >
              {currentUser.name}
            </CustomButton>
            <div className={`${showUserMenu ? 'open' : ''} nav-bar__arrow`}>&#x25BC;</div>
          </div>
          <CustomButton navbar handleClick={() => setUserState({ type: 'USER_LOGOUT' })}>
            Wyloguj
          </CustomButton>
        </div>
      ) : (
        <div className="nav-bar__guest">
          <Link className="nav-bar__link" to="/signin">
            Zaloguj
          </Link>
          <Link className="nav-bar__link" to="/signup">
            Zarejestruj
          </Link>
        </div>
      )}
      {showUserMenu && <UserMenu />}
    </div>
  );
};

export default NavBar;
