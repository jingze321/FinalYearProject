import React,{useState,useEffect} from 'react'
import Plot from 'react-plotly.js';
import Select from 'react-select'

function PieChart(datas) {
  console.log(datas,'datassss');
  const [options,setOptions] = useState([]);
  const [selectedData,setSelectedData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({label: "Confirmed", value: "confirmed"});
  const [methodType, setMethodType] = useState({label: "All", value: "All"});
  const [computeValue,setComputeValue] = useState([]);



    useEffect(() => {
      console.log(methodType,selectedOption,'datas[selectedOption.value]');
      switch(methodType.value) {
        case 'Single':

          let tempOptions = [];
          console.log('Single');
          Object.entries(datas).forEach(([key, value]) => {
            if (key!=="AllCountryInfo"&&options.map((option)=>option.value.includes(key))){
              tempOptions.push({ value: key, label: key});
            }
          });
          setOptions(tempOptions);
          console.log(tempOptions,'tempOptionstempOptions');


          if (!datas[selectedOption.value]){
            console.log(tempOptions[0],'tempOptions[0]');
            setSelectedOption(tempOptions[0])
          }



          console.log(selectedOption,'tempOptionstempOptions');
          
          if (datas[selectedOption.value]){

            setComputeValue({
              values: [
                        datas[selectedOption.value].confirmed,
                        datas[selectedOption.value].death,
                        datas[selectedOption.value].recovered,
                      ],
              labels: ['confirmed', 'death', 'recovered'],
              type: 'pie'
            });
          }


          console.log(options,'tempOptions');
          break

      case 'All':
          setOptions([
                      {label: "Confirmed", value: "confirmed"},
                      {label: "Death", value: "death"},
                      {label: "Recovered", value: "recovered"},
                    ]);

          // console.log(datas[selectedOption.value],'datas[selectedOption.value]11');
          if (!selectedOption||options.filter(option => option.value === selectedData.value).length === 0){
            setSelectedOption({label: "Confirmed", value: "confirmed"});
            console.log(selectedOption,'selectedData11');
          };
          
          setComputeValue({
            values: Object.entries(datas).map(([key, data])=>{ 
                    console.log(data,selectedOption,'data[selectedOption.value]'); 
                    if (data[selectedOption.value]&&(key['All']!=="square"))
                      return data[selectedOption.value]??0
                  }),
            labels: Object.keys(datas).map(data =>{ 
                if (data!=="AllCountryInfo"&&(data!=='All')) return data
              }),
            type: 'pie'
          });
          console.log(selectedOption,'options111');
        break

          default:
            break
      }


    },[methodType]);

    useEffect(() => {
      const temp = Object.entries(datas).map(([key, data])=>{ 
        if (key!=="AllCountryInfo")
          console.log(Object.keys(datas).length,'keykey');
          return data[selectedOption.value]??0
      })
      console.log(temp,'temp');
      if (methodType.value==="All"){
        setComputeValue({
          values: Object.entries(datas).map(([key, data])=>{ 
                  if (key!=="AllCountryInfo" ||(key==="All"&&Object.keys(datas).length===1))
                    return data[selectedOption.value]??0
                }),
          labels: Object.entries(datas).map(([key, data])=>{ 
                    if (key==="All"&&Object.keys(datas).length===1) return 'All Data'
                    if (key!=="AllCountryInfo") return key
                }),
          type: 'pie'
        });
      }else if(methodType.value==="Single"){
        setComputeValue({
          values: [
                    datas[selectedOption.value].confirmed,
                    datas[selectedOption.value].death,
                    datas[selectedOption.value].recovered,
                  ],
          labels: ['Confirmed', 'Death', 'Recovered'],
          type: 'pie'
        });
      }

    },[selectedOption]);
    

  return (
    <>

      {selectedOption&&
        <div>
          <div className="row">
            <Select
              className="col-12 col-md-6 pb-2"
              value={methodType}//{ label: "All", value: "All" }
              onChange={setMethodType}
              options={[{ label: "All Province", value: "All" },{ label: "Single Provice", value: "Single" }]}
            />
            <Select
              className="col-12 col-md-6"
              value={selectedOption}//{ label: "All", value: "All" }
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div className="row">
            <Plot
              className="col-md-6 offset-md-3"
              data={[computeValue]}
              layout={ {width: 640, height: 480, title: selectedOption.label} }
            />
          </div>
        </div>

      }

    </>      
  )
}

export default PieChart