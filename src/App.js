// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Plot from 'react-plotly.js';
import {BrowserRouter as Router, Route, Routes,useParams } from 'react-router-dom'
import {Header} from './components/Header.jsx'
import Home from './components/Home'
// import PieChart from './components/cart/PieChart'
import Countries from './components/region/Countries'
import CountryInfo from './components/region/CountryInfo'

import AboutPage from './components/about/AboutPage.jsx';
import Contact from './components/contact/Contact.jsx';

import {SignUp} from './components/account/SignUp'

import {ErrorPage} from './components/ErrorPage'
import PrivateRoute from './components/PrivateRoute'
import React, { useState,createContext } from 'react'

// import {onAuthStateChanged} from "firebase/auth"



import { Login } from './components/account/Login.jsx';
import UpdateProfile from './components/account/UpdateProfile.jsx';

import {FirebaseContextProvider} from './firebase/FirebaseContextProvider'

function App() {

  return (
    <>

      <FirebaseContextProvider>
          <Header/>
          <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/countries" element={<Countries/>} />
                <Route path="/country/:id" element={<CountryInfo/>} />

                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                {/* <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                /> */}
                {/* <Route exact path='/update-profile' element={<PrivateRoute component={UpdateProfile}/>}/> */}
                {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
                {/* <PrivateRoute exact path="/" element={<UpdateProfile/>}/> */}
                <Route exact path='/update-profile' element={<PrivateRoute/>}>
                  <Route exact path='/update-profile' element={<UpdateProfile/>}/>
                </Route>
                <Route path="/about-us" element={<AboutPage/>}/>
                <Route exact path='/contact-us' element={<Contact/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
          </Router>
      </FirebaseContextProvider>
    </>
  );
}

export default App;
