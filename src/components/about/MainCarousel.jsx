import React,{useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';

function MainCarousel({onSelectLanguage}) {

return (
  <Carousel >
    <Carousel.Item       
      onClick={() => {
        onSelectLanguage()
      }}
    >
      <img
        style={{maxHeight:"640px"}}
        className="d-block w-100"
        src="https://blog.templatetoaster.com/wp-content/uploads/2019/09/What-is-Bootstrap-Facebook.png"
        alt="Learn Plotly"
      />
      <Carousel.Caption style={{color:"black" ,backgroundColor:"rgba(255, 255, 255, 0.75)"}}>
        <h3>What is Bootstrap</h3>
        <p>Click and learn Bootstrap now</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item >
      <img
        className="d-block w-100"
        style={{maxHeight:"640px"}}
        src="https://i.ytimg.com/vi/XHvWx1F3S4A/maxresdefault.jpg"
        alt="Second slide"
      />

      <Carousel.Caption style={{color:"black" ,backgroundColor:"rgba(255, 255, 255, 0.75)"}}>
        <h3>Firebase</h3>
        <p> Provides tools for tracking analytics, reporting and fixing app crashes, creating marketing and product experiment.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item  variant="dark" >
      <img
        className="d-block h-50 w-100"
        style={{maxHeight:"640px"}}
        src="https://crowdbotics.ghost.io/content/images/2021/07/React-Native-4.png"
        alt="Third slide"
      />

      <Carousel.Caption style={{color:"black" ,backgroundColor:"rgba(255, 255, 255, 0.75)"}}>
        <h3>React Native</h3>
        <p>New app development language for mobile!</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default MainCarousel   