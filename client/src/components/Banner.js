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
        autoplay: true,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    dots: true,
                    infinite: true,
                    speed: 1000,
                    autoplaySpeed: 5000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                }
            }
        ]
    }
    
  return (
    <Carousel {...settings}>
       <Wrap>
        <div className="slideA">
        <h2>Free shipping on all orders over $50</h2>
        </div>
       </Wrap>
       <Wrap>
       <div className="slideB">
        <h2>Find something special this holiday season</h2>
        </div>
       </Wrap>
       <Wrap>
       <div className="slideC">
        <h2>Welcome to Shop-Shop</h2>
        <p>Create, Sell, Browse</p>
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
        background-position: center; 
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
        background-image: url("/images/boxes.png");
        background-color: red;
        color: ${Palette.brown};

        h2 {
            padding: 80px;
        }
    }

    .slideB {
        background-image: url("/images/christmas.png");
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #d6eee7;
        color: ${Palette.red};

        h2 {
            background: white;
            padding: 20px;
            border-radius: 20%;
            margin: 10px;
            width: 40%;
            text-align: center;
            box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
            rgb(0 0 0 / 73%) 0px 16px 10px -10px;
            font-size: 40px;
        }
    }

    .slideC {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-image: url("/images/grit.png");
        color: ${Palette.fadedGrey};
        
        h2 {
            font-size: 50px;
        }
    }
`