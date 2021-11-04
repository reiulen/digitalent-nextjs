import React from "react";
import { Dropdown, Col, Form, InputGroup, FormControl } from "react-bootstrap";

import { TagsInput } from "react-tag-input-component";
import Select, { StylesConfig } from "react-select";

const FilterBar = () => {
  const options = [
    { value: "1", label: "VSGA" },
    { value: "2", label: "FGA" },
    { value: "3", label: "AKM" },
  ];

  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "25px",
    }),
  };

  return (
    <div className="d-flex align-content-stretch align-items-center flex-lg-nowrap flex-wrap mt-13">
      <div className="mb-5 w-100 rounded-xl mr-4">
        <Select
          options={options}
          styles={customStyles}
          placeholder="Pilih Akademi"
          isClearable
        />
      </div>

      <div className="mb-5 w-100 mr-4 position-relative">
        <Select
          options={options}
          styles={customStyles}
          placeholder="Pilih Tema"
          isMulti
        />
        <i
          className="ri-search-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 position-relative w-100 mr-4">
        <Select
          options={options}
          styles={customStyles}
          placeholder="Cari Lokasi"
          isClearable
        />
        <i
          className="ri-map-pin-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 position-relative w-100 mr-4">
        <Select
          options={options}
          styles={customStyles}
          placeholder="Tipe Pelatihan"
          isClearable
        />
        <i
          className="ri-book-mark-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 w-100">
        <button className="btn btn-primary rounded-pill btn-block fw-500">
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
