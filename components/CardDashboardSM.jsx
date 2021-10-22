import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/previewGaleri.module.css"

const CardPage = ({
  background,
  icon,
  color,
  value,
  titleValue,
  title,
  publishedVal,
}) => {
  return (
    <div
      className={`col ${background} px-6 py-8 rounded-xl mr-3 mb-7 ml-3`}
      style={
        publishedVal !== ""
          ? {
            cursor: "pointer",
            backgroundImage: "url('/assets/media/card-img.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
            backgroundSize: "100px",
            
          }
          : {
            cursor: "default",
            backgroundImage: "url('/assets/media/card-img.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
            backgroundSize: "100px",
            
          }
      }
    >
      <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
        <div className="row ml-4">
          <Image
            alt="card-page-icon"
            src={`/assets/icon/${icon}`}
            width={30}
            height={30}
          />
          <p
            className={`font-weight-bold font-size-h2 ml-2 my-auto`}
            style={{ color: color }}
          >
            {value}
            {/* {titleValue} */}
          </p>
          <p
            className={`${styles.hideTitle} font-weight-bold font-size-h2 ml-2 my-auto`}
            style={{ color: color }}
          >
            {/* {value}  */}
            {titleValue}
          </p>
        </div>
      </span>
      <p
        className="ml-3 mt-2"
        style={{
          color: color,
          fontSize: "15px",
          fontWeight: "500",
        }}
      >
        {title}
      </p>
    </div>
  );
};

export default CardPage;
