import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { Stepper, Step } from "react-form-stepper";
import Steppers from "./stepper";
import StepperBig from "./stepperBig";

const InformasiEdit = dynamic(
	() => import("../profile/informasi/informasi.edit"),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

const Profile = ({ session }) => {
	const router = useRouter();

	const [viewProfile, setViewProfile] = useState(1);
	const [viewEdit, setViewEdit] = useState(true);
	const [step, setStep] = useState([1, 2, 3, 4]);

	const [label, setLabel] = useState([
		"Informasi Pribadi",
		"Alamat",
		"Pendidikan",
		"Pekerjaan",
	]);

	return (
		<>
			<Col md={12} style={{ marginTop: "-2%" }}>
				<Row>
					<Col md={12}>
						<Card className="mb-8 mt-n12 mt-md-n8">
							<div className=" d-flex justify-content-center align-items-center d-md-none ">
								{step.map((el, i) => {
									return (
										<Steppers
											no={el}
											finish={i >= viewProfile}
											selected={i == viewProfile - 1}
											label={label[i]}
											key={i}
										></Steppers>
									);
								})}
							</div>

							<Card.Body className="p-0">
								<div className="d-md-flex d-none justify-content-center align-items-center h-100 w-100 my-10">
									{step.map((el, i) => {
										return (
											<StepperBig
												no={step[i]}
												label={label[i]}
												finish={i >= viewProfile - 1}
												selected={i == viewProfile - 1}
												key={i}
											/>
										);
									})}
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col md={12}>
						<Card className="card-custom gutter-b">
							<Card.Body>
								{/* {handleViewProfile()} */}
								<InformasiEdit wizzard={true} token={session.token} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default Profile;
