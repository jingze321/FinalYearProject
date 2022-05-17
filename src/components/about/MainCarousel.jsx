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
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item >
      <img
        className="d-block w-100"
        style={{maxHeight:"640px"}}
        src="https://i.ytimg.com/vi/XHvWx1F3S4A/maxresdefault.jpg"
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item  variant="dark" >
      <img
        className="d-block h-50 w-100"
        style={{maxHeight:"640px"}}
        src="https://crowdbotics.ghost.io/content/images/2021/07/React-Native-4.png"
        alt="Third slide"
      />

      <Carousel.Caption style={{color:"black"}}>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default MainCarousel   