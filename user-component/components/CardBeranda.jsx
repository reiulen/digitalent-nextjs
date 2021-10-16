import React from 'react'
import IconTime from "../../public/assets/icon/icon-dashboard-peserta/Time"
import IconPeserta from "../../public/assets/icon/icon-dashboard-peserta/Peserta"

const CardBeranda = () => {
  return (
    <div className="cards-items">
      <div className="top">
        <label>PELATIHAN ONLINE</label>
      </div>
      <div className="rounded"></div>

      <div className="bottom">
        <div className="rounded"></div>
        <div className="d-flex align-items-center justify-content-between pl-24">
          <p className="fw-600" style={{ color: "#6C6C6C" }}>
            Gojek
          </p>
          <button className="btn btn-green-rounded">OPEN</button>
        </div>
        <h1
          className="fz-18 fw-600 mt-4"
          style={{ color: "#1F1F1F" }}
        >
          Intermediate Multimedia Designer
        </h1>
        <h3
          className="mb-0 fz-18 fw-400 mt-4"
          style={{ color: "#6C6C6C" }}
        >
          Vocational School Graduate Academy
        </h3>
        <hr />

        {/* regis and kuota */}
        <div className="mt-2">
          <div className="d-flex align-items-center">
            <IconTime className="mr-2" />
            Registrasi: 05 Juli 2021 - 21 Juli 2021
          </div>
          <div className="d-flex align-items-center mt-2">
            <IconPeserta className="mr-2" />
            Kuota: 1000 Peserta
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardBeranda
