import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Carousel({ imagetron }) {
  const router = useRouter();

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
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    centerPadding: "40px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          variableWidth: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 700,
        settings: {
          variableWidth: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 1124,
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
        {imagetron.map((row, i) => (
          <div style={{ width: 1200 }} key={i}>
            <Image
              src={
                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                "publikasi/images/" +
                row.gambar
              }
              width={1200}
              height={400}
              objectFit="cover"
              className="img-carousel"
              // onClick={() => router.push(row.url_link)} ROUTING IMAGE WHEN TRIGRER CLICK
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
