import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import SignUpPage from './pages/sign-up/sign-up.component';
import SignInPage from './pages/sign-in/sign-in.component';
import PreviewPage from './pages/preview/preview.component';
import SendPage from './pages/send/send.component';
import ArchivePage from './pages/archive/archive.component';
import ConfigPage from './pages/config/config.component';

import Heading from './components/heading/heading.component';
import NavBar from './components/nav-bar/nav-bar.component';
import Modal from './components/modal/modal.component';
import NewVersionBar from './components/new-version-bar/new-version-bar.component';

import { AppContext, useAppState } from './hooks/useAppState';

import './App.scss';

const App = () => {
  const appState = useAppState();

  return (
    <div className="App">
      <AppContext.Provider value={appState}>
        <BrowserRouter>
          <NavBar />
          <Heading />
          <Modal />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/preview" component={PreviewPage} />
            <Route exact path="/send" component={SendPage} />
            <Route exact path="/archive" component={ArchivePage} />
            <Route exact path="/config" component={ConfigPage} />
          </Switch>
          <NewVersionBar />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
