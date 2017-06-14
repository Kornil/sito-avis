import React from 'react';
import Welcome from './Welcome';
import About from './About';
import Stats from './Stats';
import RecentBlogs from './RecentBlogs';

const Home = () => (
  <div className="home">
    <Welcome />
    <About />
    <Stats />
    <RecentBlogs />
  </div>
);

export default Home;
