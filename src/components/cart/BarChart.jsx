import React,{useState,useEffect} from 'react'
import Plot from 'react-plotly.js';
import Select from 'react-select'

function BarChart(datas) {
  const [options,setOptions] = useState([]);
  const [selectedData,setSelectedData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [computeValue,setComputeValue] = useState([]);

  const covidDataOptions = [
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'death', label: 'Death' },
    { value: 'recovered', label: 'Recovered' }
  ]
  const [selectedCovidOptions, setSelectedCovidOptions] = useState([]);


  const handleCheckboxChange = (data) => {
    const isChecked = checkedCheckboxes.find(checkedCheckbox => checkedCheckbox === data)
    if (isChecked) {
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          (checkedCheckbox) => checkedCheckbox !== data
        )
      );
    } else {
      setCheckedCheckboxes(checkedCheckboxes.concat(data));
      console.log(checkedCheckboxes,'checkedCheckboxes');
    }
    
  };

  useEffect(() => {
    console.log(options.length>0,'options');
    console.log(options,'options1');

    if (options.length>0) return ;
    Object.entries(datas)
    .map(([key, value]) => {
      if ((key!=="AllCountryInfo")&&options.map((option)=>option.value.includes(key))){
        options.push(
          { value: key, label: key},
          );
      }
      // setSelectedData(countryRegion[state]);
    });
    setSelectedOption( options[0]);
  },[]);


    useEffect(() => {
      let tempValue = [];
      checkedCheckboxes.forEach(checkedCheckbox => {
        tempValue.push(
          {
            // y: [datas[checkedCheckbox].confirmed,
            //         datas[checkedCheckbox].death,
            //         datas[checkedCheckbox].recovered,
            //         ],
            // x: ['confirmed', 'death', 'recovered'],
            y: selectedCovidOptions.map(option=>{
              return datas[checkedCheckbox][option.value]
            }),
            x: selectedCovidOptions.map(option=>{
              console.log(datas[checkedCheckbox][option.label],'datas[checkedCheckbox][option.label]');
              return option.label
            }),
            name: checkedCheckbox,
            type: 'bar'
          },
        )
      });
      setComputeValue(tempValue);
      console.log(selectedCovidOptions,'key');

      console.log(computeValue,'checkedCheckboxcheckedCheckbox');
    },[checkedCheckboxes,selectedCovidOptions]);
  return (
    <>
      {/* {checkedCheckboxes.map(x=>(x))} */}
      {datas[selectedOption.value]&&
        <div>
          <div className="d-flex align-content-start flex-wrap">

            {
              Object.keys(datas).map((data, index) => {
                console.log(Object.keys(datas).length,'11');
                if (data!=="AllCountryInfo"){
                  if ((data==="All"&&Object.keys(datas).length>2)) return;
                  return(
                    <div className="chrome-check-list ms-2" key={`state-${index}`}>
                      <input
                        key={`state-${index}`}
                        value={data}
                        type="checkbox"
                        onChange={() => handleCheckboxChange(data)}
                        />
                        <span>{data}</span>
                  </div>
                  )
                }
              }
              )
            }

          </div>
          {/* {{selectedCovidOptions}} */}
          <Select
              className="col-12 col-md-6"
              isMulti
              value={selectedCovidOptions}//{ label: "All", value: "All" }
              onChange={setSelectedCovidOptions}
              options={covidDataOptions}
          />
          <div className="d-flex justify-content-center">
            <Plot
              data={computeValue}
              layout={ {width: 640, height: 480, title: selectedOption.value} }
            />
          </div>
        </div>

      }

    </>      
  )
}

export default BarChart