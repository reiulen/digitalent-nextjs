// import ImageStep from "../../../components/assets/icon-dashboard-peserta/tahapan.png";
import ImageStep from "../../../public/assets/media/banner-tahapan01.svg";
import ImageShapes from "../../../public/assets/media/banner-tahapan01.svg";
import Image from "next/image";
import ImageShapes1 from "../../../components/assets/icon-dashboard-peserta/bg-stepes.png";
export default function stepRegister() {
  return (
    <div className="position-relative step-registers max-container">
      <div className="images-shapes">
        <Image src={ImageShapes1}  layout="fill" objectFit="fill"/>
      </div>
    <div className="mt-16 position-relative" style={{background: "#FAFAFB"}}>
      
      <div className="container-fluid">
        <div>
          {/* <h1
            className="fw-600 text-center position-relative"
            style={{ color: "#1F1F1F", top: "3rem" }}
          >
            Tahapan Pendaftaran <br />
            Digital Talent Scholarship
          </h1> */}
          <div className="image-steps-dashboard">
            <Image
              src={ImageStep}
              alt="Picture of the author"
              layout="fill"
              objectFit="fill"
            />
          </div>
        </div>
      </div>







    </div>
    </div>
  );
}
