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
    list.forEach((row, i) => {
      let key = String.fromCharCode(65 + i);
      list[i]["key"] = key;
    });
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

  const handleStatus = (e) => {
    setStatus(e.target.value);
    sendPropsStatus(e.target.value);
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
                  <div className="col-md-9 pt-2">
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
                        accept="image/png, image/gif, image/jpeg , image/jpg"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="col-md-1 d-flex justify-content-start my-auto">
                    <button
                      className="btn btn-link-action bg-danger text-white"
                      type="button"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <i className="ri-delete-bin-fill p-0 text-white"></i>
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
            className="btn btn-rounded-full bg-blue-secondary text-white btn-sm"
            onClick={() => handleAddClick()}
          >
            <i className="ri-add-fill text-white"></i> Tambah Jawaban
          </button>
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
          <span className="text-muted">Silahkan Pilih Status</span>
        </div>
      </div>
    </>
  );
};

export default MultipleChoiceComponent;
