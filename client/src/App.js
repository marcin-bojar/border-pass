import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const SignUpPage = lazy(() => import('./pages/sign-up/sign-up.component'));
const SignInPage = lazy(() => import('./pages/sign-in/sign-in.component'));
const PreviewPage = lazy(() => import('./pages/preview/preview.component'));
const SendPage = lazy(() => import('./pages/send/send.component'));
const ArchivePage = lazy(() => import('./pages/archive/archive.component'));
const ConfigPage = lazy(() => import('./pages/config/config.component'));

import Heading from './components/heading/heading.component';
import NavBar from './components/nav-bar/nav-bar.component';
import Modal from './components/modal/modal.component';
import NewVersionBar from './components/new-version-bar/new-version-bar.component';
import Loader from './components/loader/loader.component';

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
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/signin" component={SignInPage} />
              <Route exact path="/preview" component={PreviewPage} />
              <Route exact path="/send" component={SendPage} />
              <Route exact path="/archive" component={ArchivePage} />
              <Route exact path="/config" component={ConfigPage} />
            </Switch>
          </Suspense>
          <NewVersionBar />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
