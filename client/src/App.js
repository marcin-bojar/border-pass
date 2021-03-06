import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Heading from './components/heading/heading.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import AppView from './components/app-view/app-view.component';
import NavBar from './components/nav-bar/nav-bar.component';
import Modal from './components/modal/modal.component';
import BordersTable from './components/borders-table/borders-table.component';
import SendBorders from './components/send-borders/send-borders.component';
import SetConfig from './components/set-config/set-config.compnent';

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
            <Route exact path="/send" component={SendBorders} />
            <Route exact path="/config" component={SetConfig} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
