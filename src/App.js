// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Plot from 'react-plotly.js';
import {BrowserRouter as Router, Route, Routes,useParams } from 'react-router-dom'
import {Header} from './components/Header.jsx'
import Home from './components/Home'
import PieCart from './components/cart/PieCart'
import Countries from './components/region/Countries'
import CountryInfo from './components/region/CountryInfo'

import {ErrorPage} from './components/ErrorPage'
import { Component } from 'react';
function App() {
  return (
    <>
      <Header/>
      <Router>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/cart/piecart" element={<PieCart/>} />
          <Route exact path="/countries" element={<Countries/>} />
          {/* <Route path="country/:id" render={(props) => <CountryInfo {...props} />} /> */}
          <Route path="/country/:id" element={<CountryInfo/>} />
          {/* <Route path="/country/:id">
            <CountryInfo />
          </Route> */}
          {/* <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <Route path="/addproduct" component={AddProduct}/> 
          <PrivateRoute path="/cart" component={Cart}/> */}
          {/* <Route element={ErrorPage}/> */}
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
