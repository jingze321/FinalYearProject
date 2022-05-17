import React,{useState,useEffect,useRef} from 'react'
import Category from './Category'
import MainCarousel from "./MainCarousel"
import logo from '../../public/firebase-logo.png'
function AboutPage() {
  const handleLangChange = (data) =>{
    myRef.current.scrollIntoView()   
    
  }
  const myRef = useRef(null)
  const apiList = [
    {
      name:"Google Map",
      description:"Google Maps Platform SDKs and APIs for Maps, Routes, and Places.",
      backgroundURL:"https://upload.wikimedia.org/wikipedia/commons/3/35/Neckertal_20150527-6384.jpg"
    },
    {
      name:"Covid 19 API",
      description:"A free API for data on the Coronavirus",
      backgroundURL:"https://api.time.com/wp-content/uploads/2020/06/best-global-responses-covid-03.jpg"
    },
    {
      name:"Bing News Search API",
      description:"An AI service from Microsoft Azure that turns any app into a news search resource",
      backgroundURL:"https://media.istockphoto.com/photos/space-observatory-signal-search-picture-id579733578?k=20&m=579733578&s=612x612&w=0&h=YHzDLWqhxz2yg9r-pDDF7AEdsFRXslxaMtAifk-HqYc="
    },
    {
      name:"REST Countries",
      description:" Information about the world's nations",
      backgroundURL:"https://uil.unesco.org/sites/default/files/styles/horizontal_5x3_688x412/public/news/un_photorick_bajornas_small.jpg?itok=ZMwjZGh7"
    }
  ]
  const environmentList = [
    {
      name:"React",
      description:"React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.",
      logoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
    },
    {
      name:"Firebase",
      description:"Firebase is a platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In 2014, Google acquired the platform and it is now their flagship offering for app development.",
      logoUrl:"https://www.svgrepo.com/show/353735/firebase.svg"
    },
    {
      name:"Bootstap",
      description:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
      logoUrl:"https://www.svgrepo.com/show/303293/bootstrap-4-logo.svg"
    },
    {
      name:"Plotly",
      description:"Plotly is an open-source library that provides a list of chart types as well as tools with callbacks to make a dashboard.",
      logoUrl:"https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/wgshctk7kjdxl6omgwra"
    }
  ]
  return (
    <div>
      <MainCarousel onSelectLanguage={handleLangChange}/>

        <Category  id="2com" show={2} tittle={"App Environment"}>
          {
            environmentList.map(app=>{
              return(
              <div className="p-1 col-lg-6 mb-3 mb-lg-0">
                <div className="hover hover-1 rounded">
                  <img src={app.logoUrl} style={{width: '340px'}} alt=""/>
                  <div className="hover-overlay"></div>
                  <div className="hover-1-content px-2 py-1">
                    <h3 className="hover-1-title text-uppercase font-weight-bold mb-0"> <span className="font-weight-light">{app.name} </span></h3>
                    <p className="hover-1-description font-weight-light mb-0">{app.description}</p>
                  </div>
                </div>
              </div>
              )
            })
          }
        </Category>
        <Category id="1com" show={3} tittle={"API"}>
        {
            apiList.map(api=>{
              return(
                <div class="p-1 col-lg-6 mb-3 mb-lg-0">
                <div class="hover hover-3 text-white rounded"><img src={api.backgroundURL} alt=""/>
                  <div class="hover-overlay"></div>
                  <div class="hover-3-content px-5 py-4">
                    <h3 class="hover-3-title text-uppercase font-weight-bold mb-1"><span class="font-weight-light">{api.name} </span></h3>
                    <p class="hover-3-description small text-uppercase mb-0">{api.description}</p>
                  </div>
                </div>
              </div>
              )
            })
          }
        </Category>
    </div>
  )
}

export default AboutPage