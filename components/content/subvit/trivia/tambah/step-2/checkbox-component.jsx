import React, { useState } from "react";
import styles from "../step-2/step2-trivia.module.css";

import dynamic from "next/dynamic";
import Image from "next/image";

const CheckboxComponent = ({
  props_answer,
  props_answer_key,
  props_duration,
}) => {
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const [answer, setSoalList] = useState([
    {
      key: "A",
      value: "",
      option: "",
      image: "",
      imageName: "Pilih Gambar",
      is_right: false,
    },
    {
      key: "B",
      value: "",
      option: "",
      image: "",
      imageName: "Pilih Gambar",
      is_right: false,
    },
    {
      key: "C",
      value: "",
      option: "",
      image: "",
      imageName: "Pilih Gambar",
      is_right: false,
    },
    {
      key: "D",
      value: "",
      option: "",
      image: "",
      imageName: "Pilih Gambar",
      is_right: false,
    },
  ]);
  const [answer_key, setAnswerKey] = useState("");
  const [duration, setDuration] = useState(null);

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

  const handleAnswer = (value, i) => {
    setAnswerKey(answer[i].key);
    props_answer_key(answer[i].key);
    if (value === false) {
      setAnswerKey("");
      props_answer_key("");
    }
    const list = [...answer];
    list[i]["is_right"] = value;
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
      <div className="form-group">
        {answer.map((x, i) => {
          return (
            <>
              <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Jawaban {x.key}
                  </label>
                  <input
                    type="text"
                    className="form-control pb-0 my-0"
                    name="option"
                    value={x.option}
                    placeholder={`Isi Jawaban ${x.key}`}
                    onChange={(e) => handleInputChange(e, i)}
                    autoComplete="off"
                  />
                </div>
                <div className="col-sm-12 col-md-5 col-lg-5 col-xl-4">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Input Gambar (Optional)
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input pb-0 my-0"
                      name="image"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {x.imageName}
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <label
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0 ml-1"
                  >
                    Nilai
                  </label>
                  <div className="row align-items-end">
                    <div className="form-group col-7 col-md-4 col-lg-4 col-xl-4 mb-0">
                      <input
                        type="number"
                        className={`${styles.inputNilaiCheckbox} form-control`}
                        name="value"
                        value={x.value}
                        onChange={(e) => handleInputChange(e, i)}
                        autoComplete="off"
                        placeholder="2"
                      />
                    </div>

                    <div className="col-2 col-md-4 col-lg-4 col-xl-3">
                      {answer.length !== 1 && x.key !== "A" ? (
                        <button
                          className={`${styles.btnDeleteCheckbox} btn btn-link-action bg-danger text-white`}
                          type="button"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-link-action bg-danger text-white invisible"
                          type="button"
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      )}
                    </div>
                    <div
                      className={`${styles.btnSwitch} col-3 col-md-4 col-lg-4 col-xl-5`}
                    >
                      <SwitchButton
                        checked={x.is_right}
                        onlabel=" "
                        onstyle="primary"
                        offlabel=" "
                        offstyle="secondary"
                        size="sm"
                        width={20}
                        height={10}
                        onChange={(checked) => handleAnswer(checked, i)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="form-group ">
        <div>
          {answer.length < 6 ? (
            <button
              type="button"
              className={`${styles.btnAddAnswer} btn btn-secondary-rounded-full bg-blue-secondary text-white`}
              onClick={() => handleAddClick()}
            >
              <i className={`${styles.iconTambah} ri-add-fill text-white`}></i>
              <span>Tambah Jawaban</span>
            </button>
          ) : (
            ""
          )}
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
              onChange={(e) => {
                setDuration(e.target.value);
                props_duration(e.target.value);
              }}
              min={1}
              placeholder="120"
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

export default CheckboxComponent;
