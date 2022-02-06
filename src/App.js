import './App.css';
import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import History from './components/History';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Reset from './components/PassReset';
import Loading from './components/Loading';

function App() {

  let homePage = (localStorage.getItem("soccerBet_userID")) ? (<>
    <Header />
    <Loading />
    <Home />
    <Footer />
  </>) : (
    <>
      <Loading />
      <Login />
    </>
  )

  let historyPage = (localStorage.getItem("soccerBet_userID")) ? (<>
    <Header />
    <Loading />
    <History />
    <Footer />
  </>) : (
    <>
      <Loading />
      <Login />
    </>
  )

  let signUp = (localStorage.getItem("soccerBet_userID")) ? (
    <>
      <Header />
      <Loading />
      <Home />
      <Footer />
    </>
  ) : (
    <>
    <Loading/>
    <SignUp />
    </>
  )

  let empty = <div>
    Verification link sent to your email! <br />Please click on link to verify email....then <button><Link to="/">Login</Link></button>
  </div>


  return (
    // <div className='App'><Login/></div>

    <Router basename={process.env.PUBLIC_URL} >
      <div className='App'>
        <Routes>
          <Route path='/home' element={homePage} />
          <Route path='/history' element={historyPage} />
          <Route path='/signup' element={signUp} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/empty' element={empty} />
          <Route path="/" element={homePage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
