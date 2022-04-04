import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js'; 


function ChoroplethMap(datas) {

  const [countryInfo,setCountryInfo] = useState([]);
  const [latitudeTop,setLatitudeTop] = useState([]);
  const [latitudeBottom,setLatitudeBottom] = useState([]);

    // let countryInfo = [];
    useEffect(()=>{
        const latitude = parseFloat(datas['AllCountryInfo']['latlng'][0]);
        if (latitude-30<-90){
            const topPoistion = latitude -30 +90;
            const bottomPoistion = -90;
            setLatitudeTop (topPoistion);
            setLatitudeBottom (bottomPoistion);
        }else{
            console.log("noonono");
            setLatitudeTop(latitude+30);
            setLatitudeBottom(latitude-30);
        }
    },[])
    if (Object.values(datas).length===0||!datas['AllCountryInfo']) return <></>;
    console.log(parseFloat(datas['AllCountryInfo']['latlng'][0]),'lat1');


    console.log(parseFloat(datas['AllCountryInfo']['latlng'][0])-30,'lat');
  return (
    <>
    <Plot
        data={[
            {
                type: 'scattergeo',
                mode: 'markers+text',
                text: Object.keys(datas).map(dataName=>{
                    return dataName ; //+ datas[dataName]['confirmed']
                }),
                hovertext :Object.keys(datas).map(dataName=>{
                    // console.log(Object.keys(data),'data');
                    return `<b>${dataName}</b><br>Confirmed:${datas[dataName].confirmed}<br>Death:${datas[dataName].death}<br>Recovered:${datas[dataName].recovered}`;
                }),

                
                // lon: [
                //     101.98,103.76, 100.37, -123.06
                // ],
                // lat: [
                //     4.21,1.49, 6.12, 49.13
                // ],
                lon: Object.values(datas).map(data=>{
                    return data.lon;
                }),
                lat: Object.values(datas).map(data=>{
                    return data.lat;
                }),
                marker: {
                    size: 7,
                    color: Object.values(datas).map(data=>{
                        return data.color;
                    }),
                    symbol:Object.values(datas).map(data=>{
                        return data.symbol;
                    }),
                    line: {
                        width: 1
                    }
                },
                name: datas['AllCountryInfo']['name']['official'],
            }
        ]}
        layout={{
        title: datas['AllCountryInfo']['name']['official'],
        width: 600, 
        height: 600, 
        font: {
            family: 'Droid Serif, serif',
            size: 6.5
        },
        titlefont: {
            size: 16
        },
        geo: {
            scope: 'world',
            resolution: 50,
            lonaxis: {
                'range': [parseFloat(datas['AllCountryInfo']['latlng'][1])-30, parseFloat(datas['AllCountryInfo']['latlng'][1])+30]
            },
            lataxis: {
                'range': [latitudeBottom, latitudeTop]
            },
            showrivers: true,
            rivercolor: '#fff',
            showlakes: true,
            lakecolor: '#fff',
            showland: true,
            landcolor: '#EAEAAE',
            countrycolor: '#d3d3d3',
            countrywidth: 1.5,
            subunitcolor: '#d3d3d3',
        }

    }}
        />
    </>      
  )
}

export default ChoroplethMap