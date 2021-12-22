import React, { Fragment } from "react";
import style from "./wizzard.module.css";

export default function Step(props) {
	return (
		<div className={`${style.bigStepperWrapper} `}>
			<div className="d-flex justify-content-center align-items-center">
				<div
					className={`${style.bigStepperCircle} fz-20 d-flex justify-content-center align-items-center font-weight-bolder`}
				>
					{props.no}
				</div>
			</div>
			<div className="d-flex justify-content-center align-items-center">
				<p className="d-flex justify-content-center w-100 text-nowrap font-weight-bold fz-14">
					{props.label}
				</p>
			</div>
		</div>
	);
}
