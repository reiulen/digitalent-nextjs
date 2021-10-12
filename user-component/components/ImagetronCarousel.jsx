import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";

import { 
    Carousel, 
} from "react-bootstrap";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const ImagetronCarousel = () => {

    // const responsive = {
    //     projector: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 5,
    //         slidesToSlide: 1 // optional, default to 1.
    //     },
        
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 1,
    //         slidesToSlide: 1 // optional, default to 1.
    //     },

    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2,
    //         slidesToSlide: 1 // optional, default to 1.
    //     },

    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1,
    //         slidesToSlide: 1 // optional, default to 1.
    //     }
    // };

    // const settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     swipeToSlide: true,
    // }


    return (
        <Carousel 
            nextIcon={false} 
            nextLabel={false} 
            prevIcon={false} 
            prevLabel={false} 
            indicators={false}
        >
            <Carousel.Item>
                <Image
                    width={1500}
                    height={500}
                    src={`/assets/media/carousel-01.svg`}
                    // objectFit="fill"
                    alt="First slide"
                    className="mx-5"
                />
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
            </Carousel.Item>
        </Carousel>

        // #React Carousel 
        // <Carousel
        //     arrows={false}
        //     showDots={false}
        //     responsive={responsive}
        //     ssr={true} // means to render carousel on server-side.
        //     infinite={false}
        //     // centerMode={true}
        //     // autoPlay={true}
        //     autoPlaySpeed={3000}
        //     keyBoardControl={true}
        //     // customTransition="all .5"
        //     // transitionDuration={500}
        //     // containerClass="carousel-container"
        //     removeArrowOnDeviceType={["tablet", "mobile"]}
        //     // deviceType={this.props.deviceType}
        //     dotListClass="custom-dot-list-style"
        //     draggable={true}
        //     swipeable={true}
        //     slidesToSlide={1}
        // >
            
        //         <Image
        //             width={1500}
        //             height={500}
        //             src={`/assets/media/carousel-01.svg`}
        //             // objectFit="fill"
        //             alt="First slide"
        //             className="mx-5"
        //         />

        //         <Image
        //             width={1500}
        //             height={500}
        //             src={`/assets/media/banner-02.svg`}
        //             // objectFit="fill"
        //             alt="Second slide"
        //             className="mx-5"
        //         />
           
        //         <Image
        //             width={1500}
        //             height={500}
        //             src={`/assets/media/tahapan-pendaftaran.svg`}
        //             // objectFit="fill"
        //             alt="Third slide"
        //             className="mx-5"
        //         />
            
        // </Carousel>

        // #Slider
        // <Slider {...settings}>
        //     <div>
        //         <Image
        //             width={1500}
        //             height={500}
        //             src={`/assets/media/carousel-01.svg`}
        //             // objectFit="fill"
        //             alt="First slide"
        //             className="mx-5"
        //         />
        //     </div>
        //     <div>
        //         <Image
        //             width={1500}
        //             height={500}
        //             src={`/assets/media/banner-02.svg`}
        //             // objectFit="fill"
        //             alt="Second slide"
        //             className="mx-5"
        //         />
        //     </div>
        //     <div>
        //     <Image
        //         width={1500}
        //         height={500}
        //         src={`/assets/media/tahapan-pendaftaran.svg`}
        //         // objectFit="fill"
        //         alt="Third slide"
        //         className="mx-5"
        //     />
        //     </div>
        // </Slider>
    )
}

export default ImagetronCarousel