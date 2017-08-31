import React from 'react';
import Welcome from './Welcome';
import About from './About';
import Stats from './Stats';
import RecentBlogs from './RecentBlogs';
import RecentGalleries from './RecentGalleries';

const Home = () => (
  <div className="home">
    <Welcome />
    <About />
    <Stats />
    <RecentBlogs />
    <RecentGalleries />
  </div>
);

export default Home;