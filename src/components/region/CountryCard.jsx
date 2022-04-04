import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function CountryCard(country) {
  // console.log(country);
  return (
    <div className="card" style={{width:"18rem",height:"30rem"}}>
      {/* {country.CountryCode.toLowerCase()} */}
      <img
        src={`https://flagcdn.com/w320/${country.CountryCode.toLowerCase()}.png`}
        style={{ maxHeight: "200px", margin: "30px 0" }}
        alt="South Africa"/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mt-auto mb-3">{country.Country}</h5>
        {/* <hr/> */}
        <div className="list-unstyled py-3">
          <p className="card-text">Total Confirmed : <strong>{country.TotalConfirmed}</strong></p> 
          <p className="card-text">Total Deaths : <strong>{country.TotalDeaths}</strong></p>
        </div>
        {/* <a href="#" className="btn btn-primary" style={{marginTop:"auto"}}>Go somewhere</a> */}
        
        <Link to={`/country/${country.Slug}`}>
          <button type="button" class="btn btn-lg btn-block btn-primary">View More</button>
        </Link>
      </div>
    </div>    
  )
}

export default CountryCard