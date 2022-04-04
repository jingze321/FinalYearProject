import React,{useState,useEffect} from 'react'
import axios from 'axios';
import CountryCart from './CountryCart.jsx'

function Countries() {
  const [countries, setCountries] = useState([]);
  const [global, setGlobal] = useState([]);
  const [query,setQuery] = useState("");
  const [searchCountries,setSearchCountries] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    axios.get(`https://api.covid19api.com/summary`)
    .then(res => {
        // console.log(res.data.Countries);
        // console.log(res.data['countries']);
        setCountries(res.data.Countries);
        setSearchCountries(res.data.Countries);
    })
},[]);
  useEffect(() => {
    // Update the document title using the browser API
    if (query.trim() ==="") setSearchCountries(countries);
    // console.log(countries);
    setSearchCountries(countries.filter(country => country.Country.toLowerCase().includes(query.toLowerCase())));

  },[query]);
  return (
    <>
    <div className="container ">
      <div className="row">
        <div className="col-xs-12 col-md-4 ms-md-auto my-3">
          <div className="input-group mw-25" >
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
              onChange={event => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
      <div className="d-flex d-flex justify-content-around flex-wrap" >

        {
            searchCountries
            .map(country =>
              <div key={country.ID} className="m-2">
                <CountryCart {...country}/>
              </div>
            )

        }
      </div>
    </>      
  )
}

export default Countries