import React from "react";
import Image from "next/image";

const TrainingReminder = () => {
  return (
    <div className="p-10 rounded mb-10" style={{ backgroundColor: "#E6F2FF" }}>
      <div className="d-flex align-items-center mb-3">
        <div>
          <Image src={`/assets/media/logo-bell.svg`} width={32} height={32} />
        </div>

        <h4 className="fw-600 fz-20 ml-4">Buat Pengingat Pelatihan</h4>
      </div>

      <p className="fz-14 mb-9" style={{ color: "#6C6C6C" }}>
        Jangan sampai ketinggalan informasi, buat pengingat pelatihan sekarang
        juga.
      </p>

      <div className="d-flex w-100">
        <input
          type="text"
          placeholder="Cari Tema"
          className="form-control mr-2 rounded-pill"
        />
        <button className="btn btn-primary rounded-pill text-white fw-600 px-5 ml-4">
          Buat
        </button>
      </div>
    </div>
  );
};

export default TrainingReminder;
