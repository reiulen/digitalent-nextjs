import React, { useState } from "react";
import styles from "../step-2/step2-trivia.module.css";

import Image from "next/image";

const PollingComponent = ({ props_answer }) => {
  const [answer, setSoalList] = useState([
    { key: "A", option: "", image: "", imageName: "Pilih Gambar" },
    { key: "B", option: "", image: "", imageName: "Pilih Gambar" },
    { key: "C", option: "", image: "", imageName: "Pilih Gambar" },
    { key: "D", option: "", image: "", imageName: "Pilih Gambar" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    if (name === "image") {
      list[index]["imageName"] = e.target.files[0].name;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index]["image"] = reader.result;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
      {
        key: newKey,
        question: "",
        image: "",
        imageName: "Pilih Gambar",
        is_right: false,
      },
    ]);
    props_answer([
      ...answer,
      {
        key: newKey,
        question: "",
        image: "",
        imageName: "Pilih Gambar",
        is_right: false,
      },
    ]);
  };

  return (
    <>
      <div className="form-group row mt-5">
        {answer.map((x, i) => {
          return (
            <>
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
                  placeholder={x.key}
                  onChange={(e) => handleInputChange(e, i)}
                  autoComplete="off"
                />
              </div>
              <div className="col-sm-12 col-md-5">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold pb-0"
                >
                  Input Gambar (Optional)
                </label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="image"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {x.imageName}
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-2 d-flex align-items-end ">
                {answer.length !== 1 && x.key !== "A" ? (
                  <button
                    className="btn btn-link-action bg-danger text-white mt-2"
                    type="button"
                    onClick={() => handleRemoveClick(i)}
                  >
                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
      </div>

      <div className="form-group row">
        <div className="col-sm-7 col-md-4 col-lg-5 text-center">
          {answer.length < 6 ? (
            <button
              type="button"
              className="col-12 col-md-12 col-lg-10 col-xl-7 btn btn-rounded-full bg-blue-secondary text-white"
              onClick={() => handleAddClick()}
            >
              <i className={`${styles.iconTambah} ri-add-fill text-white`}></i> Tambah Jawaban
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PollingComponent;
