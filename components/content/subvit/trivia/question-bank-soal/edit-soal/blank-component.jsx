import React, { useState } from "react";
import Image from "next/image";

const BlankComponent = ({
  propsAnswer,
  propsStatus,
  propsDuration,
  sendPropsAnswer,
  sendPropsStatus,
  sendPropsDuration,
}) => {
  const [answer, setAnswer] = useState(propsAnswer);
  const [status, setStatus] = useState(propsStatus);
  const [duration, setDuration] = useState(propsDuration);

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
                    <select
                      name="type"
                      className="form-control"
                      value={row.type}
                      placeholder={row.key}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option value="" disabled selected>
                        -- PILIHAN TIPE --
                      </option>
                      <option value="Percis">Percis</option>
                      <option value="Mengandung">Mengandung</option>
                      <option value="Sama Dengan">Sama Dengan</option>
                    </select>
                    <input
                      type="text"
                      name="option"
                      className="form-control mt-2"
                      placeholder={`Jawaban ` + row.key}
                      value={row.option}
                      onChange={(e) => handleInputChange(e, i)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-md-3 d-flex justify-content-start my-auto">
                    <div className="col-md-4 mb-5 pr-0">
                      <span className="text-muted">Nilai</span>
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        name="value"
                        value={row.value}
                        onChange={(e) => handleInputChange(e, i)}
                        autoComplete="off"
                      />
                    </div>
                    <button
                      className="btn pt-5"
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
        <div className="col-sm-12 col-md-4">
          <span>Durasi (Detik)</span>
          <input
            type="number"
            min={0}
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              sendPropsDuration(e.target.value);
            }}
            className="form-control"
          />
          <span className="text-muted">Silahkan Isi Durasi</span>
        </div>
        <div className="col-sm-12 col-md-4">
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

export default BlankComponent;
