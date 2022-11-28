import React from 'react'
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner() {

    let settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true
    }
    
  return (
    <Carousel {...settings}>
       <Wrap>
        <img src="/images/soap.jpg" alt="slide1"/>
       </Wrap>
       <Wrap>
        <img src="/images/camera.jpg" alt="slide2"/>
       </Wrap>
    </Carousel>
  )
}

export default Banner

const Carousel = styled(Slider)`
    margin-top: 20px;

    ul li button {
        &:before {
            font-size: 10px;
            color: black;
        }
    }

    li.slick-active button:before {
        color: black;
    }

    .slick-list {
        overflow: visible;
    }

    button {
        z-index: 1;
    }
`

const Wrap = styled.div`
    cursor: pointer;

    img {
        border: 4px solid black;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        transition-duration: 300ms;

        &:hover {
            border: 4px solid grey;
        }
    }
`