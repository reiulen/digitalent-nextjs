import React from "react";
import style from "./wizzard.module.css";

export default function Step(props) {
  return (
    <div
      className={
        props.finish
          ? `${style.stepBlock} my-10 ${style.finish}`
          : `${style.stepBlock} my-10`
      }
    >
      <div
        className={
          props.selected
            ? `${style.circleWrapper} ${style.circleWrapperSelected} position-relative `
            : `${style.circleWrapper} position-relative`
        }
      >
        <div
          className={
            props.selected
              ? `${style.circle} ${style.selected}`
              : `${style.circle} `
          }
        >
          {props.no}
        </div>
      </div>
    </div>
  );
}
