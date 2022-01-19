import React, { useState, useRef } from "react";
import Select from "react-select";
import { Row, Col, Form, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import style from "../style.module.css";

const EditKeterampilan = ({ funcViewEdit }) => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [keterampilan, setKeterampilan] = useState([]);

  const optionsKeterampilan = [
    { value: "0", label: "PHP" },
    { value: "1", label: "React" },
    { value: "2", label: "Laravel" },
  ];

  const hendleSelectKeterampilan = (val) => {};
  return (
    <>
      <div className="mt-5 keterampilan">
        <h3 className="font-weight-bolder mb-5">Keterampilan</h3>
        <Form.Group controlId="keterampilan">
          <Form.Label>Pilih Keterampilan</Form.Label>
          <Select
            isMulti
            options={optionsKeterampilan}
            defaultValue={keterampilan}
            onChange={(e) => hendleSelectKeterampilan(e.value)}
            onBlur={() =>
              simpleValidator.current.showMessageFor("keterampilan")
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {simpleValidator.current.message(
            "keterampilan",
            keterampilan,
            "required",
            {
              className: "text-danger",
            }
          )}
        </Form.Group>
        <div className="button-aksi mt-5 float-right">
          <Button
            className={`${style.button_profile_batal} rounded-xl mr-2`}
            type="button"
            onClick={() => funcViewEdit(false)}
          >
            Batal
          </Button>
          <Button
            className={`${style.button_profile_simpan} rounded-xl`}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditKeterampilan;
