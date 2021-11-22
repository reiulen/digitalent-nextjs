import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";

const CardDashboardSiteManagement = ({
  background,
  backgroundImage,
  icon,
  color,
  title,
  link,
  hover,
}) => {
  const [hoverBackground, setHoverBackground] = useState(background)
  const [hoverImage, setHoverImage] = useState(icon)
  const [hoverFont, setHoverFont] = useState(color)

  return (
    <Link href={`${link}`} passHref>
      <div
        className={`col mr-5 ${hoverBackground} px-6 py-6 rounded-xl mb-7 text-center d-flex justify-content-center align-items-center`}
        style={{
          cursor: "pointer",
          backgroundImage: `url("${backgroundImage}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "100%",
        }}
        onMouseOver={() => {
         setHoverBackground("bg-primary")
         hover ? setHoverImage(hover) : null
         setHoverFont("text-white")
        }}
        onMouseOut={() => {
          setHoverBackground(background)
          setHoverImage(icon)
          setHoverFont(color)
         }}
      >
        <div className="bungkus">
          <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
            <Image alt="card-icon" src={`${hoverImage}`} width={50} height={50} />
          </span>
          <p  
            className={`${hoverFont} font-weight-bold font-size-h6`}
          >{`${title}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardDashboardSiteManagement;
