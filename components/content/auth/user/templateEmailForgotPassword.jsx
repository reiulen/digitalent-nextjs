import React from "react";

export default function TemplateEmailForgotPassword() {
  return (
    <div className="wrapper-email">
      {/* head */}
      <div className="headerss">
        {/* <img
          className="image-shapes"
          alt="img0"
          src="/assets/email/shapes.png"
        />
        <img
          className="img1"
          src="/assets/email/kominfo-white.png"
          alt="img1"
        />
        <img
          className="img2"
          src="/assets/email/mainlogowhite.png"
          alt="img2"
        /> */}
      </div>
      {/* content */}
      <div className="content">
        <p className="text-content-2">
          Hai,&nbsp;<span style={{ fontWeight: "600" }}>Nama User!</span>
        </p>

        <p className="text-content-2">
          Sepertinya anda melakukan permintaan untuk mengatur ulang password.
          Jika benar, silahkan klik tombol berikut untuk mengatur ulang password
          anda.
        </p>

        <button className="btn-primaryyss">Atur Ulang Password</button>

        <p className="text-content-2">
          Link di atas hanya berlaku selama 60 menit sejak e-mail ini diterima.
        </p>
        <p className="text-content-2">
          Jika Anda tidak merasa melakukan pengaturan ulang atau tidak ingin
          perubahan password, silahkan abaikan e-mail ini.
        </p>
        <p className="text-content-2 mb-0 mt-10">Terima Kasih,</p>
        <p className="text-content-2">Tim Digital Talent Scholarship</p>

        <hr />

        <div className="footerss">
          <div className="left">
            <div className="left-flex">
              {/* <img
                className="img2"
                src="/assets/email/kominfo.png"
                alt="kominfo white"
              />
              <img
                className="img1 sizess"
                src="/assets/email/mainlogo.png"
                alt="kominfo white"
              /> */}
                </div>
              <div className="d-flex align-items-center mt-8">
                {/* <img
                  className="img1"
                  src="/assets/email/044-instagram.png"
                  alt="kominfo white"
                />
                <img
                  className="img1"
                  src="/assets/email/096-twitter.png"
                  alt="kominfo white"
                />
                <img
                  className="img1"
                  src="/assets/email/116-youtube.png"
                  alt="kominfo white"
                />
                <img
                  className="img1"
                  src="/assets/email/024-facebook.png"
                  alt="kominfo white"
                /> */}
            
            </div>
          </div>
          <div className="right">
            <p className="text-content-1">Kementerian Komunikasi dan Informatika</p>
            <p className="text-content-3 mb-1">Jl. Medan Merdeka Barat no. 9, Jakarta 10110</p>
            <p className="text-content-3 mb-1">(021) 3452841</p>
            <p className="text-content-3 mb-1">humas@kominfo.go.id</p>
          </div>
        </div>
      </div>
      {/* footer */}
    </div>
  );
}
