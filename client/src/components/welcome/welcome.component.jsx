import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './welcome.styles.scss';

const Welcome = () => {
  const {
    userState: { currentUser, guestUser },
    setUserState,
  } = useContext(AppContext);

  const noUserContent = (
    <>
      <p className="welcome__text" data-test="text">
        <Link to="/signin" className="welcome__link" data-test="link">
          Zaloguj się
        </Link>
        , aby wczytać swoją historię przekroczeń granic.
      </p>
      <p className="welcome__text" data-test="text">
        <Link to="/signup" className="welcome__link" data-test="link">
          Zarejestruj się
        </Link>
        , aby utworzyć nowe konto.
      </p>
      <p className="welcome__text" data-test="text">
        <CustomButton
          link
          handleClick={() => setUserState({ type: 'SET_GUEST_USER', payload: true })}
        >
          Kontynuuj jako gość.
        </CustomButton>
        &nbsp;Pamietaj jednak, że Twoja historia przekroczeń granic będzie w tym przypadku
        zapisywana w pamięci Twojego urządzenia, co grozi utratą danych. Nie będziesz miał również
        możliwości wysyłania zestawienia do firmy.
      </p>
    </>
  );

  return (
    <div className="welcome">
      <h3 className="welcome__title" data-test="title">
        Witaj w Border Pass!
      </h3>
      {currentUser || guestUser ? (
        <p className="welcome__text" data-test="text">
          W jakim obecnie znajdujesz się kraju?
        </p>
      ) : (
        noUserContent
      )}
    </div>
  );
};

export default Welcome;
