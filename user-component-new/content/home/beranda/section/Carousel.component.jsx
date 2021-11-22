import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Carousel({ data }) {
  const router = useRouter();

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    centerPadding: "40px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          variableWidth: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {data &&
          data.imagetron.map((row, i) => (
            <div style={{ width: 1650 }} key={i}>
              <Image
                src={
                  process.env.END_POINT_API_IMAGE_PUBLIKASI +
                  "publikasi/images/" +
                  row.gambar
                }
                width={1650}
                height={windowDimensions.width < 800 ? 800 : 500}
                objectFit="cover"
                className="img-carousel"
              />
            </div>
          ))}
      </Slider>
    </>
  );
}
