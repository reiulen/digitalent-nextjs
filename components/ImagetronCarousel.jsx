import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";

import { 
    Carousel, 
} from "react-bootstrap";

const ImagetronCarousel = () => {
    return (
        <Carousel nextIcon={false} nextLabel={false} prevIcon={false} prevLabel={false} indicators={false}>
            <Carousel.Item>
                <Image
                    width={1500}
                    height={500}
                    src={`/assets/media/carousel-01.svg`}
                    // objectFit="fill"
                    alt="First slide"
                    className="mx-5"
                />
                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1500}
                    height={500}
                    src={`/assets/media/banner-02.svg`}
                    // objectFit="fill"
                    alt="Second slide"
                    className="mx-5"
                />

                {/* <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1500}
                    height={500}
                    src={`/assets/media/tahapan-pendaftaran.svg`}
                    // objectFit="fill"
                    alt="Third slide"
                    className="mx-5"
                />

                {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    )
}

export default ImagetronCarousel