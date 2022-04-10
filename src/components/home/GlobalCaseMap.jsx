import React,{useState,useEffect,useContext} from 'react'
import Plot from 'react-plotly.js'; 
import {SelectTypeContext} from '../Home.jsx'

let countriesData1 = [];
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function getValue(key) {
    if (countriesData1.length == 0) return;
    return Object.values(countriesData1).map(function(row) { 
          return row[key].toString(); 
    });
    
  }
//   function Welcome(props) {
//     alert("asddas");
//   }
  export function GlobalCaseMap(countriesData=[]) {
    countriesData1= countriesData;
    const [countryCode, setCountryCode] = useState([]);
    const [countryName, setCountryName] = useState([]);
    const [countryCase, setCountryCase] = useState([]);
    const { height, width } = useWindowDimensions();
    useEffect(() => {
        if (countriesData.length == 0) return;
        // console.log(typeof countriesData);
        Object.values(countriesData).map(country=>{
            setCountryCode(countryCode=>[...countryCode,country.CountryCode])
            setCountryName(countryName=>[...countryName,country.Country])
            setCountryCase(countryCase=>[...countryCase,country.TotalConfirmed])

        })
    },[countriesData]);
    
  let selectTypeContext = useContext(SelectTypeContext);
  let selectedColumn = () =>{
    console.log(selectTypeContext.modeState);
    switch(selectTypeContext.modeState){
      case 'cases':
        return ({colName:'TotalConfirmed',
                title :'Total Name',
                colorscale: [
                    [0,'rgb(0, 0, 110)'],[0.35,'rgb(106, 137, 247)'],
                    [0.5,'rgb(255, 254, 0)'], [0.8,'rgb(255, 173, 0)'],
                    [0.9,'rgb(255, 0, 0)'],[1,'rgb(222, 0, 0)']
                ],
                maxNumber:10000000,
                })
      case 'deaths':
        return ({colName:'TotalDeaths',title :'Total Deaths',                
                    colorscale: [
                    [0,'rgb(0, 0, 110)'],[0.35,'rgb(106, 137, 247)'],
                    [0.5,'rgb(255, 254, 0)'], [0.8,'rgb(255, 173, 0)'],
                    [0.9,'rgb(255, 0, 0)'],[1,'rgb(222, 0, 0)']
                ],maxNumber:200000,})
       case 'recovered':
         return ({colName:'TotalRecovered',title :'Total Recovered',maxNumber:100000,})
      default:
          return "null"
    }
  }
  
  return (
      <div className="d-flex justify-content-center w-sm-100">
          {/* {alert (selectedColumn())} */}
        <Plot
        data={[
        {
            // type: 'choropleth',
            // // locations: unpack(rows, 'CODE'),
            // locationmode: 'country names',
            // location:getValue('Country'),
            // // z: unpack(rows, 'GDP (BILLIONS)'),
            // z: getValue('TotalConfirmed'),
            // // text: unpack(rows, 'COUNTRY'),
            // text: getValue('Country'),
            type: 'choropleth',
            locationmode: 'country names',
            locations: getValue('Country'),
            z: getValue(selectedColumn().colName),
            text: getValue('Country'),
            // autocolorscale: true,
            zmin: 0,
            zmax: selectedColumn().maxNumber,
            colorscale: [
                [0,'rgb(0, 0, 110)'],[0.35,'rgb(106, 137, 247)'],
                [0.5,'rgb(255, 254, 0)'], [0.8,'rgb(255, 173, 0)'],
                [0.9,'rgb(255, 0, 0)'],[1,'rgb(222, 0, 0)']
            ],
            // autocolorscale: false,
            // reversescale: true,
            // marker: {
            //     line: {
            //         color: 'rgb(180,180,180)',
            //         width: 0.5
            //     }
            // },
            // tick0: 0,
            // zmin: 0,
            // dtick: 1000,
            marker: {
                line: {
                    color: 'rgb(180,180,180)',
                    width: 0.5
                }
            },
            tick0: 0,
            colorbar: {
                autotic: false,
                title: selectedColumn().title,
                // len:0.5,
                
            }
        }
        ]}
        layout={ {width: width, height: 500, title: 'Global Covid Information'} }
        />
      </div>
  )
}

// export default GlobalCaseMap