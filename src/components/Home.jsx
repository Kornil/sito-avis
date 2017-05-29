import React from 'react';
import Welcome from './Welcome';
import About from './About';
import Stats from './Stats';

const Home = () => (
  <div className="home">
    <Welcome />
    <About />
    <Stats />
  </div>
);

export default Home;
