import React, { useState } from "react";

import Image from "next/image";

const ObjectiveComponent = ({ props_answer }) => {
  const [answer, setSoalList] = useState([
    { key: "A", option: "", image: "" },
    { key: "B", option: "", image: "" },
    { key: "C", option: "", image: "" },
    { key: "D", option: "", image: "" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index]["image"] = reader.result;
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
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
      { key: newKey, question: "", image: "", is_right: false },
    ]);
    props_answer([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
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
                  className=" col-form-label font-weight-bold"
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
              <div className="col-sm-12 col-md-6">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold"
                >
                  Input Gambar (Optional)
                </label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="image"
                    onChange={(e) => handleInputChange(e, i)}
                    accept="image/png, image/gif, image/jpeg , image/jpg"
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose file
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-1 d-flex align-items-end mt-2">
                {answer.length !== 1 && x.key !== "A" ? (
                  <button
                    className="btn btn-link-action bg-danger text-white"
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
        <div className="col-sm-7 col-md-4">
          {answer.length < 6 ? (
            <button
              type="button"
              className="btn btn-rounded-full bg-blue-secondary text-white"
              onClick={() => handleAddClick()}
            >
              <i className="ri-add-fill text-white"></i> Tambah Jawaban
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ObjectiveComponent;
