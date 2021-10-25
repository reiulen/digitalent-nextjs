import Link from "next/link";
import BgComeJoin from "../../../components/assets/icon-dashboard-peserta/bg-come-join.png";
import Image from 'next/image'

export default function comeJoin() {
  return (
    <div style={{background: "#FAFAFB"}} className="py-20 come-join position-relative max-container">

      <div>
        <Image src={BgComeJoin} objectFit="fill" layout="fill"/>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-4">
            <div>
              <h1
                className="fw-600 position-relative"
                style={{ color: "#6C6C6C" }}
              >
                Ayo Bergabung, Jadi Jagoan Digital!
              </h1>
              <Link href="/register">
                <a>
                  <button className="btn btn-primary btn-register-peserta btn-sm mt-10 mt-sm-20 mb-10 sm-mb-0" >
                    {/* <IconRegister className="mr-2" /> */}
                    Daftar Sekarang!
                  </button>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-xl-3">
                <div className="p-5 mt-5 bg-white" style={{border: "1px solid #D7E1EA",borderRadius: "12px"}}>
                  <p className="fz-32 fw-700 mb-1" style={{color:"#0063CC"}}>
                  260K+
                  </p>
                  <p className="fz-14" style={{color: "#6C6C6C"}}>Pendaftar</p>
                  
                </div>

              </div>
              <div className="col-12 col-sm-6 col-md-6 col-xl-3">
                <div className="p-5 mt-5 bg-white" style={{border: "1px solid #D7E1EA",borderRadius: "12px"}}>
                  <p className="fz-32 fw-700 mb-1" style={{color:"#0063CC"}}>
                  260K+
                  </p>
                  <p className="fz-14" style={{color: "#6C6C6C"}}>Pendaftar</p>
                  
                </div>

              </div>
              <div className="col-12 col-sm-6 col-md-6 col-xl-3">
                <div className="p-5 mt-5 bg-white" style={{border: "1px solid #D7E1EA",borderRadius: "12px"}}>
                  <p className="fz-32 fw-700 mb-1" style={{color:"#0063CC"}}>
                  260K+
                  </p>
                  <p className="fz-14" style={{color: "#6C6C6C"}}>Pendaftar</p>
                  
                </div>

              </div>
              <div className="col-12 col-sm-6 col-md-6 col-xl-3">
                <div className="p-5 mt-5 bg-white" style={{border: "1px solid #D7E1EA",borderRadius: "12px"}}>
                  <p className="fz-32 fw-700 mb-1" style={{color:"#0063CC"}}>
                  260K+
                  </p>
                  <p className="fz-14" style={{color: "#6C6C6C"}}>Pendaftar</p>
                  
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
