import React,{useState,useEffect,useReducer,useCallback,useRef,useMemo} from 'react'
import Plot from 'react-plotly.js';
import Select from 'react-select';

import '../css/components/checkbox.css'

const Fetch_State = 'fetchState'
const CLEAR = 'clear'

function reducer(prevState, action) {
  console.log(prevState, action,'reducer');
  switch (action.type) {
    case Fetch_State:
      if (prevState.includes(action.region)){
        return prevState.filter((element, index) => element!==action.region)
      }else{
        return [...prevState, action.region];
      }
      
    default:
      return []
  }
}

function LineChart(datas) {
  const [computeValue,setComputeValue] = useState([]);
  const [selectedState,setSelectedState] = useState([]);
  const [stateList,setStateList] = useState([]);
  const stateRef = useRef([]);
  stateRef.current = stateList;
  
  const covidDataOptions = [
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Deaths', label: 'Deaths' },
    { value: 'Recovered', label: 'Recovered' }
  ]
  const [selectedCovidOptions, setSelectedCovidOptions] = useState(covidDataOptions[0]);
  // const reducer= useCallback(()=>{
  //   return (prevState, action)=>{
  //     console.log(prevState, action,"test");
  //     switch(action.type){
  //       //会发现这样的地方不走usecallback会输出两次
  //       case Fetch_State:
  //         if (prevState.includes(action.region)){
  //           return prevState.filter((element, index) => element!==action.region)
  //         }else{
  //           return [...prevState, action.region];
  //         }
          
  //       default:
  //         return []
  //     }
  //   }
  // },[])
  const [states, dispatch] = useReducer(reducer, [])
  const generateColor = useCallback((event) => {
      var r = Math.round(Math.random()*255);
      var g = Math.round(Math.random()*255);
      var b = Math.round(Math.random()*255);
      return `rgba(${r},${g},${b},${0.5})`;
  },[]);
  const generateColorMemo = useMemo(()=>generateColor,[])
  const fetchStateList= useCallback((tempOptions) => {

      if(states.length>0){
        setComputeValue([]);
        Object.values(states).forEach(state=>{
          setComputeValue( oldArray  =>
            [
              ...oldArray,
              {
                x: datas[state].map(x=>{return x.Date}),
                y: datas[state].map(x=>{return x[selectedCovidOptions.value]}),
                type: 'scatter',
                name:state,
              },

            ],

            )
        })
      }
    }, [states,datas,selectedCovidOptions])
    
  useEffect(()=>{
    let tempOptions = [];
    Object.entries(datas).map(([key, value]) => {

      tempOptions.push({ label: key, value: key });
    })
    fetchStateList(tempOptions);

  },[datas,fetchStateList])

  return (
    <>
    {datas&&
      <>
      {/* <Select
              // value={selectedState}//{ label: "All", value: "All" }
              // onChange={setSelectedState}
              options={stateList}
              onChange={e => dispatch({ type: Fetch_State, region: e.value })}
            /> */}
            <div className="d-flex align-content-start flex-wrap">
              {
                Object.keys(datas).map((data, index) => {
                  
                  if (data!=="AllCountryInfo"){
                    return(
                      <div className={`ms-2 chrome-check-list ${states.includes(data)?'check-list-active':''}`}  key={`state-${index}`}>
                        <input
                          key={`state-${index}`}
                          value={data}
                          type="checkbox"
                          onChange={e => dispatch({ type: Fetch_State, region: data })}
                          />
                          <span>{data}</span>
                      </div>
                    )
                  }
                })
              }
            </div>
            <div>
                <h6>Data Type:</h6>
                <Select
                        className="col-12 col-md-4 m-lg-2"
                        value={selectedCovidOptions}//{ label: "All", value: "All" }
                        onChange={setSelectedCovidOptions}
                        options={covidDataOptions}
                />
            </div>
            <div className="d-flex justify-content-center">

                  <Plot 
                    data = {computeValue}
                    
                    layout={ {width: 640, height: 480, title: `${selectedCovidOptions.label} Cases of Timeline`} }
                    
                  />

            </div>

      
      </>
    }
    </>
  )
}

export default LineChart