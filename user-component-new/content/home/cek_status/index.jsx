import React from "react";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";

import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import HomeWrapper from "../../../components/wrapper/Home.wrapper";
import Image from "next/image";
export default function Kontak() {
	const router = useRouter();
	const data = false;
	return (
		<>
			<HomeWrapper>
				<BreadcrumbComponent
					data={[{ link: router.asPath, name: "Verifikasi Sertifikat" }]}
				/>
				<div className="mt-5">
					<h1 className="fw-700 fz-40">Verifikasi Sertifikat</h1>
					<p className="mr-6 fz-18 text-muted fw-400">
						Cek keaslian sertifikat pelatihan Digital Talent Scholarship
					</p>
				</div>
				<div className="my-10 w-100">
					<Card className="rounded-xl">
						<Row className="p-0 m-0">
							<Col lg={7} className="p-10">
								<p className="mb-0 fz-16">
									Cek keaslian sertifikat dengan menggunakan nomor registrasi
									pelatihan yang tertera di sertifikat atau dengan kode QR.
									Nomor registrasi dan kode QR dapat dilihat pada bagian yang
									ditandai merah.{" "}
								</p>
							</Col>
							<Col lg={5} className="align-self-center p-10">
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Nomor Registrasi</Form.Label>
									<Form.Control
										type="text"
										placeholder="Masukan nomor registrasi pelatihan"
									/>
								</Form.Group>
								<div className="w-100 d-flex justify-content-end">
									<Button
										type="submit"
										className="btn btn-primary rounded-full"
									>
										Cek Sertifikat
									</Button>
								</div>
								{data ? (
									<div></div>
								) : (
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
								)}
							</Col>
						</Row>
					</Card>
				</div>
			</HomeWrapper>
		</>
	);
}
