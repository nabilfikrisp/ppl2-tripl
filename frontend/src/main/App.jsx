import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import ExploreDetail from './components/pages/ExploreDetail';
import Planner from './components/pages/Planner';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import AboutUs from './components/pages/AboutUs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
          <Route path='/' exact element={Home} />
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore/>} />
          <Route path='/explore-detail' element={<ExploreDetail/>} />
          <Route path='/planner' element={<Planner/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/about-us' element={<AboutUs/>} />

      </Routes>
    </Router>
    </>
  );
}



