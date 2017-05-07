import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Associazione from './Associazione';
import FAQ from './FAQ';
import Contatti from './Contatti';
import Donazione from './Donazione';

const Main = () => (
  <div className="main">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/associazione" component={Associazione} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contatti" component={Contatti} />
      <Route path="/donazione" component={Donazione} />
    </Switch>
  </div>
);

export default Main;
