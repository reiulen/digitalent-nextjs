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
      listOption.option = value;
      if (name === "image") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            listOption.image = reader.result;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    if (index == null && parent != null && children != null) {
      const listAnswer = list[parent].sub[children];
      listAnswer.question = value;
      if (name === "image") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            listAnswer.image = reader.result;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    if (index != null && parent != null && children != null) {
      const listOption = list[index].sub[parent].answer[children];
      listOption.option = value;
      if (name === "image") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            listOption.image = reader.result;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
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
          setAnswer(list);
          sendPropsAnswer(list);
        });
      });
    }
  };

  const handleAddClick = (type, index, parent) => {
    console.log(type, index, parent);
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
                  {/* {
                                        row.image != '' ? ( */}
                  {/* ) : ''
                                    } */}
                  {row.type === "choose" ? (
                    <>
                      <div className="col-md-2 p-0 pl-3">
                        <Image
                          src="/assets/media/Gambar.svg"
                          alt="logo"
                          width={148}
                          height={90}
                        />
                      </div>
                      <div className="col-md-7 pt-2">
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
                      <div className="col-md-9 pt-2">
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

                  <div className="col-md-3 d-flex justify-content-start my-auto">
                    {i !== 0 ? (
                      <button
                        className="btn pt-0 mr-3 mt-5"
                        type="button"
                        onClick={() => handleRemoveClick(null, null, i)}
                      >
                        <Image
                          alt="button-action"
                          src="/assets/icon/trash-red.svg"
                          width={20}
                          height={30}
                        />
                      </button>
                    ) : (
                      ""
                    )}
                    <div className="">
                      <span className="text-muted">pertanyaan selanjutnya</span>
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
                    </div>
                  </div>
                  {row.sub.length != 0
                    ? row.sub.map((rowY, j) => {
                        return (
                          <>
                            <div className="col-md-2"></div>
                            <div className="col-md-2 p-0 pl-3" key={j}>
                              <Image
                                src="/assets/media/Gambar.svg"
                                alt="logo"
                                width={148}
                                height={90}
                              />
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
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  Choose file
                                </label>
                              </div>
                            </div>
                            <div className="col-md-3 d-flex justify-content-start my-auto">
                              {j !== 0 ? (
                                <button
                                  className="btn pt-0 mr-3 mt-5"
                                  type="button"
                                  onClick={() => handleRemoveClick(null, i, j)}
                                >
                                  <Image
                                    alt="button-action"
                                    src="/assets/icon/trash-red.svg"
                                    width={20}
                                    height={30}
                                  />
                                </button>
                              ) : (
                                ""
                              )}
                              <div className="">
                                {j < 4 ? (
                                  <>
                                    <span className="text-muted">
                                      pertanyaan selanjutnya
                                    </span>
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
                                      <div className="col-md-3"></div>
                                      {rowX.type === "choose" ? (
                                        <>
                                          <div
                                            className="col-md-2 p-0 pl-3"
                                            key={k}
                                          >
                                            <Image
                                              src="/assets/media/Gambar.svg"
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
                                          <div className="col-md-6 pt-2">
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
                                      <div className="col-md-3 d-flex justify-content-start my-auto">
                                        {k !== 0 ? (
                                          <button
                                            className="btn pt-0 mr-3"
                                            type="button"
                                            onClick={() =>
                                              handleRemoveClick(i, j, k)
                                            }
                                          >
                                            <Image
                                              alt="button-action"
                                              src="/assets/icon/trash-red.svg"
                                              width={20}
                                              height={30}
                                            />
                                          </button>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </>
                                  );
                                })
                              : ""}
                            <div className="col-md-3 col-sm-3"></div>
                            <div className="col-sm-9 col-md-9 d-flex">
                              {rowY.answer.length < 6 ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-light-success font-weight-bold btn-sm mr-2 my-3"
                                    onClick={() =>
                                      handleAddClick("choose", i, j)
                                    }
                                  >
                                    Tambah Jawaban
                                  </button>
                                  {rowY.answer.length > 2 ? (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-light-success font-weight-bold btn-sm my-3"
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
        <>
          <button
            type="button"
            className="btn btn-light-success font-weight-bold mr-2 my-3"
            onClick={() => handleAddClick("choose", null, null)}
          >
            Tambah Jawaban
          </button>
          {answer.length > 2 ? (
            <>
              <button
                type="button"
                className="btn btn-light-success font-weight-bold"
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

      <div className="form-group row">
        <div className="col-sm-12 col-md-5">
          <span>Status</span>
          <select
            name="training_id"
            className="form-control"
            onChange={(e) => {
              setStatus(e.target.value);
              sendPropsStatus(e.target.value);
            }}
            onBlur={(e) => {
              setStatus(e.target.value);
              sendPropsStatus(e.target.value);
            }}
            value={status}
          >
            <option selected disabled value="">
              -- Status --
            </option>
            <option value={1}>Publish</option>
            <option value={0}>Draft</option>
          </select>
          <span className="text-muted">Silahkan Pilih Status</span>
        </div>
      </div>
    </>
  );
};

export default TriggeredQuestionComponent;
