import React, { useState, useEffect } from "react";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addNotifTema,
  clearErrors,
} from "../../../redux/actions/beranda/beranda.actions";
import {
  CLEAR_ERRORS_NOTIF,
  BERANDA_NOTIF_TEMA_RESET,
} from "../../../redux/types/beranda/beranda.type";
import { SweatAlert } from "../../../utils/middleware/helper";

const TrainingReminder = ({ session }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { notifikasiTema, loading, error, success } = useSelector(
    (state) => state.addNotifTema
  );
  const { loading: loadingTemaOriginal, tema: allTamaOriginal } = useSelector(
    (state) => state.allTemaOriginal
  );

  const [temaId, setTemaId] = useState(null);

  const optionsTema = [];
  if (allTamaOriginal) {
    for (let index = 0; index < allTamaOriginal.length; index++) {
      let val = {
        value: allTamaOriginal[index].value,
        label: allTamaOriginal[index].label,
      };

      optionsTema.push(val);
    }
  }

  useEffect(() => {
    if (error) {
      SweatAlert("Gagal", error, "error");
      dispatch({ type: CLEAR_ERRORS_NOTIF });
    }
    if (success) {
      SweatAlert("Berhasil", "Berhasil membuat pengingat pelatihan", "success");
      dispatch({ type: BERANDA_NOTIF_TEMA_RESET });
    }
  }, [error, success, dispatch]);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "10px",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#E6F2FF",
      borderRadius: "30px",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#0063CC",
    }),
  };

  const handleTemaNotif = () => {
    const data = {
      tema_id: (temaId && temaId.value + "") || null,
    };
    if (session) {
      dispatch(addNotifTema(data, session.token));
    } else {
      router.push(`/login`);
    }
  };

  return (
    <div
      className="p-10 rounded-xl mb-10"
      style={{ backgroundColor: "#E6F2FF" }}
    >
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

      <div className="d-flex">
        <div className="w-100">
          <Select
            options={optionsTema}
            styles={customStyles}
            placeholder="Cari Tema"
            onChange={(e) => setTemaId(e)}
            isClearable
          />
        </div>
        <button
          className="btn btn-beranda-primary rounded-pill text-white fw-600 px-5 ml-4"
          onClick={() => handleTemaNotif()}
        >
          Buat
        </button>
      </div>
    </div>
  );
};

export default TrainingReminder;
