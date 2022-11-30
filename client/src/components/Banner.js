import React from 'react'
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner() {

    let settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 5000,
        slidesToShow: 2,
        slidesToScroll: 1,
        // fade: true,
        autoplay: true
    }
    
  return (
    <Carousel {...settings}>
       <Wrap>
        <div className="slideA">
        <h2>124</h2>
        </div>
       </Wrap>
       <Wrap>
       <div className="slideB">
        <h2>Hello</h2>
        </div>
       </Wrap>
       <Wrap>
       <div className="slideC">
        <h2>Book</h2>
        </div>
       </Wrap>
    </Carousel>
  )
}

export default Banner

const Carousel = styled(Slider)`

margin-bottom: 50px;

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
    height: 70vh;
    // max-height: 70vh;
    overflow-y: hidden;
    background-color: black;
    color: white;

    div {
        background-size: cover;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 4px solid black;

        &:hover {
            border: 4px solid grey;
        }
    }

    .slideA {
        background-image: url("/images/teddy-bear.jpg");
    }

    .slideB {
        background-image: url("/images/soap.jpg");
    }

    .slideC {
        background-image: url("/images/bedtime-book.jpg");
    }
`