import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faKitMedical,faVirusCovid,faSkull} from '@fortawesome/free-solid-svg-icons';
import {SelectTypeContext} from '../Home.jsx'
// import {fa2} from '@fortawesome/free-regular-svg-icons';


function OverView(globalData) {

const dateString = globalData.Date;
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
let selectTypeContext = useContext(SelectTypeContext);

  return (
    <div className="container-fluid">
        <section id="minimal-statistics">
            <div className="row ">
                <div className="col-12 mt-3 mb-1">
                    <h4 className="text-uppercase">Global</h4>
                    <p>The coronavirus COVID-19 is affecting 225 countries and territories.</p> 
                </div>
            </div>
            {/* <div><i className="fa fa-spinner fa-spin">no spinner but why</i></div>; */}

            {/* <FontAwesomeIcon className ='font-awesome' icon={faGithub} /> */}

            <div className="row justify-content-center">
                <div className="col-xl-3 col-sm-6 col-12 mb-3" onClick={()=> selectTypeContext.modeDispatch('cases')}> 
                    <div className={`card border ${selectTypeContext.modeState==="cases"?'border-danger':''}`}>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex justify-content-between">
                                    <div className="align-self-center">
                                        <FontAwesomeIcon icon={faVirusCovid}  className="fa-4x" style={{  color: "brown" }}/>
                                    </div>
                                    <div className="media-body text-end flex-row-reverse">
                                        <div className="d-flex justify-content-around">
                                            <h3>{globalData.TotalConfirmed}</h3>
                                            <p className="my-auto text-muted">+ {globalData.NewConfirmed}</p>
                                        </div>
                                        <span>Total Cases</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 col-12 mb-3" onClick={()=> selectTypeContext.modeDispatch('deaths')}>
                    <div className={`card border ${selectTypeContext.modeState==="deaths"?'border-dark':''}`}>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex d-flex justify-content-between">
                                    <div className="align-self-center">
                                        <FontAwesomeIcon icon={faSkull}  className="fa-4x"/>
                                    </div>
                                    <div className="media-body text-end flex-row-reverse">
                                        <div className="d-flex justify-content-around">
                                            <h3>{globalData.TotalDeaths}</h3>
                                            <p className="my-auto text-muted">+ {globalData.NewDeaths}</p>
                                        </div>
                                        <span>Total Deaths</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-sm-6 col-12 mb-3" onClick={()=> selectTypeContext.modeDispatch('recovered')}>
                    <div className={`card border ${selectTypeContext.modeState==="recovered"?'border-success':''}`}>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex d-flex justify-content-between">
                                    <div className="align-self-center">
                                        <FontAwesomeIcon icon={faKitMedical}  className="fa-4x" style={{  color: "green" }}/>
                                    </div>
                                    <div className="media-body text-end flex-row-reverse">
                                        <div className="d-flex justify-content-around">
                                            {globalData.TotalRecovered ?  (
                                                <>
                                                    <h3>{globalData.TotalRecovered}</h3>
                                                    <p className="my-auto text-muted">+ {globalData.NewRecovered}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <h3>No Data</h3>
                                                </>
                                            )}
                                        </div>
                                        <span>Total Recovered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="d-flex flex-row-reverse">
            <div className="p-2">Latest Update: <strong>{formatDate(dateString)}</strong></div>

        </div>
    </div>
  )
}

export default OverView