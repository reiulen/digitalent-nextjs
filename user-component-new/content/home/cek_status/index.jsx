import React, { useState, useEffect } from "react";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";

import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import HomeWrapper from "../../../components/wrapper/Home.wrapper";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getCheckStatusSertifikat } from "../../../../redux/actions/beranda/check-sertifikat.actions";

export default function Kontak() {
	const [dataSertifikat, setDataSertifikat] = useState("");
	const dispatch = useDispatch();
	const [nomorRegistrasi, setNomorRegistrasi] = useState("");
	const { error, data } = useSelector((state) => state.CheckStatusSertifikat);

	const router = useRouter();

	const handleSubmitButton = (nomerRegistrasi) => {
		router.push(`/cek-sertifikat?registrasi=${nomerRegistrasi}`);
		// dispatch(getCheckStatusSertifikat(nomerRegistrasi));
	};

	return (
		<>
			<HomeWrapper>
				<BreadcrumbComponent
					data={[{ link: router.asPath, name: "Cek Sertifikat" }]}
				/>
				<div className="mt-5">
					<h1 className="fw-700 fz-40">Cek Sertifikat</h1>
					<p className="mr-6 fz-18 text-muted fw-400">
						Cek keaslian sertifikat pelatihan Digital Talent Scholarship
					</p>
				</div>
				<div className="my-10 w-100">
					<Card className="rounded-xl">
						<Row className="p-0 m-0">
							<Col lg={7} className="p-10">
								<p className="mb-0 fz-16 mb-4">
									Cek keaslian sertifikat dengan menggunakan nomor registrasi
									pelatihan yang tertera di sertifikat atau dengan kode QR.
									Nomor registrasi dan kode QR dapat dilihat pada bagian yang
									ditandai merah.{" "}
								</p>
								<div>
									<Image
										width={842}
										height={595}
										src={`/assets/media/cek-sertifikat-image/Contoh Sertifikat Peserta.jpeg`}
										alt={"Contoh Sertifikat"}
									/>
								</div>
							</Col>
							<Col lg={5} className=" p-10">
								<Form.Group className="mb-3 fz-12" controlId="formBasicEmail">
									<Form.Label>Nomor Registrasi</Form.Label>
									<Form.Control
										type="text"
										placeholder="Masukan nomor registrasi pelatihan"
										onChange={(e) => {
											setNomorRegistrasi(e.target.value);
										}}
									/>
								</Form.Group>
								<div className="w-100 d-flex justify-content-end">
									<Button
										type="submit"
										className="btn btn-primary rounded-full"
										onClick={() => {
											handleSubmitButton(nomorRegistrasi);
										}}
									>
										Cek Sertifikat
									</Button>
								</div>
								{data?.name ? (
									<Card className="p-8 rounded-xl mt-8">
										<div className="bg-success d-flex align-items-center p-8 rounded-xl">
											<Image
												src={`/assets/icon/icon-status-pelatihan/Shield-check.svg`}
												width={24}
												height={24}
												alt="Checked Icon"
												objectFit="cover"
											/>
											<div className="text-white fz-16 ml-5">
												Sertifikat terdaftar
											</div>
										</div>

										<div className="mt-8 fz-16">
											<p className="fz-16 mb-8">
												Sertifikat terdaftar di pelatihan Digital Talent
												Scholarship dengan data berikut:
											</p>
											<div className="row mb-3">
												<div className="col-4">Nama</div>
												<div className="col-1 d-flex justify-content-end">
													:
												</div>
												<div className="col-7 p-0">{data?.name}</div>
											</div>{" "}
											<div className="row mb-3">
												<div className="col-4">Akademi</div>
												<div className="col-1 d-flex justify-content-end">
													:
												</div>
												<div className="col-7 p-0">{data?.akademi}</div>
											</div>
											<div className="row mb-3">
												<div className="col-4">Pelatihan</div>
												<div className="col-1 d-flex justify-content-end">
													:
												</div>
												<div className="col-7 p-0">{data?.pelatihan}</div>
											</div>
											<div className="row mb-3">
												<div className="col-4">Tanggal Pelaksanaan</div>
												<div className="col-1 d-flex justify-content-end">
													:
												</div>
												<div className="col-7 p-0">
													{moment(data?.pelatihan_mulai)
														.utc()
														.format("DD MMMM YYYY")}{" "}
													-{" "}
													{moment(data?.pelatihan_selesai)
														.utc()
														.format("DD MMMM YYYY")}
												</div>
											</div>
										</div>
									</Card>
								) : error ? (
									<Card className="p-8 rounded-xl mt-8">
										<div className="bg-danger d-flex align-items-center p-8 rounded-xl">
											<Image
												src={`/assets/icon/icon-status-pelatihan/Shield-disabled.svg`}
												width={24}
												height={24}
												alt="Not Available Icon"
												objectFit="cover"
											/>
											<div className="text-white fz-16 ml-5">
												Sertifikat tidak terdaftar
											</div>
										</div>
										<div className="d-flex justify-content-center">
											<Image
												src={"/assets/media/gambar-belum-tersedia-page.svg"}
												width={525}
												height={350}
												alt="Gambar Tidak ditemukan"
												objectFit="contain"
											/>
										</div>
										<div className="fz-16">
											Sertifikat tidak terdaftar pada pelatihan Digital Talent
											Scholarship. Cek kembali nomor registrasi yang anda tulis
										</div>
									</Card>
								) : (
									""
								)}
							</Col>
						</Row>
					</Card>
				</div>
			</HomeWrapper>
		</>
	);
}
