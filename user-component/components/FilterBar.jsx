import React from "react";
import { Dropdown, Col, Form, InputGroup, FormControl } from "react-bootstrap";

import { TagsInput } from "react-tag-input-component";

const FilterBar = () => {
  return (
    <div className="d-flex align-content-stretch align-items-center flex-lg-nowrap flex-wrap mt-13">
      <div className="mb-5 w-100 rounded-xl mr-4">
        <Form.Select
          aria-label="Default select example"
          className="form-control pr-5"
          style={{ borderRadius: "30px" }}
          placeholder="Pilih Akademi"
        >
          <option disabled selected>
            Pilih Akademi
          </option>
          <option value="1">VSGA</option>
          <option value="2">FGA</option>
          <option value="3">GTA</option>
        </Form.Select>
      </div>

      <div className="mb-5 w-100 mr-4 position-relative">
        <TagsInput
          className="bg-white mb-5 pl-10 w-100 rounded-xl"
          placeHolder="Isi Tag & Enter"
        />
        <i
          className="ri-search-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 position-relative w-100 mr-4">
        <input
          type="text"
          className="form-control w-100 rounded-xl pl-10"
          id="inlineFormInputGroup"
          placeholder="Cari Lokasi"
        />
        <i
          className="ri-map-pin-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 position-relative w-100 mr-4">
        <input
          type="text"
          className="form-control pl-10 w-100 rounded-xl"
          id="inlineFormInputGroup"
          placeholder="Tipe Pelatihan"
        />
        <i
          className="ri-book-mark-line left-center-absolute"
          style={{ left: "10px" }}
        ></i>
      </div>

      <div className="mb-5 w-100">
        <button className="btn btn-primary rounded-pill btn-block fw-500">
          <i className="ri-search-line mr-2"></i>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
