import React, { useState, useEffect } from "react";
import { Dropdown, Col, Form, InputGroup, FormControl } from "react-bootstrap";

import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getAllPelatihanByAkademi } from "../../../../../redux/actions/beranda/detail-akademi.actions";
import { getDetailAkademi } from "../../../../../redux/actions/beranda/detail-akademi.actions";
import {
  getAllKotaPeserta,
  getAllTemaOriginal,
} from "../../../../../redux/actions/beranda/beranda.actions";

const FilterBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id, tema_id } = router.query;

  const { akademi: allAkademi, loading: loadingAllAkademi } = useSelector(
    (state) => state.allAkademi
  );
  const { loading: loadingKota, kota: allKota } = useSelector(
    (state) => state.allKotaPeserta
  );
  const { loading: loadingTemaOriginal, tema: allTamaOriginal } = useSelector(
    (state) => state.allTemaOriginal
  );

  const [akademiId, setAkademiId] = useState(null);
  const [temaId, setTemaId] = useState(null); // multiple
  const [kota, setKota] = useState(null);
  const [tipePelatihan, setTipePelatihan] = useState(null);
  const [activeTheme, setActiveTheme] = useState(null);
  const [activeAcademy, setActiveAcademy] = useState(null);

  const optionsAkademi = [];
  if (allAkademi) {
    for (let index = 0; index < allAkademi.length; index++) {
      let val = {
        value: allAkademi[index].id,
        label: allAkademi[index].slug,
      };
      optionsAkademi.push(val);
    }
  }
  const optionsCity = [];
  if (allKota) {
    for (let index = 0; index < allKota.length; index++) {
      let val = {
        value: allKota[index].id,
        label: allKota[index].label,
      };
      optionsCity.push(val);
    }
  }
  const optionsTheme = [];
  if (allTamaOriginal) {
    for (let index = 0; index < allTamaOriginal.length; index++) {
      let val = {
        value: allTamaOriginal[index].value,
        label: allTamaOriginal[index].label,
      };
      optionsTheme.push(val);
    }
  }

  useEffect(() => {
    dispatch(getAllTemaOriginal(id));
    allAkademi.filter(
      (val) =>
        val.id === parseInt(id) &&
        setActiveAcademy({ value: val.id, label: val.slug })
    );
  }, [dispatch]);

  const optionsTipePelatihan = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "", label: "Online dan Offline" },
  ];

  const customStylesTop = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "25px",
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
  const customStylesTheme = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "25px",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#E6F2FF",
      borderRadius: "30px",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#0063CC",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "12rem",
    }),
    valueContainer: (styles) => ({
      ...styles,
      position: "static",
    }),
  };

  const handleSearch = () => {
    let temaArr = [];
    temaId !== null &&
      temaId.forEach((row, i) => {
        temaArr.push(row.value);
      });
    const data = {
      akademi_id: akademiId !== null ? akademiId.value : id,
      tema_id: temaArr.join(","),
      kota: kota !== null ? kota.label : null,
      tipe_pelatihan: tipePelatihan !== null ? tipePelatihan.value : null,
    };

    if (data && data.akademi_id !== null) {
      router.replace(
        {
          pathname: `/detail/akademi/${data.akademi_id}`,
          query: { tema_id: data.tema_id },
        },
        undefined,
        { shallow: true }
      );
    }
    dispatch(getDetailAkademi(data.akademi_id));
    dispatch(
      getAllPelatihanByAkademi(
        data.akademi_id,
        data.tema_id,
        data.kota,
        data.tipe_pelatihan
      )
    );
  };

  const ValueContainer = ({ children, getValue, ...props }) => {
    let maxToShow = 1;
    var length = getValue().length;
    let displayChips = React.Children.toArray(children).slice(0, maxToShow);
    let shouldBadgeShow = length > maxToShow;
    let displayLength = length - maxToShow;

    return (
      <components.ValueContainer {...props}>
        {!props.selectProps.inputValue && displayChips}
        <div
          style={{
            color: "#0063CC",
            backgroundColor: "#E6F2FF",
            padding: "1px 10px",
            borderRadius: "30px",
          }}
        >
          {shouldBadgeShow &&
            `+ ${displayLength} ${length != 1 ? "" : ""} lainya`}
        </div>
      </components.ValueContainer>
    );
  };

  return (
    <div className="d-flex align-content-stretch align-items-center flex-lg-nowrap flex-wrap mt-13">
      <div className="mb-5 w-100 rounded-xl mr-md-4 mr-0">
        <Select
          options={optionsAkademi}
          styles={customStylesTop}
          placeholder={
            activeAcademy ? `${activeAcademy.label}` : `Pilih Akademi`
          }
          isClearable
          onChange={(e) => {
            setAkademiId(e);
            dispatch(getAllTemaOriginal(e.value));
          }}
        />
      </div>

      <div className="mb-5 w-100 mr-md-4 mr-0 position-relative">
        <Select
          closeMenuOnSelect={false}
          options={optionsTheme}
          styles={customStylesTheme}
          placeholder="Pilih Tema"
          isMulti
          onChange={(e) => setTemaId(e)}
          defaultValue={[optionsTheme[activeTheme]]}
          components={{ ValueContainer }}
        />
        <i
          className="ri-search-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 position-relative w-100 mr-md-4 mr-0">
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

      <div className="mb-5 position-relative w-100 mr-md-4 mr-0">
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

      <div className="mb-5 w-md-50 w-100">
        <button
          className="btn btn-beranda-primary rounded-pill btn-block fw-500"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
