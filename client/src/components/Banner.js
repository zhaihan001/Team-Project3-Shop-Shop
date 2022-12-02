import React from 'react'
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Palette } from './Palette';


function Banner() {

    let settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 5000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true
    }
    
  return (
    <Carousel {...settings}>
       <Wrap>
        <div className="slideA">
        {/* <h2>124</h2> */}
        </div>
       </Wrap>
       <Wrap>
       <div className="slideB">
        {/* <h2>Hello</h2> */}
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
    background-color: ${Palette.brown};
    color: white;

    div {
        background-size: cover;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 4px solid ${Palette.brown};
        border-bottom-width: 30px;
        transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

        &:hover {
            border: 4px solid ${Palette.grey};
        }
    }

    .slideA {
        background-image: url("/images/sale1.jpg");
        background-color: red;
    }

    .slideB {
        background-image: url("/images/wooden-spoons.jpg");
        background-color: green;
    }

    .slideC {
        background-image: url("/images/bedtime-book.jpg");
    }
`