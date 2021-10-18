import React, { useState, useRef } from "react";
import Select from "react-select";
import { Row, Col, Form } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

const EditKeterampilan = () => {
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
      </div>
    </>
  );
};

export default EditKeterampilan;
