import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newPendaftaranPelatihan,
  storeFormRegister,
} from "../../../../redux/actions/pelatihan/register-training.actions";

const FormPendaftaran = ({ propsTitle, funcView, token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [title, setTitle] = useState(propsTitle);
  const { dataForm } = useSelector((state) => state.formRegister);
  const [dataPendaftaran, setDataPendaftaran] = useState(
    dataForm?.form_pendaftaran
  );

  const readerElementHandler = (row, i) => {
    switch (row.type) {
      case "text":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.type}
              name={row.name}
              className="form-control"
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              value={row.value}
            />
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "select":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select
              name={row.name}
              className="form-control"
              value={row.value}
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
            >
              <option value="" disabled selected>
                Silahkan Pilih {row.name}
              </option>
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <option value={dat} key={i}>
                      {dat}
                    </option>
                  ))
                : ""}
            </select>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "checkbox":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, j) => (
                    <div className="form-check pb-3" key={j}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(row.name)
                        }
                        onChange={(e) => onChangeInput(i, dat)}
                        value={dat}
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : ""}
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "textarea":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name={row.name}
              cols="30"
              rows="5"
              className="form-control"
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              value={row.value}
            />
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "radio":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, j) => (
                    <div className="form-check pb-3" key={j}>
                      <input
                        type="radio"
                        name={row.name}
                        className="form-check-input"
                        value={dat}
                        onChange={(e) => onChangeInput(i, dat)}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(row.name)
                        }
                        value={row.value}
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : ""}
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "file_image":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                onChange={(e) => onChangeInput(i, e)}
                onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName || "Belum ada File"}
              </label>
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "file_doc":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                onChange={(e) => onChangeInput(i, e)}
                onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName || "Belum ada File"}
              </label>
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "date":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.type}
              name={row.name}
              className="form-control"
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              value={row.value}
            />
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      default:
        break;
    }
  };

  const onChangeInput = (index, value) => {
    let list = [...dataPendaftaran];
    list[index].value = value;
    if (list[index].type === "file_image" || list[index].type === "file_doc") {
      let type = [""];
      if (list[index].type === "file_image") {
        type = ["image/jpg", "image/png", "image/jpeg"];
      } else if (list[index].type === "file_doc") {
        type = ["application/pdf"];
      }
      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              list[index].value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          list[index].fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }
    setDataPendaftaran(list);
    // funcForm(list);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (dataForm?.komitmen) {
      if (simpleValidator.current.allValid()) {
        const data = {
          komitmen: dataForm.komitmen,
          form_pendaftaran: dataPendaftaran,
        };
        dispatch(storeFormRegister(data));
        funcView(2);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data dengan benar !",
        });
      }
    } else {
      const data = {
        komitmen: `${dataForm.komitmen}`,
        form_pendaftaran: dataPendaftaran,
        pelatian_id: +router.query.id,
      };
      dispatch(newPendaftaranPelatihan(data, token));
    }
  };

  return (
    <>
      <Card.Body>
        <form onSubmit={onSubmit}>
          <h3 className="font-weight-bolder pb-5 pt-4">{title}</h3>
          <div className="row">
            {dataPendaftaran &&
              dataPendaftaran.map((row, i) => (
                <>{readerElementHandler(row, i)}</>
              ))}
          </div>

          <div className="button-aksi mt-7 float-right">
            <Button
              className={`${style.button_profile_batal} rounded-xl mr-3`}
              type="button"
              onClick={() => router.back()}
            >
              Batal
            </Button>
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
            >
              {dataForm?.komitmen ? "Lanjut" : "Daftar"}
            </Button>
          </div>
        </form>
      </Card.Body>
    </>
  );
};

export default FormPendaftaran;
