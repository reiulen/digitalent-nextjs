import Image from "next/image";
import IconFacebook from "../../../components/assets/icon/Facebook";
import IconInstagram from "../../../components/assets/icon/Instagram";
import IconTwitter from "../../../components/assets/icon/Twitter";
import IconYoututbe from "../../../components/assets/icon/Youtube";
import ImageWhiteLogo from "../../../components/assets/icon-dashboard-peserta/whitelogo.png";

export default function footer() {
  return (
    <div style={{ backgroundColor: "#203E80" }}>
      <div className="container-fluid">
        <div className="row w-100 px-0 mx-0 mb-0 py-5">
          <div className="col-12 col-sm-3">
            <div>
              <Image
                src={ImageWhiteLogo}
                width={120}
                height={120}
                alt="brand-navbar"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="h-100 d-flex align-items-center">
              <p className="mb-0 fw-500 text-white">
                Program Digital Talent Scholarship bertujuan untuk meningkatkan
                keterampilan dan daya saing, produktivitas, profesionalisme SDM
                bidang teknologi informasi dan komunikasi bagi angkatan kerja
                muda Indonesia, masyarakat umum, dan aparatur sipil negara.
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-2">
            <div className="h-100 w-100">
              <div className="pl-10 d-flex align-items-center justify-content-center h-100 border-left w-100">
                <IconFacebook />
                <IconTwitter className="mx-6" />
                <IconYoututbe />
                <IconInstagram className="ml-6" />
              </div>
            </div>
          </div>
        </div>
        <hr style={{backgroundColor:"white"}} />
        <div className="row py-10 px-0">
          <div className="col-12 col-sm-4">
            <div>
              <h1 className="fw-700 fz-20 text-white">Alamat</h1>
              <p className="text-white fw-500">
                Kementerian Komunikasi dan Informatika RI <br /> Jl. Medan Merdeka
                Barat No. 9 <br /> Jakarta Pusat, 10110
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div>
              <h1 className="fw-700 fz-20 text-white">Pranala Luar</h1>
              <p className="text-white fw-500">
                Kementrian Kominfo
              </p>
              <p className="text-white fw-500">
                Badan Litbang SDM Kominfo
              </p>
              <p className="text-white fw-500">
                Pusbang Proserti
              </p>
              <p className="text-white fw-500">
                Kementrian Kominfo
              </p>
              <p className="text-white fw-500">
                Badan Litbang SDM Kominfo
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div>
              <h1 className="fw-700 fz-20" style={{color:"transparent"}}>Alamat</h1>
               <p className="text-white fw-500">
                Kementrian Kominfo
              </p>
              <p className="text-white fw-500">
                Badan Litbang SDM Kominfo
              </p>
              <p className="text-white fw-500">
                Pusbang Proserti
              </p>
              <p className="text-white fw-500">
                Kementrian Kominfo
              </p>
              <p className="text-white fw-500">
                Badan Litbang SDM Kominfo
              </p>
            </div>
          </div>
        </div>
        <hr style={{backgroundColor:"white"}} />
        <p className="text-white fw-500 text-center py-10 mb-0">Copyright © 2021 | Kementerian Komunikasi dan Informatika</p>
      </div>
    </div>
  );
}
