import React, { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

const TriggeredQuestionComponent = ({ props_answer }) => {
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const [answer, setSoalList] = useState([
    {
      key: "A",
      option: "",
      image: "",
      imageName: "Choose File",
      type: "choose",
      is_next: true,
      sub: [
        {
          key: 1,
          question: "",
          image: "",
          imageName: "Choose File",
          is_next: false,
          answer: [
            { key: "A", option: "", image: "", type: "choose" },
            { key: "B", option: "", image: "", type: "choose" },
            { key: "C", option: "", image: "", type: "choose" },
          ],
        },
      ],
    },
    {
      key: "B",
      option: "",
      image: "",
      imageName: "Choose File",
      type: "choose",
      is_next: false,
      sub: [],
    },
    {
      key: "C",
      option: "",
      image: "",
      imageName: "Choose File",
      type: "choose",
      is_next: false,
      sub: [],
    },
  ]);

  const handleInputChange = (e, index, parent, children) => {
    const { name, value } = e.target;
    const list = [...answer];

    if (index == null && parent == null && children != null) {
      const listOption = list[children];
      if (name === "image") {
        listOption["imageName"] = e.target.files[0].name;
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            listOption.image = reader.result;
          }
        };
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      } else {
        listOption.option = value;
      }
    }

    if (index == null && parent != null && children != null) {
      const listAnswer = list[parent].sub[children];
      if (name === "image") {
        listAnswer.imageName = e.target.files[0].name;
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            listAnswer.image = reader.result;
          }
        };
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      } else {
        listAnswer.question = value;
      }
    }

    if (index != null && parent != null && children != null) {
      const listOption = list[index].sub[parent].answer[children];
      if (name === "image") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            listOption.image = reader.result;
          }
        };
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      } else {
        listOption.option = value;
      }
    }
    setSoalList(list);
    props_answer(list);
  };

  const handleRemoveClick = (index, parent, children) => {
    if (index == null && parent == null && children != null) {
      const list = [...answer];
      // delete list[children]
      list.splice(children, 1);
      list.forEach((row, i) => {
        let key = String.fromCharCode(65 + i);
        list[i]["key"] = key;
      });
      setSoalList(list);
      props_answer(list);
    }

    if (index == null && parent != null && children != null) {
      const list = [...answer];
      const induk = list[parent];
      const oldChil = children - 1;
      induk.sub[oldChil].is_next = false;

      // delete induk.sub[children]
      induk.sub.splice(children, 1);
      setSoalList(list);
      props_answer(list);
    }

    if (index != null && parent != null && children != null) {
      const list = [...answer];
      list.forEach((row1, i) => {
        row1.sub.forEach((row2, j) => {
          // delete row2.answer[children]
          row2.answer.splice(children, 1);
          row2.answer.forEach((row3, i) => {
            let key = String.fromCharCode(65 + i);
            row2.answer[i]["key"] = key;
          });
          setSoalList(list);
          props_answer(list);
        });
      });
    }
  };

  const handleAddClick = (type, index, parent) => {
    const list = [...answer];

    if (index == null && parent == null) {
      const lastobj = list[list.length - 1];
      const keyIndex = lastobj.key.charCodeAt(0);
      const newKey = String.fromCharCode(keyIndex + 1);
      const newObj = {
        key: newKey,
        option: "",
        image: "",
        type: type,
        is_next: false,
        sub: [],
      };
      list.push(newObj);
    }

    if ((index != null, parent != null)) {
      const listArrAnswer = list[index].sub[parent].answer;
      const lastobj = listArrAnswer[listArrAnswer.length - 1];
      const keyIndex = lastobj.key.charCodeAt(0);
      const newKey = String.fromCharCode(keyIndex + 1);
      const newObj = { key: newKey, option: "", image: "", type: type };
      listArrAnswer.push(newObj);
    }
    setSoalList(list);
    props_answer(list);
  };

  const handleNext = (value, parent, children) => {
    let list = [...answer];

    if (parent == null && children != null) {
      list[children].is_next = value;
      if (value === true) {
        const objAnswer = {
          key: 1,
          question: "",
          image: "",
          is_next: false,
          answer: [
            { key: "A", option: "", image: "", type: "choose" },
            { key: "B", option: "", image: "", type: "choose" },
            { key: "C", option: "", image: "", type: "choose" },
          ],
        };
        const listArrSub = list[children].sub;
        listArrSub.push(objAnswer);
      } else if (value === false) {
        list[children].sub = [];
      }
    }

    if (parent != null && children != null) {
      if (value === true) {
        const oldKey = list[parent].sub[children].key;
        const newKey = oldKey + 1;
        list[parent].is_next = value;
        list[parent].sub[children].is_next = value;
        const objAnswer = {
          key: newKey,
          question: "",
          image: "",
          is_next: false,
          answer: [
            { key: "A", option: "", image: "", type: "choose" },
            { key: "B", option: "", image: "", type: "choose" },
            { key: "C", option: "", image: "", type: "choose" },
          ],
        };
        const listArrSub = list[parent].sub;
        listArrSub.push(objAnswer);
      } else if (value === false) {
        // list[parent].is_next = value
        list[parent].sub[children].is_next = value;
        list[parent].sub.splice(children + 1);
      }
    }

    setSoalList(list);
    props_answer(list);
  };

  return (
    <>
      <div className="form-group row mt-5">
        {answer.map((x, i) => {
          return (
            <div className="col-12" key={i}>
              <div className="row">
                {x.type === "choose" ? (
                  <>
                    <div className="col-sm-12 col-md-3">
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
                        onChange={(e) => handleInputChange(e, null, null, i)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="col-sm-12 col-md-3">
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
                          onChange={(e) => handleInputChange(e, null, null, i)}
                          accept="image/png, image/gif, image/jpeg , image/jpg"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          {x.imageName}
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-sm-12 col-md-6">
                      <label
                        htmlFor="staticEmail"
                        className=" col-form-label font-weight-bold"
                      >
                        Jawaban Lain {x.key}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="option"
                        value={x.option}
                        autoComplete="off"
                        placeholder={`Jawaban Lain ${x.key}`}
                        disabled
                      />
                    </div>
                  </>
                )}
                <div className="col-sm-12 col-md-1 d-flex align-items-end mt-2">
                  {answer.length !== 1 && x.key !== "A" ? (
                    <button
                      className="btn btn-link-action bg-danger text-white"
                      type="button"
                      onClick={() => handleRemoveClick(null, null, i)}
                    >
                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-sm-12 col-md-5 d-flex align-items-end mt-2">
                  <SwitchButton
                    checked={x.is_next}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="secondary"
                    size="sm"
                    width={20}
                    height={10}
                    onChange={(checked) => handleNext(checked, null, i)}
                  />
                  {x.is_next ? (
                    <span className="font-weight-bold ml-2">
                      Ada Pertanyaan Selanjutnya ?
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                {x.sub.length != 0
                  ? x.sub.map((sub_question, j) => {
                    return (
                      <>
                        <div
                          className="col-sm-12 col-md-3"
                          key={j}
                          style={{ marginLeft: "20px" }}
                        >
                          <label
                            htmlFor="staticEmail"
                            className=" col-form-label font-weight-bold"
                          >
                            Isi Pertanyaan
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="option"
                            value={sub_question.question}
                            placeholder="Isi Pertanyaan"
                            onChange={(e) => handleInputChange(e, null, i, j)}
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-sm-12 col-md-3">
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
                              onChange={(e) =>
                                handleInputChange(e, null, i, j)
                              }
                              accept="image/png, image/gif, image/jpeg , image/jpg"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-1 d-flex align-items-end mt-2">
                          {j !== 0 ? (
                            <button
                              className="btn btn-link-action bg-danger text-white"
                              type="button"
                              onClick={() => handleRemoveClick(null, i, j)}
                            >
                              <i className="ri-delete-bin-fill p-0 text-white"></i>
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-sm-12 col-md-4 d-flex align-items-end mt-2">
                          {j < 4 ? (
                            <>
                              <SwitchButton
                                checked={sub_question.is_next}
                                onlabel=" "
                                onstyle="primary"
                                offlabel=" "
                                offstyle="secondary"
                                size="sm"
                                width={20}
                                height={10}
                                onChange={(checked) =>
                                  handleNext(checked, i, j)
                                }
                              />
                              {sub_question.is_next ? (
                                <span className="font-weight-bold ml-2">
                                  Ada Pertanyaan Selanjutnya ?
                                </span>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-12">
                          <div className="row">
                            {sub_question.answer.length != 0
                              ? sub_question.answer.map((sub_answer, k) => {
                                return (
                                  <>
                                    {sub_answer.type === "choose" ? (
                                      <>
                                        <div
                                          className="col-sm-12 col-md-3"
                                          style={{ marginLeft: "40px" }}
                                        >
                                          <label
                                            htmlFor="staticEmail"
                                            className=" col-form-label font-weight-bold"
                                          >
                                            Jawaban {sub_answer.key}
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder={`Isi Pilihan ${sub_answer.key}`}
                                            name="option"
                                            value={sub_answer.option}
                                            onChange={(e) =>
                                              handleInputChange(e, i, j, k)
                                            }
                                            autoComplete="off"
                                          />
                                        </div>
                                        <div className="col-sm-12 col-md-3">
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
                                              onChange={(e) =>
                                                handleInputChange(
                                                  e,
                                                  i,
                                                  j,
                                                  k
                                                )
                                              }
                                              accept="image/png, image/gif, image/jpeg , image/jpg"
                                            />
                                            <label
                                              className="custom-file-label"
                                              htmlFor="customFile"
                                            >
                                              Choose file
                                            </label>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div
                                          className="col-sm-12 col-md-6"
                                          style={{ marginLeft: "40px" }}
                                        >
                                          <label
                                            htmlFor="staticEmail"
                                            className=" col-form-label font-weight-bold"
                                          >
                                            Jawaban Lain {sub_answer.key}
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="option"
                                            value={sub_answer.option}
                                            autoComplete="off"
                                            placeholder={`Jawaban Lain ${sub_answer.key}`}
                                            disabled
                                          />
                                        </div>
                                      </>
                                    )}

                                    <div className="col-sm-12 col-md-1 d-flex align-items-end mt-2">
                                      <button
                                        className="btn btn-link-action bg-danger text-white"
                                        type="button"
                                        onClick={() =>
                                          handleRemoveClick(i, j, k)
                                        }
                                      >
                                        <i className="ri-delete-bin-fill p-0 text-white"></i>
                                      </button>
                                    </div>
                                    <div className="col-sm-12 col-md-4"></div>
                                  </>
                                );
                              })
                              : ""}
                            <div
                              className="form-group row"
                              style={{ marginLeft: "40px" }}
                            >
                              <div className="col-sm-12 col-md-12 d-flex mt-2">
                                {sub_question.answer.length < 6 ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm mr-2"
                                      onClick={() =>
                                        handleAddClick("choose", i, j)
                                      }
                                    >
                                      Tambah Jawaban
                                    </button>
                                    {sub_question.answer.length > 2 ? (
                                      <>
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-sm"
                                          onClick={() =>
                                            handleAddClick("empty", i, j)
                                          }
                                        >
                                          Tambah Jawaban Lain
                                        </button>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                  : ""}
              </div>
            </div>
          );
        })}
      </div>

      <div className="form-group row">
        <div className="col-sm-6 col-md-5 d-flex">
          {answer.length < 6 ? (
            <>
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={() => handleAddClick("choose", null, null)}
              >
                Tambah Jawaban
              </button>
              {answer.length > 2 ? (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleAddClick("empty", null, null)}
                  >
                    Tambah Jawaban Lain
                  </button>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default TriggeredQuestionComponent;
