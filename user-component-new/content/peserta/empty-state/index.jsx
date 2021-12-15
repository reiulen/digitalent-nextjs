import React, { useState, useEffect } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

export default function SeleksiAdministrasi() {
	const router = useRouter();

	const [judul, setJudul] = useState("Halaman Belum Tersedia");
	const [image, setImage] = useState(
		"/assets/media/gambar-belum-tersedia-page.svg"
	);
	const [deskripsi, setDeskripsi] = useState();

	useEffect(() => {
		if (router.pathname.includes("administrasi")) {
			setImage("/assets/media/riwayat-pelatihan/fail.svg");
			setDeskripsi(
				"Silahkan lakukan pendaftaran pelatihan atau cek status pelatihan"
			);
			return setJudul("Anda Tidak Memiliki Pelatihan di Tahap Administrasi");
		}
		if (router.pathname.includes("substansi")) {
			setImage("/assets/media/riwayat-pelatihan/fail.svg");
			setDeskripsi(
				"Silahkan lakukan pendaftaran pelatihan atau cek status pelatihan"
			);
			return setJudul("Anda Tidak Memiliki Pelatihan di Tahap Tes Substansi");
		}
		if (router.pathname.includes("survey")) {
			setDeskripsi("Survey belum tersedia, silahkan cek secara berkala");
			return setJudul("Anda Tidak Memiliki Survey");
		}
		if (router.pathname.includes("trivia")) {
			setDeskripsi("Survey belum tersedia, silahkan cek secara berkala");
			return setJudul("Anda Tidak Memiliki Trivia");
		}
	}, []);

	return (
		<PesertaWrapper>
			<Col lg={12} className="px-0">
				<Card className="card-custom card-stretch gutter-b p-0">
					<div className="d-flex justify-content-center pt-10">
						<Image
							src={image}
							width={525}
							height={350}
							alt="Gambar Tidak ditemukan"
							objectFit="contain"
						/>
					</div>
					<p
						className="d-flex justify-content-center text-center font-weight-bolder mt-15"
						style={{ fontSize: "24px" }}
					>
						{judul}
					</p>
					<p
						className="d-flex justify-content-center text-center fz-16"
						style={{ color: "#6c6c6c" }}
					>
						{deskripsi}
					</p>
					<div className="d-flex align-items-center justify-content-center">
						<Button
							className="btn-rounded-full font-weight-bold  d-flex justify-content-center my-10"
							style={{
								height: "40px",
								fontFamily: "poppins",
								fontSize: "14px",
							}}
							onClick={() => {
								router.push("/peserta/riwayat-pelatihan");
							}}
						>
							Cek Status Pelatihan
						</Button>
					</div>
				</Card>
			</Col>
		</PesertaWrapper>
	);
}
