import React,{useState,useEffect,createContext,useReducer} from 'react'
// import { auth, fs } from '../config/Config'
// // import { Navbar1 } from './Navbar'
// import {Products} from './Products'
import OverView from './home/OverView.jsx'
import {GlobalCaseMap} from './home/GlobalCaseMap.jsx'
import OverViewTable from './home/OverViewTable.jsx'
import axios from 'axios';


export const SelectTypeContext = createContext();

const reducer = (state,action) =>{
  switch(action){
    case 'cases':
      return 'cases'
    case 'deaths':
      return 'deaths'
     case 'recovered':
       return 'recovered'
  }
}

function Home(props) {
    const [globalData, setGlobalData] = useState([]);
    const [countriesData, setCountryData] = useState([]);
    const [selectedType, setSelectedType] = useState("Cases");
    const themes = {
        cases: {
          foreground: "#000000",
          background: "#eeeeee"
        },
        deaths: {
          foreground: "#ffffff",
          background: "#333333"
        },
        recovered: {
            foreground: "#ffffff",
            background: "#222222"
          }
      };
  
    useEffect(() => {
      // Update the document title using the browser API
      axios.get(`https://api.covid19api.com/summary`)
      .then(res => {
          setGlobalData(res.data.Global);
          setCountryData(res.data.Countries);
          console.log(res.data.Countries,'asdsda');    
      })
  },[]);
  // console.log(ThemeContext);
  const [mode, dispatch] =useReducer(reducer,'cases')
    return (
        <div >
          {mode}
          <SelectTypeContext.Provider value={{modeState: mode, modeDispatch: dispatch}}>
            <OverView {...globalData} />
            <GlobalCaseMap {...countriesData}/>
            <OverViewTable {...countriesData}/>
          </SelectTypeContext.Provider>
        </div>
    )
}

export default Home
