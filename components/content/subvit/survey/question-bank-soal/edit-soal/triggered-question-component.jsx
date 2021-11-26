import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const TriggeredQuestionComponent = ({
  propsAnswer,
  propsStatus,
  sendPropsAnswer,
  sendPropsStatus,
}) => {
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const [answer, setAnswer] = useState(propsAnswer);
  const [status, setStatus] = useState(propsStatus);

  const handleInputChange = (e, index, parent, children) => {
    const { name, value } = e.target;
    const list = [...answer];

    if (index == null && parent == null && children != null) {
      const listOption = list[children];
      if (name !== "question_image") listOption.option = value;
      if (name === "question_image") {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              listOption.image = reader.result;
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          listOption.image_name = e.target.files[0].name;
          listOption.image_preview = URL.createObjectURL(e.target.files[0]);
        }
      }
    }

    if (index == null && parent != null && children != null) {
      const listAnswer = list[parent].sub[children];
      if (name !== "question_image") listAnswer.option = value;
      if (name === "question_image") {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              listAnswer.image = reader.result;
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          listAnswer.image_name = e.target.files[0].name;
          listAnswer.image_preview = URL.createObjectURL(e.target.files[0]);
        }
      }
    }

    if (index != null && parent != null && children != null) {
      const listOption = list[index].sub[parent].answer[children];
      if (name !== "question_image") listOption.option = value;
      if (name === "question_image") {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              listOption.image = reader.result;
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          listOption.image_name = e.target.files[0].name;
          listOption.image_preview = URL.createObjectURL(e.target.files[0]);
        }
      }
    }
    setAnswer(list);
    sendPropsAnswer(list);
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
      setAnswer(list);
      sendPropsAnswer(list);
    }

    if (index == null && parent != null && children != null) {
      const list = [...answer];
      const induk = list[parent];
      const oldChil = children - 1;
      induk.sub[oldChil].is_next = false;

      // delete induk.sub[children]
      induk.sub.splice(children, 1);
      setAnswer(list);
      sendPropsAnswer(list);
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
          setAnswer(list);
          sendPropsAnswer(list);
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
        image_preview: "",
        image_name: "",
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
      const newObj = {
        key: newKey,
        option: "",
        image: "",
        image_preview: "",
        image_name: "",
        type: type,
      };
      listArrAnswer.push(newObj);
    }
    setAnswer(list);
    sendPropsAnswer(list);
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
            {
              key: "A",
              option: "",
              image: "",
              image_preview: "",
              image_name: "",
              type: "choose",
            },
            {
              key: "B",
              option: "",
              image: "",
              image_preview: "",
              image_name: "",
              type: "choose",
            },
            {
              key: "C",
              option: "",
              image: "",
              image_preview: "",
              image_name: "",
              type: "choose",
            },
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
            {
              key: "A",
              option: "",
              image: "",
              image_preview: "",
              image_name: "",
              type: "choose",
            },
            {
              key: "B",
              option: "",
              image: "",
              image_preview: "",
              image_name: "",
              type: "choose",
            },
            {
              key: "C",
              option: "",
              image: "",
              image_preview: "",
              image_name: "",
              type: "choose",
            },
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

    const handleStatus = (e) => {
      setStatus(e.target.value);
      sendPropsStatus(e.target.value);
    };

    setAnswer(list);
    sendPropsAnswer(list);
  };

  return (
    <>
      <div className="answer mt-5">
        {answer &&
          answer.map((row, i) => {
            return (
              <>
                <div className="title row">
                  {row.type === "choose" ? (
                    <>
                      <div className="col-md-2 p-0 pl-3">
                        {row.image ? (
                          <Image
                            src={
                              row.image_preview.includes("blob")
                                ? row.image_preview
                                : process.env.END_POINT_API_IMAGE_SUBVIT +
                                  "survey/images/" +
                                  row.image_preview
                            }
                            alt="logo"
                            width={148}
                            height={90}
                            className="soal-image"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-6 pt-2">
                        <input
                          type="text"
                          name="option"
                          className="form-control"
                          placeholder={`Jawaban ` + row.key}
                          value={row.option}
                          onChange={(e) => handleInputChange(e, null, null, i)}
                          autoComplete="off"
                        />
                        <div className="custom-file mt-2">
                          <span>Gambar Pertanyaan (Opsional)</span>
                          <input
                            type="file"
                            className="custom-file-input"
                            name="question_image"
                            onChange={(e) =>
                              handleInputChange(e, null, null, i)
                            }
                            accept="image/png, image/gif, image/jpeg , image/jpg"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            {row.image_name || "Pilih Gambar"}
                          </label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-8 pt-2">
                        <input
                          type="text"
                          name="option"
                          className="form-control"
                          placeholder={`Jawaban Lain`}
                          value=""
                          autoComplete="off"
                          disabled
                        />
                      </div>
                    </>
                  )}

                  <div className="col-md-4 d-flex justify-content-start my-auto">
                    {i !== 0 ? (
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
                    <div className="d-flex ml-5">
                      <SwitchButton
                        checked={row.is_next}
                        onlabel=" "
                        onstyle="primary"
                        offlabel=" "
                        offstyle="danger"
                        size="sm"
                        width={10}
                        height={10}
                        onChange={(checked) => handleNext(checked, null, i)}
                      />
                      {row.is_next ? (
                        <span className="ml-2 font-weight-bold">
                          pertanyaan selanjutnya
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {row.sub && row.sub.length != 0
                    ? row.sub.map((rowY, j) => {
                        return (
                          <>
                            <div className="col-md-1"></div>
                            <div className="col-md-2 p-0 pl-3" key={j}>
                              {rowY.image != "" ? (
                                <Image
                                  src={
                                    rowY.image_preview.includes("blob")
                                      ? rowY.image_preview
                                      : process.env.END_POINT_API_IMAGE_SUBVIT +
                                        "survey/images/" +
                                        rowY.image_preview
                                  }
                                  alt="logo"
                                  width={148}
                                  height={90}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-md-5 pt-2">
                              <input
                                type="text"
                                name="question"
                                className="form-control"
                                placeholder={`Soal Lanjutan`}
                                value={rowY.question}
                                onChange={(e) =>
                                  handleInputChange(e, null, i, j)
                                }
                                autoComplete="off"
                              />
                              <div className="custom-file mt-2">
                                <span>Gambar Pertanyaan (Opsional)</span>
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="question_image"
                                  onChange={(e) =>
                                    handleInputChange(e, null, i, j)
                                  }
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  {rowY.image_name || "Pilih Gambar"}
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4 d-flex justify-content-start my-auto">
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
                              <div className="d-flex ml-4">
                                {j < 4 ? (
                                  <>
                                    <SwitchButton
                                      checked={rowY.is_next}
                                      onlabel=" "
                                      onstyle="primary"
                                      offlabel=" "
                                      offstyle="danger"
                                      size="sm"
                                      width={10}
                                      height={10}
                                      onChange={(checked) =>
                                        handleNext(checked, i, j)
                                      }
                                    />
                                    <span className="font-weight-bold ml-2">
                                      pertanyaan selanjutnya
                                    </span>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            {rowY.answer.length !== 0
                              ? rowY.answer.map((rowX, k) => {
                                  return (
                                    <>
                                      <div className="col-md-2"></div>
                                      {rowX.type === "choose" ? (
                                        <>
                                          <div
                                            className="col-md-2 p-0 pl-3"
                                            key={k}
                                          >
                                            <Image
                                              src={
                                                rowX.image_preview.includes(
                                                  "blob"
                                                )
                                                  ? rowX.image_preview
                                                  : process.env
                                                      .END_POINT_API_IMAGE_SUBVIT +
                                                    "survey/images/" +
                                                    rowX.image_preview
                                              }
                                              alt="logo"
                                              width={148}
                                              height={90}
                                            />
                                          </div>
                                          <div className="col-md-4 pt-2">
                                            <input
                                              type="text"
                                              name="option"
                                              className="form-control"
                                              placeholder={`Isi Pilihan ${rowX.key}`}
                                              value={rowX.option}
                                              onChange={(e) =>
                                                handleInputChange(e, i, j, k)
                                              }
                                              autoComplete="off"
                                            />
                                            <div className="custom-file mt-2">
                                              <span>
                                                Gambar Pertanyaan (Opsional)
                                              </span>
                                              <input
                                                type="file"
                                                className="custom-file-input"
                                                name="question_image"
                                                onChange={(e) =>
                                                  handleInputChange(e, i, j, k)
                                                }
                                              />
                                              <label
                                                className="custom-file-label"
                                                htmlFor="customFile"
                                              >
                                                {rowX.image_name ||
                                                  "Pilih Gambar"}
                                              </label>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="col-md-8 pt-2">
                                            <input
                                              type="text"
                                              name="option"
                                              className="form-control"
                                              placeholder={`Jawaban Lain`}
                                              value=""
                                              autoComplete="off"
                                              disabled
                                            />
                                          </div>
                                        </>
                                      )}
                                      <div className="col-md-4 d-flex justify-content-start my-auto">
                                        {k !== 0 ? (
                                          <button
                                            className="btn btn-link-action bg-danger text-white"
                                            type="button"
                                            onClick={() =>
                                              handleRemoveClick(i, j, k)
                                            }
                                          >
                                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                                          </button>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </>
                                  );
                                })
                              : ""}
                            <div className="col-md-2 col-sm-2"></div>
                            <div className="col-sm-10 col-md-10 d-flex">
                              {rowY.answer.length < 6 ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-rounded-full bg-blue-secondary text-white btn-sm mr-2 my-3"
                                    onClick={() =>
                                      handleAddClick("choose", i, j)
                                    }
                                  >
                                    <i className="ri-add-fill text-white"></i>
                                    Tambah Jawaban
                                  </button>
                                  {rowY.answer.length > 2 ? (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-rounded-full bg-blue-secondary text-white btn-sm my-3"
                                        onClick={() =>
                                          handleAddClick("empty", i, j)
                                        }
                                      >
                                        <i className="ri-add-fill text-white"></i>
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
                          </>
                        );
                      })
                    : ""}
                </div>
              </>
            );
          })}
      </div>

      {answer.length < 6 ? (
        <div className="d-flex my-3">
          <button
            type="button"
            className="btn btn-rounded-full bg-blue-secondary text-white btn-sm mr-2"
            onClick={() => handleAddClick("choose", null, null)}
          >
            <i className="ri-add-fill text-white"></i>Tambah Jawaban
          </button>
          {answer.length > 2 ? (
            <button
              type="button"
              className="btn btn-rounded-full bg-blue-secondary text-white btn-sm"
              onClick={() => handleAddClick("empty", null, null)}
            >
              <i className="ri-add-fill text-white"></i>Tambah Jawaban Lain
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <div className="form-group row">
        <div className="col-sm-12 col-md-12">
          <span>Status</span>
          <select
            name="training_id"
            className="form-control"
            onChange={(event) => {
              handleStatus(event);
            }}
            onBlur={(event) => {
              handleStatus(event);
            }}
            value={status}
          >
            <option selected disabled value="">
              -- Status --
            </option>
            <option value={1}>Publish</option>
            <option value={0}>Draft</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TriggeredQuestionComponent;
