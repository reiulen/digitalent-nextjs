// #Next & React
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
// #Page, Component & Library
import PageWrapper from "../../../wrapper/page.wrapper";
import Select from "react-select";

import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";

import { Card } from "react-bootstrap";
export default function MasterPelatihan({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [radio, setRadio] = useState(1);
  const [judul, setJudul] = useState("");

  useEffect(() => {
    console.log(judul);
  }, [judul]);

  const dropdown = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ];

  const [dropdownValue, setDropdownValue] = useState();
  const error = false;
  return (
    <PageWrapper>
      {/* error START */}
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <Card className="card-custom card-stretch gutter-b">
          <Card.Header className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Form Pendaftaran
            </h3>
          </Card.Header>

          <Card.Body className="pt-0">
            <p>Tambah Form</p>
            <div className="d-flex justify-content-start">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="method"
                  value="1"
                  checked={radio == 1}
                  onChange={() => setRadio(1)}
                />
                <label className="form-check-label">Buat Manual</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="method"
                  value="2"
                  checked={radio == 2}
                  onChange={() => setRadio(2)}
                />
                <label className="form-check-label">Copy Form</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="method"
                  value="2"
                  checked={radio == 2}
                  onChange={() => setRadio(3)}
                />
                <label className="form-check-label">Copy & edit form</label>
              </div>
            </div>
            <div className="mt-8 mb-3">Judul Form</div>
            <input
              className="form-control"
              placeholder="Silahkan Masukkan Judul Form"
              onChange={(e) => setJudul(e.currentTarget.value)}
            />
            <div className="d-flex row mt-10">
              <div className="col">
                <div className="mb-3">Nama Field</div>
                <input className="form-control" placeholder="Placeholder" />
              </div>
              <div className="col ">
                <div className="form-group mb-4">
                  <label className="col-form-label font-weight-bold">
                    Level Pelatihan
                  </label>
                  <div className="position-relative" style={{ zIndex: "6" }}>
                    <Select
                      placeholder="Silahkan Pilih Level Pelatihan"
                      options={dropdown}
                      defaultValue={dropdown[0]}
                      onChange={(e) =>
                        setDropdownValue({ value: e?.value, label: e?.label })
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "level pelatihan"
                        )
                      }
                    />
                  </div>
                  {simpleValidator.current.message(
                    "level pelatihan",
                    dropdownValue,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>
              <div className="col">
                <div>Size</div>
              </div>
              <div className="col">
                <div>Size</div>
              </div>
              <div className="col">
                <div>Option</div>
              </div>
              <div className="col">
                <div>Required</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </PageWrapper>
  );
}
