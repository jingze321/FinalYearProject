import React,{useEffect, useState} from 'react'
import axios from 'axios';

function NewsSearch(AllCountryInfo) {
    const [newsList,setNewsList] = useState([]);
    useEffect(()=>{
        axios.get(`https://bing-news-search1.p.rapidapi.com/news/search`,{
            params: {q: `Covid ${AllCountryInfo?.name?.common}`, freshness: 'Month', textFormat: 'Raw', safeSearch: 'Off',count:'5'},
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
                'X-RapidAPI-Key': 'c2eafdef01mshb662d83dd0e5ed9p1038bajsn6a091c406b2f'
            }
          
        })
        .then(res => {
            setNewsList(res.data.value);
            console.log(res.data,'1');
        })
    },[])

  return (
    <div className="container">
        <div className="row">
            <div className="col-12 col-sm-8 col-lg-12">
                <h6 className="text-muted mt-3">Covid News of {AllCountryInfo?.name?.common}</h6> 
                <ul className="list-group m-3">
                    {
                        newsList&&
                        newsList.map((news,index)=>
                            <a key={index} href={news.url} target="_blank" className="text-decoration-none">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <img src={news?.image?.thumbnail?.contentUrl??'https://upload.wikimedia.org/wikipedia/commons/f/f0/GHS-pictogram-unknown.svg'} style={{'maxWidth': '100px'}} />
                                    <div className="d-flex flex-column ms-3 p-auto">
                                        <h6>
                                            {news.name}
                                        </h6>
                                        <p>
                                            {news.description}
                                        </p>
                                    </div>
                                </li>
                            </a>
                        )
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NewsSearch