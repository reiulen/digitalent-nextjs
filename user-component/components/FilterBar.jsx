import React, { useState } from "react";
import { Dropdown, Col, Form, InputGroup, FormControl } from "react-bootstrap";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getAllPelatihanByAkademi } from "../../redux/actions/beranda/detail-akademi.actions";

const FilterBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { tema_id } = router.query;

  const { akademi: allAkademi, loading: loadingAllAkademi } = useSelector(
    (state) => state.allAkademi
  );

  const [akademiId, setAkademiId] = useState(null);
  const [temaId, setTemaId] = useState(null); // multiple
  const [kota, setKota] = useState(null);
  const [tipePelatihan, setTipePelatihan] = useState(null);
  const [activeTheme, setActiveTheme] = useState(null);

  const optionsAkademi = [];
  if (allAkademi) {
    for (let index = 0; index < allAkademi.length; index++) {
      let val = {
        value: allAkademi[index].id,
        label: allAkademi[index].slug,
      };
      if (allAkademi[index].id === tema_id) {
        setActiveTheme(index);
        console.log(tema_id);
      }
      optionsAkademi.push(val);
    }
  }

  const optionsTheme = [
    { value: "1", label: "Multimedia" },
    { value: "2", label: "UI UX" },
    { value: "3", label: "Frontend" },
  ];
  const optionsCity = [
    { value: "1", label: "Jakarta" },
    { value: "2", label: "Bandung" },
    { value: "3", label: "Surabaya" },
  ];
  const optionsTipePelatihan = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "", label: "Online dan Offlane" },
  ];

  const customStylesTop = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "25px",
    }),
  };

  const handleSearch = () => {
    let temaArr = [];
    temaId !== null &&
      temaId.forEach((row, i) => {
        temaArr.push(row.value);
      });
    const data = {
      akademi_id: akademiId !== null ? akademiId.value : null,
      tema_id: temaArr.join(","),
      kota: kota !== null ? kota.label : null,
      tipe_pelatihan: tipePelatihan !== null ? tipePelatihan.value : null,
    };

    // router.push({
    //   pathname: `/detail/akademi/${data.akademi_id}`,
    //   query: { tema_id: data.tema_id },
    // });
    dispatch(
      getAllPelatihanByAkademi(
        data.akademi_id,
        data.tema_id,
        data.kota,
        data.tipe_pelatihan
      )
    );
  };

  return (
    <div className="d-flex align-content-stretch align-items-center flex-lg-nowrap flex-wrap mt-13">
      <div className="mb-5 w-100 rounded-xl mr-4">
        <Select
          options={optionsAkademi}
          styles={customStylesTop}
          placeholder="Pilih Akademi"
          isClearable
          onChange={(e) => setAkademiId(e)}
        />
      </div>

      <div className="mb-5 w-100 mr-4 position-relative">
        <Select
          options={optionsTheme}
          styles={customStylesTop}
          placeholder="Pilih Tema"
          isMulti
          onChange={(e) => setTemaId(e)}
          defaultValue={[optionsTheme[activeTheme]]}
        />
        <i
          className="ri-search-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 position-relative w-100 mr-4">
        <Select
          options={optionsCity}
          styles={customStylesTop}
          placeholder="Cari Lokasi"
          isClearable
          onChange={(e) => setKota(e)}
        />
        <i
          className="ri-map-pin-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 position-relative w-100 mr-4">
        <Select
          options={optionsTipePelatihan}
          styles={customStylesTop}
          placeholder="Tipe Pelatihan"
          isClearable
          onChange={(e) => setTipePelatihan(e)}
        />
        <i
          className="ri-book-mark-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 w-100">
        <button
          className="btn btn-primary rounded-pill btn-block fw-500"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
