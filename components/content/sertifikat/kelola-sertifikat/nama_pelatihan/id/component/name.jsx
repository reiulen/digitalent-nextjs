import React from "react";

export default function Nama(props) {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: props.name,
			}}
			className="my-auto m-0 p-0 test"
			style={{ margin: "0px" }}
		></div>
	);
}
