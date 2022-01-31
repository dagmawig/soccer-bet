import './App.css';
import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import History from './components/History';

function App() {
  return (
    <>
      <Header />
      {/* <Home /> */}
      <History/>
      <Footer/>
      
    </>
  );
}

export default App;
