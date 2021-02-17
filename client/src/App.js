import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Heading from './components/heading/heading.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import AppView from './components/app-view/app-view.component';
import NavBar from './components/nav-bar/nav-bar.component';
import Modal from './components/modal/modal.component';
import BordersTable from './components/borders-table/borders-table.component';

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
            <Route exact path="/" component={AppView} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/preview" component={BordersTable} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
