import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from 'src/components/header/header';
import Home from 'src/views/home';
import Details from 'src/views/details';
import Profile from 'src/views/profile';

const App = () => {
  return (
    <HashRouter basename="/">
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/earthquake/:earthquakeId" component={Details} />
          <Redirect to="/" />
        </Switch>
      </main>
    </HashRouter>
  );
};

export default App;
