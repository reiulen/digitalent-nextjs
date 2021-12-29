import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/client";
import axios from "axios";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import IconUser from "../../../assets/icon/User";
import IconDoc from "../../../assets/icon/Doc";
import ImageHero from "../../../../public/assets/media/logos/hero1.png";
import ImagePlants from "../../../../public//assets/media/logos/Plants1.png";
import CardDashboardSM from "../../../CardDashboardSM";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";

import styles from "../../../../styles/sitemanagement/dashboard.module.css";

import {
	loadDataPeserta,
	loadDataZonasi,
	loadDataZonasiNext,
	loadDataListZonasi
} from "../../../../redux/actions/site-management/dashboard.actions";
import  Cookies  from "js-cookie";

const DashboardSiteManagement = ({ token, user }) => {
	const [participant, setParticipant] = useState(0);
	const [administrator, setAdministrator] = useState(0);
	const [mitra, setMitra] = useState(0);
	const [pageZonasi, setPageZonasi] = useState(1);
	const [pagePeserta, setPagePeserta] = useState(1);
	const [type, setType] = useState("province");
	const [typePeserta, setTypePeserta] = useState("province");
	const [dataZonasi, setDataZonasi] = useState(null)
	const [totalZonasi, setTotalZonasi] = useState(null)

	let dispatch = useDispatch()


  useEffect(() => {
    axios
      .get(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/dashboard/card`, {
        headers: {
          authorization: `Bearer ${token}`,
          "Permission": Cookies.get("token_permission")
        },
      })
      .then((items) => {
        setParticipant(items.data.data.participant);
        setAdministrator(items.data.data.administrator);
        setMitra(items.data.data.mitra);
      });

    dispatch(loadDataZonasi(token, type, pageZonasi, Cookies.get("token_permission")));
    dispatch(loadDataPeserta(token, typePeserta, pagePeserta, Cookies.get("token_permission")));
  }, [dispatch, token, type, pageZonasi, typePeserta, pagePeserta]);




	const { allDataZonasi, allDataPeserta, allDataListZonasi } = useSelector(
		(state) => ({
			allDataZonasi: state.allDataZonasi,
			allDataPeserta: state.allDataPeserta,
			allDataListZonasi: state.allDataListZonasi
		}),
		shallowEqual
	);

	const allListPeserta = useSelector((state) => state.allListPeserta);

	const tableZonasi = allDataListZonasi?.map((item, index) => {
		return (
			<tr key={index}>
				<div className="row justify-content-between align-items-center ml-0 mr-10">
					<div className="d-flex align-items-center">
						<td className="data-daerah py-4">
							<span className="nomor">{item.nomor}</span>
						</td>
						<td className="data-daerah-provinsi">{item.zonasi}</td>
					</div>
					<td className="total-peserta text-right">{item?.value} Peserta</td>
				</div>
			</tr>
		);
	});

	const tablePeserta = allDataPeserta.filter(item => {
		return item.provinsi !== ""
	}).map((item, index) => {
		return (
			<tr className="" key={index}>
				<div className="row justify-content-between align-items-center ml-0 mr-10">
					<div className=" d-flex align-items-center">
						<td className="data-daerah py-4">
							<span className="nomor">{item.nomor}</span>
						</td>
						<td className="data-daerah-provinsi">{item.provinsi}</td>
					</div>
					<td className="total-peserta text-right">{item.total} User</td>
				</div>
			</tr>
		);
	});

	const emptyData = (
		<td className="align-middle text-center" colSpan={8}>
			Data Kosong
		</td>
	);

	return (
		<>
			<PageWrapper>
				<div className="row">
					<div className="col-lg-12 col-md-12">
						<div className="row ml-1 mr-0">
							{/* card 1 */}
							<CardDashboardSM
								background="bg-light-success "
								icon="User.svg"
								color="#ffffff"
								titleValue={allListPeserta?.data?.data?.total}
								title="Total User DTS"
								publishedVal="1"
							/>

							{/* card 2 */}
							<CardDashboardSM
								background="bg-light-warning"
								icon="Address-card.svg"
								color="#ffffff"
								titleValue={administrator}
								title="Total Administrator"
								publishedVal="1"
							/>
							<CardDashboardSM
								background="bg-light-info"
								icon="Book-open.svg"
								color="#ffffff"
								titleValue={mitra}
								title="Total Mitra"
								publishedVal="1"
							/>
							{/* card 3 */}
						</div>
					</div>
				</div>
				<div className="row mx-0">
					<div
						className={`${styles.cardName} col-lg-6 overflow-hidden d-flex justify-content-between position-relative`}
					>
						<div
							className={`${styles.nameUser} bg-white px-2 mt-2 br-12 py-10 px-6 w-100 overflow-hidden`}
						>
							<div className={`${styles.textName}`}>
								<h5 className="text-blue-primary fw-600 fz-24">
									Hallo {user.name} !
								</h5>
								<p className="fw-600 welcome">
									Selamat Datang di Dashboard <br /> Site Management
								</p>
							</div>
						</div>
						<div className={`${styles.imageAdmin} d-flex mr-auto`}>
							<Image src={ImageHero} alt="imagehero" />
						</div>
					</div>
					<div className="col-lg-3 mt-2 hover-subm">
						<CardDashboardSiteManagement
							background="bg-white"
							icon="/assets/icon/Account.svg"
							hover="/assets/icon/HoverSUBM.svg"
							color="text-black"
							title="SUBM"
							link="/site-management/setting/pelatihan?sidebar=SUBM"
							backgroundImage=""
						></CardDashboardSiteManagement>
					</div>
					<div className="col-lg-3 mt-2">
						<CardDashboardSiteManagement
							background="bg-white"
							hover="/assets/icon/HoverZonasi.svg"
							icon="/assets/icon/Map.svg"
							color="text-black"
							title="Zonasi"
							link="/site-management/master-data/master-zonasi"
							backgroundImage=""
						></CardDashboardSiteManagement>
					</div>
				</div>
				<div className="mt-8">
					<div className="row mx-0">
						<div className="col-lg-6 mt-2">
							<div className="content-data bg-white">
								<div className="row">
									<div className="col-lg-12 ml-5 my-4">
										<div className="data-peserta">Data User</div>
										<div className="berdasarkan">
											Berdasarkan{" "}
											{typePeserta === "city" ? "Daerah" : "Provinsi"}
										</div>
									</div>
									<div className="col-lg-12 row justify-content-evenly mb-4">
										<div
											className={
												typePeserta === "city"
													? "btn text-white type-styling data-head-2 mx-9"
													: "text-gray pt-3 mx-9"
											}
										>
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													setTypePeserta("city");
													setPagePeserta(1);
												}}
											>
												Kota / Kabupaten
											</a>
										</div>
										<div
											className={
												typePeserta === "province"
													? "btn text-white type-styling provinsi-styling-2"
													: "text-gray pt-3 provinsi-styling"
											}
										>
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													setTypePeserta("province");
													setPagePeserta(1);
												}}
											>
												Provinsi
											</a>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column">
									{tablePeserta.length > 0 ? tablePeserta : emptyData}
								</div>

								<div className="d-flex ml-6 justify-content-between align-items-center pagination-button">
									<p className="pt-5">
										Total:{" "}
										{/* {allDataPeserta &&
											allDataPeserta.length > 0 &&
											allDataPeserta[0].totalPeserta}{" "} */}
										{allDataPeserta[0]?.totalPeserta ? allDataPeserta[0].totalPeserta : 0 } User
									</p>
									<div className="ml-auto mx-7 my-4">
										<button
											className={
												pagePeserta === 1
													? "btn text-white mx-4 disabled"
													: "btn text-white mx-4"
											}
											onClick={(e) => {
												e.preventDefault();
												if (pagePeserta === 1) {
													setPagePeserta(pagePeserta);
												} else {
													setPagePeserta(pagePeserta - 1);
												}
											}}
											style={{
												backgroundColor: "#203E80",
												cursor: pagePeserta === 1 ? "not-allowed" : "",
											}}
										>
											&lt;
										</button>
										<button
											type="button"
											className={
												pagePeserta >=
													Math.ceil(
														allDataPeserta &&
														allDataPeserta.length > 0 &&
														allDataPeserta[0].totalPage / 5
													)
													? "btn text-white disabled"
													: "btn text-white"
											}
											onClick={(e) => {
												e.preventDefault();
												if (
													pagePeserta >=
													Math.ceil(
														allDataPeserta &&
														allDataPeserta.length > 0 &&
														allDataPeserta[0].totalPage / 5
													)
												) {
													setPagePeserta(pagePeserta);
												} else {
													setPagePeserta(pagePeserta + 1);
												}
											}}
											style={{
												backgroundColor: "#203E80",
												cursor:
													pagePeserta >=
														Math.ceil(
															allDataPeserta &&
															allDataPeserta.length > 0 &&
															allDataPeserta[0].totalPage / 5
														)
														? "not-allowed"
														: "",
											}}
										>
											&gt;
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6 mt-2">
							<div className="content-data bg-white">
								<div className="row">
									<div className="col-lg-12 ml-5 my-4">
										<div className="data-peserta">Data Zonasi</div>
										<div className="berdasarkan">
											Data user berdasarkan zonasi
											{/* Berdasarkan {type === "city" ? "Daerah" : "Provinsi"} */}
										</div>
									</div>
									<div className="col-lg-12 mb-4 ml-5">
										<button
											className="btn text-white type-styling provinsi-styling-2 cursor-not-allowed"
										// "text-gray pt-3 provinsi-styling"
										// style={{ border: '1px solid #000', textAlign: 'right' }}
										>
											Zonasi
										</button>
									</div>
								</div>

								<div className="d-flex flex-column">
									{tableZonasi !== null ? tableZonasi : emptyData}
								</div>

								<div className="d-flex ml-6 justify-content-between align-items-center pagination-button">
									<p className="pt-5">
										Total: {totalZonasi} Zonasi
									</p>
									<div className="ml-auto mx-7 my-4">
										<button
											className={
												pageZonasi === 1
													? "btn text-white mx-4 disabled"
													: "btn text-white mx-4"
											}
											onClick={(e) => {
												e.preventDefault();
												if (pageZonasi === 1) {
													setPageZonasi(pageZonasi);
													dispatch(loadDataListZonasi(token, pageZonasi))
												} else {
													setPageZonasi(pageZonasi - 1);
													dispatch(loadDataListZonasi(token, pageZonasi - 1))
												}
											}}
											style={{
												backgroundColor: "#203E80",
												cursor: pageZonasi === 1 ? "not-allowed" : "",
											}}
										>
											&lt;
										</button>
										<button
											type="button"
											className={
												pageZonasi >= Math.ceil(totalZonasi / 5)
													? "btn text-white disabled"
													: "btn text-white"
											}
											onClick={(e) => {
												e.preventDefault();
												if (
													pageZonasi >=
													Math.ceil(totalZonasi / 5)
												) {
													setPageZonasi(pageZonasi);
													dispatch(loadDataListZonasi(token, pageZonasi))
												} else {
													setPageZonasi(pageZonasi + 1);
													dispatch(loadDataListZonasi(token, pageZonasi + 1))
												}
											}}
											style={{
												backgroundColor: "#203E80",
												cursor:
													pageZonasi >=
														Math.ceil(totalZonasi / 5)
														? "not-allowed"
														: "",
											}}
										>
											&gt;
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

export default DashboardSiteManagement;
