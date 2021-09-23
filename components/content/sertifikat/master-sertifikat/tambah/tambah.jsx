// #Next & React
import React, { useState, useEffect, useRef, createRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../../wrapper/page.wrapper";
import Image from "next/image";
// #Icon

export default function TambahMasterSertifikat() {
    const router = useRouter();
    const [signature, setSignature] = useState(1);

    // #START FORM DATA
    const [namaPelatihan, setNamaPelatihan] = useState("");
    const [namaPeserta, setNamaPeserta] = useState("");
    const [nomorSertifikat, setNomorSertifikat] = useState("");
    const [lembarValue, setLembarValue] = useState(1);
    const [jumlahTandaTangan, setJumlahTandaTangan] = useState(1);
    const [tandaTanganSlider, setTandaTanganSlider] = useState([0, 0, 0, 0]);
    // #END FORM DATA

    // #START SECTION 2
    const [jumlahTandaTangan2, setJumlahTandaTangan2] = useState(1);
    const [tandaTanganSlider2, setTandaTanganSlider2] = useState([0, 0, 0, 0]);

    // #END SECTION 2

    useEffect(() => {
        // console.log(Array(jumlahTandaTangan));
        // console.log(typeof jumlahTandaTangan, jumlahTandaTangan);
        if (jumlahTandaTangan == 4) {
            setTandaTanganSlider([0, 0, 0, 0]);
        }
    }, [jumlahTandaTangan]);

    const [limit, setLimit] = useState(null);

    const loading = false;
    let { page = 1, keyword, success } = router.query;

    return (
        <PageWrapper>
            {/* error START */}
            {/* error END */}
            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    {/* START HEADER */}
                    <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10 ">
                        <div className="card-title d-flex">
                            <div className="text-dark">Nama Sertifikat :</div>
                            <div className="mx-6">
                                <input
                                    type="text"
                                    className="form-control w-400px"
                                    placeholder="Masukan Nama Sertifikat"
                                    // onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <Link href="/sertifikat/master-sertifikat/tambah">
                                <a
                                    className="text-primary px-6 font-weight-bolder px-5 py-3 mx-5"
                                    onClick={() => {
                                        console.log("klik batal");
                                    }}
                                >
                                    Batal
                                </a>
                            </Link>
                            <Link href="/sertifikat/master-sertifikat/tambah">
                                <a
                                    className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                                    onClick={() => {
                                        console.log("klik simpan");
                                    }}
                                >
                                    Simpan
                                </a>
                            </Link>
                        </div>
                    </div>
                    {/* END HEADER */}
                    {/* START BODY */}
                    <div className="card-body border-top">
                        <div className="row">
                            {/* START COL */}
                            <div className="border-primary border col-8 p-0 h-500px">
                                <div className="p-0">
                                    {/* <Image
                                        src="https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/certificate-images/2d08970e-7c1a-483a-ae55-ce19e6b8d36f.jpg"
                                        alt="fitur"
                                        // height={495}
                                        // width={700}
                                        layout="fill"
                                        objectFit="fill"
                                    /> */}
                                    <div className="row align-items-center ">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="m-6 text-center"
                                                placeholder="Nomor Sertifikat"
                                                style={{
                                                    borderStyle: "dashed",
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="col-12 text-center font-weight-normal"
                                            style={{ marginTop: "-20px" }}
                                        >
                                            <label className="font-weight-boldest display-4">
                                                SERTIFIKAT
                                            </label>
                                            <div>Diberikan kepada</div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="px-5 text-center font-size-h6 font-weight-normal"
                                                    placeholder="Nama Peserta"
                                                    style={{
                                                        borderStyle: "dashed",
                                                    }}
                                                />
                                            </div>
                                            <div>Atas Partisipasi sebagai</div>
                                            <div className="font-weight-normal font-size-h2">
                                                Peserta
                                            </div>
                                            <div>Nama Pelatihan</div>
                                            <input
                                                type="text"
                                                className="px-5 text-center font-size-h6 font-weight-bold border-2"
                                                placeholder="Nama Pelatihan"
                                                style={{
                                                    borderStyle: "dashed",
                                                }}
                                                onChange={e => {
                                                    console.log(e.target.value);
                                                }}
                                            />
                                            <div className="mt-2 w-100">
                                                <span>Program</span>
                                                <input
                                                    type="text"
                                                    className="mx-2 text-center border-2 font-weight-normal"
                                                    placeholder="Akademi"
                                                    style={{
                                                        borderStyle: "dashed",
                                                    }}
                                                    onChange={e => {
                                                        console.log(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <span>Selama</span>
                                                <input
                                                    type="text"
                                                    className="mx-2 text-center border-2 font-weight-normal"
                                                    placeholder="Waktu Pelatihan"
                                                    style={{
                                                        borderStyle: "dashed",
                                                    }}
                                                    onChange={e => {
                                                        console.log(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <span>
                                                    Digital Talent Scholarship
                                                </span>
                                                <input
                                                    size="4"
                                                    maxLength="4"
                                                    type="text"
                                                    className="mx-2 text-center font-weight-normal"
                                                    placeholder="Tahun"
                                                    style={{
                                                        borderStyle: "dashed",
                                                        width: "auto",
                                                    }}
                                                    onChange={e => {
                                                        console.log(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                className="mx-2 text-center font-weight-normal my-3"
                                                placeholder="Jakarta, DD/MM/YYYY"
                                                style={{
                                                    borderStyle: "dashed",
                                                    width: "auto",
                                                }}
                                                onChange={e => {
                                                    console.log(e.target.value);
                                                }}
                                            />
                                            <div className="row justify-content-center h-100px align-items-center">
                                                {/* START MAP TTD */}
                                                {[
                                                    ...Array(jumlahTandaTangan),
                                                ].map((el, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                transform: `translateX(${tandaTanganSlider[i]}px)`,
                                                                borderStyle:
                                                                    "dashed",
                                                            }}
                                                            className="col-3 border-2 p-0"
                                                        >
                                                            <div className="d-flex align-items-center justify-content-center p-0">
                                                                <p className="py-5">
                                                                    TTD
                                                                </p>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="text-center w-100 border-1 p-0"
                                                                placeholder="Nama"
                                                                style={{
                                                                    borderStyle:
                                                                        "dashed",
                                                                }}
                                                                onChange={e => {
                                                                    console.log(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                            <input
                                                                type="text"
                                                                className="text-center col-12 border-1 border-top-0  p-0 "
                                                                placeholder="Jabatan"
                                                                style={{
                                                                    borderStyle:
                                                                        "dashed",
                                                                }}
                                                                onChange={e => {
                                                                    console.log(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* END COL */}
                            {/* START FORM Jenis Sertifikat */}
                            <div className="col-4 font-weight-normal overflow-auto">
                                <div className="form-group">
                                    <label
                                        htmlFor="Jenis Sertifikat"
                                        className="font-weight-bold font-size-h5"
                                    >
                                        Jenis Sertifikat
                                    </label>
                                    <div className="d-flex justify-content-start">
                                        <div className="col-6 form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="method"
                                                value="1"
                                                checked={lembarValue === 1}
                                                onClick={() =>
                                                    setLembarValue(1)
                                                }
                                            />
                                            <label className="form-check-label">
                                                1 Lembar
                                            </label>
                                        </div>
                                        <div className="col-6 form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="method"
                                                value="2"
                                                checked={lembarValue === 2}
                                                onClick={() =>
                                                    setLembarValue(2)
                                                }
                                            />
                                            <label className="form-check-label">
                                                2 Lembar
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* END FORM Jenis Sertifikat */}
                                {/* START FORM Tanda tangan */}
                                <div className="form-group mb-2">
                                    <label className=" col-form-label font-weight-bold">
                                        Layout Tanda Tangan
                                    </label>
                                    <div>
                                        <select
                                            name="jumlah_tandatangan"
                                            onChange={e =>
                                                setJumlahTandaTangan(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="form-control"
                                        >
                                            <option selected value={1}>
                                                1 Tanda Tangan
                                            </option>
                                            <option value={2}>
                                                2 Tanda Tangan
                                            </option>
                                            <option value={3}>
                                                3 Tanda Tangan
                                            </option>
                                            <option value={4}>
                                                4 Tanda Tangan
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {/* END FORM Tanda Tangan */}
                                {/* START TANDA TANGAN SLIDER */}
                                <div className="justify-content-center h-100px align-items-center">
                                    {/* START MAP TTD */}

                                    {[...Array(jumlahTandaTangan)].map(
                                        (el, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="d-flex justify-content-start"
                                                >
                                                    <div className="col-12">
                                                        <div className="py-5">
                                                            {`Atur Tanda tangan - ${
                                                                i + 1
                                                            }`}
                                                        </div>
                                                        <div className="card-toolbar">
                                                            <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                                                                <i className="ri-pencil-fill text-white"></i>
                                                                Atur Tanda
                                                                Tangan
                                                            </a>
                                                        </div>
                                                        {jumlahTandaTangan !==
                                                        4 ? (
                                                            <div className="row align-items-center py-5 justify-content-center">
                                                                <div className="col-12">
                                                                    Atur Posisi
                                                                </div>
                                                                <div className="col-12 d-flex py-5 ">
                                                                    <input
                                                                        type="number"
                                                                        max={
                                                                            300
                                                                        }
                                                                        min={
                                                                            -300
                                                                        }
                                                                        className="form-control w-25"
                                                                        placeholder={
                                                                            tandaTanganSlider[
                                                                                i
                                                                            ]
                                                                        }
                                                                        value={
                                                                            tandaTanganSlider[
                                                                                i
                                                                            ]
                                                                        }
                                                                        onChange={e => {
                                                                            setTandaTanganSlider(
                                                                                prev => {
                                                                                    return [
                                                                                        ...prev,
                                                                                        (tandaTanganSlider[
                                                                                            i
                                                                                        ] =
                                                                                            e.target.value),
                                                                                    ];
                                                                                }
                                                                            );
                                                                        }}
                                                                    />

                                                                    <input
                                                                        type="range"
                                                                        min={
                                                                            -300
                                                                        }
                                                                        max={
                                                                            300
                                                                        }
                                                                        step="5"
                                                                        value={
                                                                            tandaTanganSlider[
                                                                                i
                                                                            ]
                                                                        }
                                                                        className="text-white form-range form-control mx-5"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            width: "100%",
                                                                        }}
                                                                        onChange={e => {
                                                                            setTandaTanganSlider(
                                                                                prev => {
                                                                                    return [
                                                                                        ...prev,
                                                                                        (tandaTanganSlider[
                                                                                            i
                                                                                        ] =
                                                                                            e.target.value),
                                                                                    ];
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                        )}
                                                    </div>

                                                    {/* {tandaTanganSlider} */}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                                {/* END TANDA TANGAN SLIDER */}
                            </div>
                            <div className="row my-10 col-12">
                                <div className="card-toolbar col-3">
                                    <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                                        Unggah Background
                                    </a>
                                </div>
                                <div className="card-toolbar">
                                    <a className="btn bg-white text-blue-secondary border-secondary rounded-full font-weight-bolder px-10 py-4">
                                        Browse Template
                                    </a>
                                </div>
                            </div>
                            {/* START SECTION 2 */}
                            {lembarValue == 2 ? (
                                <div className="row col-12">
                                    {/* START COL */}
                                    <div className="border-primary border col-8 p-0 h-500px">
                                        <div className="p-0">
                                            {/* <Image
                                        src="https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/certificate-images/2d08970e-7c1a-483a-ae55-ce19e6b8d36f.jpg"
                                        alt="fitur"
                                        // height={495}
                                        // width={700}
                                        layout="fill"
                                        objectFit="fill"
                                    /> */}
                                        </div>
                                    </div>
                                    {/* END COL */}
                                    {/* START RIGHT SIDE*/}
                                    <div className="col-4 font-weight-normal overflow-auto">
                                        <div className="form-group">
                                            <label
                                                htmlFor="Jenis Sertifikat"
                                                className="font-weight-bold font-size-h5"
                                            >
                                                Silabus
                                            </label>
                                            <div className="card-toolbar my-2">
                                                <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                                                    <i className="ri-pencil-fill text-white"></i>
                                                    Atur Silabus
                                                </a>
                                            </div>
                                        </div>
                                        {/* END FORM Jenis Sertifikat */}
                                        {/* START FORM Tanda tangan */}
                                        <div className="form-group mb-2">
                                            <label className=" col-form-label font-weight-bold">
                                                Layout Tanda Tangan
                                            </label>
                                            <div>
                                                <select
                                                    name="jumlah_tandatangan"
                                                    onChange={e =>
                                                        setJumlahTandaTangan(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className="form-control"
                                                >
                                                    <option selected value={1}>
                                                        1 Tanda Tangan
                                                    </option>
                                                    <option value={2}>
                                                        2 Tanda Tangan
                                                    </option>
                                                    <option value={3}>
                                                        3 Tanda Tangan
                                                    </option>
                                                    <option value={4}>
                                                        4 Tanda Tangan
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* END FORM Tanda Tangan */}
                                        {/* START TANDA TANGAN SLIDER */}
                                        <div className="justify-content-center h-100px align-items-center">
                                            {/* START MAP TTD */}

                                            {[...Array(jumlahTandaTangan)].map(
                                                (el, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="d-flex justify-content-start"
                                                        >
                                                            <div className="col-12">
                                                                <div className="py-5">
                                                                    {`Atur Tanda tangan - ${
                                                                        i + 1
                                                                    }`}
                                                                </div>
                                                                <div className="card-toolbar">
                                                                    <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                                                                        <i className="ri-pencil-fill text-white"></i>
                                                                        Atur
                                                                        Tanda
                                                                        Tangan
                                                                    </a>
                                                                </div>
                                                                {jumlahTandaTangan !==
                                                                4 ? (
                                                                    <div className="row align-items-center py-5 justify-content-center">
                                                                        <div className="col-12">
                                                                            Atur
                                                                            Posisi
                                                                        </div>
                                                                        <div className="col-12 d-flex py-5 ">
                                                                            <input
                                                                                type="number"
                                                                                max={
                                                                                    300
                                                                                }
                                                                                min={
                                                                                    -300
                                                                                }
                                                                                className="form-control w-25"
                                                                                placeholder={
                                                                                    tandaTanganSlider[
                                                                                        i
                                                                                    ]
                                                                                }
                                                                                value={
                                                                                    tandaTanganSlider[
                                                                                        i
                                                                                    ]
                                                                                }
                                                                                onChange={e => {
                                                                                    setTandaTanganSlider(
                                                                                        prev => {
                                                                                            return [
                                                                                                ...prev,
                                                                                                (tandaTanganSlider[
                                                                                                    i
                                                                                                ] =
                                                                                                    e.target.value),
                                                                                            ];
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            />

                                                                            <input
                                                                                type="range"
                                                                                min={
                                                                                    -300
                                                                                }
                                                                                max={
                                                                                    300
                                                                                }
                                                                                step="5"
                                                                                value={
                                                                                    tandaTanganSlider[
                                                                                        i
                                                                                    ]
                                                                                }
                                                                                className="text-white form-range form-control mx-5"
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                    width: "100%",
                                                                                }}
                                                                                onChange={e => {
                                                                                    setTandaTanganSlider(
                                                                                        prev => {
                                                                                            return [
                                                                                                ...prev,
                                                                                                (tandaTanganSlider[
                                                                                                    i
                                                                                                ] =
                                                                                                    e.target.value),
                                                                                            ];
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                            </div>

                                                            {/* {tandaTanganSlider} */}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        {/* END TANDA TANGAN SLIDER */}
                                    </div>
                                    <div className="row my-10 col-12">
                                        <div className="card-toolbar col-3">
                                            <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                                                Unggah Background
                                            </a>
                                        </div>
                                        <div className="card-toolbar">
                                            <a className="btn bg-white text-blue-secondary border-secondary rounded-full font-weight-bolder px-10 py-4">
                                                Browse Template
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    {/* END BODY */}
                </div>
            </div>
        </PageWrapper>
    );
}
