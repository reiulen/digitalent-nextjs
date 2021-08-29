import React, { useState } from "react";
import Image from "next/image";

const MultipleChoiceComponent = ({
  propsAnswer,
  propsStatus,
  sendPropsAnswer,
  sendPropsStatus,
}) => {
  const [answer, setAnswer] = useState(propsAnswer);
  const [status, setStatus] = useState(propsStatus);

  const handleRemoveClick = (index) => {
    const list = [...answer];
    list.splice(index, 1);
    setAnswer(list);
    sendPropsAnswer(list);
  };

  const handleAddClick = () => {
    const lastobj = answer[answer.length - 1];
    const keyindex = lastobj.key.charCodeAt(0);
    const newKey = String.fromCharCode(keyindex + 1);
    setAnswer([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
    sendPropsAnswer([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
  };

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
      reader.readAsDataURL(e.target.files[0]);
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
                  {row.image != "" ? (
                    <div className="col-md-2 p-0 pl-3">
                      <Image
                        src="/assets/media/Gambar.svg"
                        alt="logo"
                        width={148}
                        height={90}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-md-8 pt-2">
                    <input
                      type="text"
                      name="option"
                      className="form-control"
                      placeholder={`Jawaban ` + row.key}
                      value={row.option}
                      onChange={(e) => handleInputChange(e, i)}
                      autoComplete="off"
                    />
                    <div className="custom-file mt-2">
                      <span>Gambar Pertanyaan (Opsional)</span>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="question_image"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-start my-auto">
                    <button
                      className="btn pt-0 mr-3"
                      type="button"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <Image
                        alt="button-action"
                        src="/assets/icon/trash-red.svg"
                        width={20}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>

      {answer.length < 6 ? (
        <div className="button-add my-4">
          <button
            type="button"
            className="btn btn-sm btn-light-success font-weight-bold"
            onClick={() => handleAddClick()}
          >
            Tambah Jawaban
          </button>
        </div>
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

export default MultipleChoiceComponent;
