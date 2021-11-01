import Link from "next/link";
import ReactPlayer from 'react-player'

import IconArrow from "../../../components/assets/icon/Arrow2";



export default function infoVideos({ video }) {
  return (
    <div style={{ backgroundColor: "white" }} className="py-0 py-xl-30 info-video max-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 m-auto">
            <div className="player-wrapper">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=BXWNfxOIaJE&ab_channel=DigitalentMedia"
                className="react-player"
                width='100%'
                height='100%'
              />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="ml-20">
              <h1
                className="fw-600 mt-26 position-relative"
                style={{ color: "#1F1F1F" }}
              >
                Informasi Dalam Video Terkini
              </h1>
              <p className="fz-16 mt-10 mb-20" style={{ color: "#6C6C6C" }}>
                Temukan konten terupdate dan terkini mengenai Digital<br /> Talent
                Scholarship
              </p>
              <Link href="/detail/video">
                <a>
                  <button className="btn btn-outline-primary-new rounded-pill py-3 px-12">
                    Lihat Selengkapnya
                    <IconArrow
                      width="8"
                      height="10"
                      fill="#0063CC"
                      className="ml-2"
                      style={{ transform: "rotate(0)" }}
                    />
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
