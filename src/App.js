import './App.css';
import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import History from './components/History';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  let homePage = <>
    <Header />
    <Home />
    <Footer />
  </>

  let historyPage = <>
    <Header />
    <History />
    <Footer />
  </>


  return (
    <Router >
      <div className='App'>
        <Routes>
          <Route path='/home' element={homePage} />
          <Route path='/history' element={historyPage} />
          <Route path="/" element={homePage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
