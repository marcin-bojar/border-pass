import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../hooks/useAppState';

import './welcome.styles.scss';

const Welcome = () => {
  const { currentUser } = useContext(AppContext);

  const noUserContent = (
    <>
      <p className="welcome__text">
        <Link to="/signin" className="welcome__link">
          Zaloguj się
        </Link>
        , aby wczytać swoją historię przekroczeń granic.
      </p>
      <p className="welcome__text">
        <Link to="/signup" className="welcome__link">
          Zarejestruj się
        </Link>
        , aby utworzyć nowe konto.
      </p>
      <p className="welcome__text">
        Możesz również kontynuować jako niezalogowany użytkownik. Pamietaj
        jednak, że Twoja historia przekroczeń granic będzie w tym przypadku
        zapisywana w pamięci Twojego urządzenia, co grozi utratą danych.{' '}
      </p>
      <p className="welcome__text">
        Jeśli nie chcesz się logować, określ w jakim obecnie znajdujesz się
        kraju.
      </p>
    </>
  );

  return (
    <div className="welcome">
      <h3 className="welcome__title">Witaj w Border Pass!</h3>
      {currentUser ? (
        <p className="welcome__text">W jakim obecnie znajdujesz się kraju?</p>
      ) : (
        noUserContent
      )}
    </div>
  );
};

export default Welcome;
