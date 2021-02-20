import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

import { AppContext } from '../../hooks/useAppState';

import './nav-bar.styles.scss';

const NavBar = () => {
  const { currentUser, setCurrentUser, setToken, userLoading } = useContext(
    AppContext
  );

  return (
    <div className="nav-bar">
      {userLoading ? (
        <Spinner isLoading={userLoading} />
      ) : currentUser ? (
        <div className="nav-bar__user">
          <Link className="nav-bar__link nav-bar__link--username" to="/preview">
            {currentUser.name}
          </Link>
          <CustomButton
            navbar
            handleClick={() => {
              localStorage.removeItem('token');
              setToken(null);
              setCurrentUser(null);
            }}
          >
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
    </div>
  );
};

export default NavBar;
