import React, { useState } from "react";
import styles from "../step-2/step2-trivia.module.css";

import Image from "next/image";

const BlankComponent = ({ props_answer, props_duration }) => {
  const [answer, setSoalList] = useState([
    {
      key: "A",
      value: "",
      type: "",
      option: "",
      image: "",
    },
    {
      key: "B",
      value: "",
      type: "",
      option: "",
      image: "",
    },
    {
      key: "C",
      value: "",
      type: "",
      option: "",
      image: "",
    },
    {
      key: "D",
      value: "",
      type: "",
      option: "",
      image: "",
    },
  ]);
  const [duration, setDuration] = useState(null);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    setSoalList(list);
    props_answer(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...answer];
    list.splice(index, 1);
    list.forEach((row, i) => {
      let key = String.fromCharCode(65 + i);
      list[i]["key"] = key;
    });
    setSoalList(list);
    props_answer(list);
  };

  const handleAddClick = () => {
    const lastobj = answer[answer.length - 1];
    const keyindex = lastobj.key.charCodeAt(0);
    const newKey = String.fromCharCode(keyindex + 1);
    setSoalList([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
    props_answer([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
  };

  return (
    <>
      <div className="form-group mt-5">
        {answer.map((x, i) => {
          return (
            <>
              {/* <div className="col-sm-12 col-md-1">
                <input
                  type="number"
                  className="form-control"
                  name="value"
                  value={x.value}
                  onChange={(e) => handleInputChange(e, i)}
                  autoComplete="off"
                />
                <span className="text-muted">Isi Nilai</span>
              </div> */}
              <div className="row">
                <div className="col-sm-12 col-md-5">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Pilih Tipe
                  </label>
                  <select
                    name="type"
                    className="form-control"
                    value={x.type}
                    placeholder={x.key}
                    onChange={(e) => handleInputChange(e, i)}
                  >
                    <option value="" disabled selected>
                      -- PILIHAN TIPE --
                    </option>
                    <option value="Percis">Percis</option>
                    <option value="Mengandung">Mengandung</option>
                    <option value="Sama Dengan">Sama Dengan</option>
                  </select>
                </div>
                <div className="col-sm-12 col-md-5">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Jawaban {x.key}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="option"
                    value={x.option}
                    placeholder={`Pilihan ${x.key}`}
                    onChange={(e) => handleInputChange(e, i)}
                    autoComplete="off"
                  />
                </div>

                <div className="col-sm-12 col-md-2">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label font-weight-bold pb-0"
                  >
                    Nilai
                  </label>
                  <div className="row justify-content-center align-items-center">
                    <div className="form-group col-12 col-md-5 mb-3">
                      <input
                        type="number"
                        className={`${styles.inputNilai} form-control`}
                        name="value"
                        value={x.value}
                        onChange={(e) => handleInputChange(e, i)}
                        autoComplete="off"
                        placeholder="2"
                      />
                    </div>
                    <div className="col-12 col-sm-2">
                      {answer.length !== 1 && x.key !== "A" ? (
                        <button
                          className="btn btn-link-action bg-danger text-white mb-2"
                          type="button"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="form-group ">
        {/* <div className="row"> */}
        <div>
          {answer.length < 6 ? (
            <button
              type="button"
              className={`${styles.btnAddAnswer} btn btn-secondary-rounded-full bg-blue-secondary text-white`}
              onClick={() => handleAddClick()}
            >
              <i className={`${styles.iconTambah} ri-add-fill text-white`}></i>{" "}
              <span>Tambah Jawaban</span>
            </button>
          ) : (
            ""
          )}
          {/* </div> */}
        </div>
      </div>

      <div className="form-group row flex-column">
        <div className="col-sm-12 col-md-12">
          <label
            htmlFor="staticEmail"
            className=" col-form-label font-weight-bold pb-0"
          >
            Durasi Soal
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              aria-describedby="basic-addon2"
              value={duration}
              placeholder="120"
              onChange={(e) => {
                setDuration(e.target.value);
                props_duration(e.target.value);
              }}
              min={1}
            />
            <div className="input-group-append">
              <span
                className="input-group-text bg-primary text-white"
                id="basic-addon2"
              >
                Detik
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlankComponent;
