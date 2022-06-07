import React,{useState,useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Select from 'react-select'
import ChoroplethMap from '../cart/ChoroplethMap.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faEarthAmericas} from '@fortawesome/free-solid-svg-icons';
import ProgressBar from 'react-bootstrap/ProgressBar'

import PieChart from '../cart/PieChart.jsx'
import BarChart from '../cart/BarChart.jsx'
import LineChart from '../cart/LineChart.jsx'

import NewsLetter from '../news/NewsSearch.jsx'
import Loading from '../layout/Loading.jsx';


function selectedChart(model,computeValue){
  switch(model) {
    case 'PieChart':
      return <PieChart {...computeValue}/>
    case 'BarChart':
      return <BarChart {...computeValue}/>
    case 'LineChart':
      return <LineChart {...computeValue}/>
    default:
      return <LineChart {...computeValue}/>
  }
}

function CountryInfo() {
  const { id } = useParams();
  const [post, SetPost] = useState(id);
  const [countryRegion,setCountryRegion] = useState([]);
  const [selectedData,setSelectedData] = useState([]);
  const [options,setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [analyzeData,setAnalyzeData] = useState([]);

  const [selectedChartModel,setSelectedChartModel] = useState({value:'PieChart',label:'PieChart'});
  const [relatedData,setRelatedData] = useState([]);

  const [summaryInfo,setSummaryInfo] =useState();

  const [ISORegion,setISORegion] =useState('');



  useEffect(() => {
    // Update the document title using the browser API
    axios.get(`https://api.covid19api.com/live/country/${post}`)
    .then(res => {
        Object.values(res.data).map(data=>{
          var tempObject = {};
          const region = data.Province===''? "All":data.Province;
          // const region = data.Province;
          // tempObject.region = data.Province;
          // tempObject.confirmed = data.Confirmed;
          // tempObject.deaths = data.Deaths;
          // tempObject.active = data.Active;
          
          !countryRegion[region]?countryRegion[region] = [data] : countryRegion[region].push(data);

        })
        Object.keys(countryRegion)
                        .map((state,index) =>{
                          options.push(
                            { value: state, label: state===''?'All':state },
                          )
                          setSelectedOption( options[0]);
                        });
        })
      },[]);

      useEffect(() => {
          setSelectedData (countryRegion[selectedOption.value]);
          // console.log(countryRegion,'countryRegion');
          Object.keys(countryRegion)
            .map((state,index) =>{
              const currentStateInfo = countryRegion[state][countryRegion[state].length-1];
                analyzeData[state] = {
                  confirmed : currentStateInfo.Confirmed,
                  recovered : currentStateInfo.Recovered,
                  death : currentStateInfo.Deaths,
                  lat:parseFloat(currentStateInfo.Lat),
                  lon:parseFloat(currentStateInfo.Lon),
                  symbol:state==="All"?'square':'circle',
                  color:state==="All"?'#bebada':'#fdb462'
                }
          });

          //Calculate Object All if not exist from API
          const CountryCode = Object.values(countryRegion).length>0?Object.values(countryRegion)[0][0]['CountryCode']:null;
          if (!CountryCode) return;
          axios.get(`https://restcountries.com/v3.1/alpha/${CountryCode}`)
          .then(res => {
            if (res.data.length >0){
              setAnalyzeData({...analyzeData,'AllCountryInfo':res.data[0]})
              setISORegion(res.data[0].cca3)
              if (!analyzeData['All']){
                let totalConfirmed =0;
                let totalRecovered =0;
                let totalDeath =0;
                Object.values(analyzeData).map(x=>{
                   totalConfirmed += x.confirmed;
                   totalRecovered += x.recovered;
                   totalDeath += x.death;
                })
                setAnalyzeData({...analyzeData,
                  'All':{
                    confirmed : totalConfirmed,
                    recovered : totalRecovered,
                    death : totalDeath,
                    symbol:'square',
                    color:'#bebada',
                    lat: res.data[0]['latlng'][0],
                    lon: res.data[0]['latlng'][1],
                  }
                })
              }
            }
          })
          // console.log(countryRegion,'countryRegion');
          axios.get(`https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json`)
          .then(res => {
            const countriesSummary = (res.data.features).find(country => country.attributes.ISO3 === ISORegion);
            if (countriesSummary&&!summaryInfo)
              setSummaryInfo(countriesSummary);

          }); 
      },[selectedOption,ISORegion,summaryInfo]);
      
      useEffect(() => {
        if (!analyzeData['All']&&analyzeData['AllCountryInfo']){
          let totalConfirmed =0;
          let totalRecovered =0;
          let totalDeath =0;
          Object.values(analyzeData).map((values)=>{
            // if (x.confirmed) {
              totalConfirmed += values.confirmed??0;
              totalRecovered += values.recovered??0;
              totalDeath += values.death??0;
          })

          setAnalyzeData({...analyzeData,
            'All':{
              confirmed : totalConfirmed,
              recovered : totalRecovered,
              death : totalDeath,
              symbol:'square',
              color:'#bebada',
              lat: analyzeData.AllCountryInfo['latlng'][0],
              lon: analyzeData.AllCountryInfo['latlng'][1],
            }
          })
        }
      },[analyzeData]);

      useEffect(()=>{
        console.log(selectedChartModel?.value,'selectedChartModel?.value');
        if (selectedChartModel?.value === 'LineChart' || !selectedChartModel?.value){
          setRelatedData(countryRegion);
        }
        else{
          setRelatedData(analyzeData)
        }
      },[selectedChartModel])

  return (
    <>  
      {analyzeData.AllCountryInfo?(
        <div className="row">
          <div className="col-sm-7">
              
              <div className="d-flex justify-content-center p-2 m-2">
                <div className="align-self-center">
                  <img src={analyzeData.AllCountryInfo.flags.png} width="75"/>
                </div>
                <div className="align-self-center mx-3">
                  <h1>{analyzeData.AllCountryInfo.name.official}</h1>
                </div>
              </div>

              <div className="row ms-1">

                <div className="col-xl-6 col-md-12">
                    <div className="card overflow-hidden">
                      <div className="card-content">
                        <div className="card-body cleartfix p-1">
                          <div className="media d-flex ">
                            <div className="align-self-center">
                            <FontAwesomeIcon icon={faUser}  className="fa-4x m-1" style={{  color: "grey" }}/>
                            </div>
                            <div className="media-body align-self-center mx-1">
                              <h4>Population</h4>
                              <span>Total Population</span>
                            </div>
                            <div className="align-self-center ms-auto p-1 ">
                              <h2>{analyzeData.AllCountryInfo.population}</h2>
                            </div>
                          </div>
                          {summaryInfo&&
                            <ProgressBar variant="success">
                              <ProgressBar striped variant="warning" now={(summaryInfo['attributes']['Confirmed']/analyzeData.AllCountryInfo.population)*100} key={1} />
                              <ProgressBar variant="danger" now={((summaryInfo['attributes']['Deaths'])/analyzeData.AllCountryInfo.population)*100} key={2} />
                              {/* <ProgressBar striped variant="danger" now={(summaryInfo['TotalRecovered']/analyzeData.AllCountryInfo.population)*100} key={3} /> */}
                            </ProgressBar>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-md-12 ">
                    <div className="card overflow-hidden">
                      <div className="card-content">
                        <div className="card-body cleartfix p-1">
                          <div className="media d-flex ">
                            <div className="align-self-center">
                            <FontAwesomeIcon icon={faEarthAmericas}  className="fa-4x m-1" style={{  color: "grey" }}/>
                            </div>
                            <div className="media-body align-self-center mx-1">
                              <h4>Size </h4>
                              <span>Country area </span>
                            </div>
                            <div className="align-self-center ms-auto p-1 ">
                              <h2>{(analyzeData.AllCountryInfo.area)}
                              <small style={{"font-size":"0.8rem"}}className="text-muted">KM &#xB2;</small>
                              </h2>
                              
                            </div>
                          </div>
                          <ProgressBar variant="success">
                              <ProgressBar striped variant="secondary" now={(analyzeData.AllCountryInfo.area/5101000)} key={1} />
                              {/* <ProgressBar striped variant="danger" now={(summaryInfo['TotalRecovered']/analyzeData.AllCountryInfo.population)*100} key={3} /> */}
                          </ProgressBar>
                        </div>
                      </div>
                    </div>
                  </div>
              <NewsLetter {...analyzeData.AllCountryInfo}/>
              </div>
          </div>
          <div className="col-sm-4">
           <ChoroplethMap {...analyzeData}/>
          </div>
          <div className="row justify-content-start">
            <div className="col-lg-6 col-12 m-1 "> 
              <span> Chart Type:</span>
              <Select
                className=""
                value={selectedChartModel}
                onChange={setSelectedChartModel}
                options={[
                  {value:'PieChart',label:'PieChart'},
                  {value:'BarChart',label:'BarChart'},
                  {value:'LineChart',label:'LineChart'}]}
              />
            </div>
            <hr/>
          </div>

                {analyzeData.AllCountryInfo&&selectedChart(selectedChartModel?.value,relatedData)};

        </div>
      ):(
        <Loading/>
      )}
    </>      
  )
}

export default CountryInfo