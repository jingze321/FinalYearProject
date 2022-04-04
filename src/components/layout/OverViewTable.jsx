import React,{useState,useEffect,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowsUpDown,faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons';

// import {fa2} from '@fortawesome/free-regular-svg-icons';

function dynamicArrow(name,selectTableName,sortOrder){
    return (
    <span>
        {name!==selectTableName?
            <FontAwesomeIcon icon={faArrowsUpDown} />:
            (
            sortOrder ==='asc'?
                <FontAwesomeIcon icon={faArrowUp}  style={{  color: "brown" }}/>:
                <FontAwesomeIcon icon={faArrowDown}  style={{  color: "brown" }}/>
            )
        }
        
    </span>)
    console.log(selectTableName,'sdasda');
}

function OverViewTable(countriesData) {
  const [countryList, setCountryList] = useState([]);
  const [selectTableName,setSelectTableName] = useState('');
  const [sortOrder,setSortOrder] = useState("");

  useEffect(() => {
    if (countriesData.length == 0) return;
        setCountryList(countriesData);
    },[countriesData]);
  const sortTable = (colName) => {
    if (selectTableName!== colName){
        setSelectTableName(colName);
        setSortOrder('asc')
        setCountryList(Object.values(countryList).sort((a, b) => (a[colName] < b[colName]) ? 1 : -1));
    }else{
        setSortOrder (sortOrder ==="asc"?"desc":"asc");
        sortOrder ==="asc"?
            setCountryList(Object.values(countryList).sort((a, b) => (a[colName] > b[colName]) ? 1 : -1)):
            setCountryList(Object.values(countryList).sort((a, b) => (a[colName] < b[colName]) ? 1 : -1));
    }
    console.log(sortOrder);
  }
  return (
    <div>
        <p><button onClick={()=>sortTable("TotalConfirmed")}>Sort</button></p>
        <table className="table">
            <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th id="Country" onClick={()=>sortTable("Country")}>Country {dynamicArrow('Country',selectTableName,sortOrder)}</th>
                    <th onClick={()=>sortTable("TotalConfirmed")}>Total Confirmed {dynamicArrow('TotalConfirmed',selectTableName,sortOrder)}</th>
                    <th onClick={()=>sortTable("TotalDeaths")}>Total Deaths {dynamicArrow('TotalDeaths',selectTableName,sortOrder)}</th>
                    <th>Total Recovered</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(countryList).map((country, index) => 
                    <tr key={country.ID}>
                        <td>{index+1}</td>
                        <td>{country.Country}</td>
                        <td>{country.TotalConfirmed}</td>
                        <td>{country.TotalDeaths}</td>
                        <td>{country.TotalRecovered!==0?country.TotalRecovered:"NO DATA"}</td>
                    </tr>
                )}

            </tbody>
        </table>
    </div>
  )
}

export default OverViewTable