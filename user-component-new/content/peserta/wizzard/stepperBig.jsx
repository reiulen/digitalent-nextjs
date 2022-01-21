import React, { Fragment } from "react";
import style from "./wizzard.module.css";

export default function Step(props) {
	return (
		<div className={`${style.stepBlock2}`}>
			<div
				className={
					props.finish
						? `${style.bigStepperWrapper} ${style.bigStepperWrapperFinish} `
						: `${style.bigStepperWrapper}`
				}
			>
				<div
					className={
						props.selected
							? `${style.bigCircleSelected} fz-20 d-flex justify-content-center align-items-center font-weight-bolder`
							: `${style.bigCircle} fz-20 d-flex justify-content-center align-items-center font-weight-bolder`
					}
				>
					{props.no}
				</div>
			</div>
			<span
				className={`d-flex justify-content-center align-items-center font-weight-bold fz-14`}
			>
				{props.label}
			</span>
		</div>
	);
}
