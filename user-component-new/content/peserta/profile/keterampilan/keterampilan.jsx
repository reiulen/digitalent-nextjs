import React from "react";
import style from "./style.module.css";
import { Row, Col } from "react-bootstrap";

const Keterampilan = () => {
  return (
    <>
      <div className="mt-5 keterampilan">
        <h3 className="font-weight-bolder mb-5">Keterampilan</h3>
        {["Figma", "PHP", "React"].map((row, i) => (
          <button type="button" className={`btn mr-4 ${style.custom_button}`}>
            {row}
          </button>
        ))}
      </div>
    </>
  );
};

export default Keterampilan;
