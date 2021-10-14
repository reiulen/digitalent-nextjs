import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { 
    Carousel, CarouselItem,
} from "react-bootstrap";

import Image from "next/image";

const AkademiCarousel = () => {

    return (
        <Carousel
            indicators={false}
        >
            <Carousel.Item>
                <div className="row d-flex justify-content-around"> 
                    <div className="bg-secondary">
                        Item1
                    </div>
                    <div className="bg-secondary">
                        Item2
                    </div>
                    <div className="bg-secondary">
                        Item3
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="row d-flex justify-content-around"> 
                    <div className="bg-secondary">
                        Item4
                    </div>
                    <div className="bg-secondary">
                        Item5
                    </div>
                    <div className="bg-secondary">
                        Item6
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}

export default AkademiCarousel

