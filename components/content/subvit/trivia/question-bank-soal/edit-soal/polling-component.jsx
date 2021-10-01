import React, { useState } from "react";
import Image from "next/image";

const PollingComponent = ({
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
      {
        key: newKey,
        question: "",
        image: "",
        image_preview: "",
        image_name: "",
        is_right: false,
      },
    ]);
    sendPropsAnswer([
      ...answer,
      {
        key: newKey,
        question: "",
        image: "",
        image_preview: "",
        is_right: false,
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.log("hello");
    const list = [...answer];
    list[index][name] = value;
    if (name === "question_image") {
      if (e.target.files[0]) {
        list[index]["image_preview"] = URL.createObjectURL(e.target.files[0]);
        list[index]["image_name"] = e.target.files[0].name;
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            list[index]["image"] = reader.result;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
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
                  {row.image_preview != "" ? (
                    <div className="col-md-2 p-0 pl-3">
                      <Image
                        src={
                          row.image_preview.includes("blob")
                            ? row.image_preview
                            : process.env.END_POINT_API_IMAGE_SUBVIT +
                              row.image_preview
                        }
                        alt="logo"
                        width={148}
                        height={90}
                        objectFit="cover"
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
                        accept="image/png, image/gif, image/jpeg , image/jpg"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {row.image_name || "Pilih Gambar"}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-start my-auto">
                    <button
                      className="btn btn-link-action bg-danger text-white my-2"
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
          <label
            htmlFor="staticEmail"
            className=" col-form-label font-weight-bold pb-0"
          >
            Status
          </label>
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
        </div>
      </div>
    </>
  );
};

export default PollingComponent;
