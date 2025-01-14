import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { PDFReader } from "react-read-pdf";

const ProfileUser = ({ profile }) => {
  const [show, setShow] = useState(false);
  const [showIjasah, setShowIjasah] = useState(false);
  const [fileKtp, setFileKtp] = useState("");
  const [fileIjazah, setFileIjazah] = useState("");
  useEffect(() => {
    if (profile.length != 0) {
      setFileKtp(profile.File_ktp);
      setFileIjazah(profile.ijasah);
    }
  }, [profile]);

  return (
    <>
      <div className="card card-custom card-stretch gutter-b">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <div className="">
                <figure
                  className="avatar item-rtl"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <Image
                    src={
                      (profile.foto &&
                        process.env.END_POINT_API_IMAGE_PELATIHAN +
                          profile.foto) ||
                      "/assets/media/default.jpg"
                    }
                    alt="image"
                    width={256}
                    height={256}
                    objectFit="cover"
                  />
                </figure>
              </div>
            </div>
            <div className="col-md-9">
              <div className="data-pribadi">
                <div className="title d-flex align-items-center mb-3">
                  <h3 className="font-weight-bolder mr-5">Data Pribadi</h3>
                  {profile.status_verified && (
                    <button
                      className="btn btn-light-success fw-600 rounded-xl"
                      style={{
                        backgroundColor: "#E6FFF7",
                        color: "#00B27A",
                      }}
                    >
                      <i
                        className="ri-check-double-fill"
                        style={{
                          color: "#00B27A",
                        }}
                      ></i>{" "}
                      Verified
                    </button>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Nama Lengkap</p>
                    <p className="text-dark">{profile.name}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Email</p>
                    <p className="text-dark">{profile.email}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">
                      Nomor Identitas (KTP)
                    </p>
                    <p className="text-dark">{profile.nik}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Jenis Kelamin</p>
                    <p className="text-dark">{profile.jenis_kelamin}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">No Handphone</p>
                    <p className="text-dark">{profile.nomor_handphone}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Pendidikan</p>
                    <p className="text-dark">{profile.jenjang}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">
                      Nama Kontak Darurat
                    </p>
                    <p className="text-dark">{profile.Nama_kontak_darurat}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">
                      Nomor Kontak Darurat
                    </p>
                    <p className="text-dark">
                      {profile.nomor_handphone_darurat}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Tempat Lahir</p>
                    <p className="text-dark">{profile.tempat_lahir}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Tanggal Lahir</p>
                    <p className="text-dark">
                      {moment(profile.tanggal_lahir).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="data-alamat">
                <h3 className="font-weight-bolder mb-4">Alamat</h3>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p className="text-neutral-body my-0">
                      Alamat (Sesuai KTP)
                    </p>
                    <p className="text-dark">{profile.address_ktp || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Provinsi</p>
                    <p className="text-dark">{profile.provinsi_ktp || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kota</p>
                    <p className="text-dark">{profile.kota_ktp || "-"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kecamatan</p>
                    <p className="text-dark">{profile.kecamatan_ktp || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kode Pos</p>
                    <p className="text-dark">{profile.kode_pos_ktp || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p className="text-neutral-body my-0">
                      Alamat Domisili (Sesuai KTP)
                    </p>
                    <p className="text-dark">{profile.address || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Provinsi</p>
                    <p className="text-dark">{profile.provinsi || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kota</p>
                    <p className="text-dark">{profile.kota || "-"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kecamatan</p>
                    <p className="text-dark">{profile.kecamatan || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kode Pos</p>
                    <p className="text-dark">{profile.kode_pos || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="data-pendidikan">
                <h3 className="font-weight-bolder mb-4">Pendidikan Terakhir</h3>
                <div className="row">
                  <div className="col-md-12">
                    <p className="text-neutral-body my-0">Jenjang Pendidikan</p>

                    <p className="text-dark">{profile.jenjang || "-"}</p>
                  </div>
                  {profile.jenjang === "TK" ||
                  profile.jenjang === "SD/Sederajat" ||
                  profile.jenjang === "SMP/Sederajat" ||
                  profile.jenjang === "SMA/Sederajat" ? (
                    <>
                      <div className="col-md-6">
                        <p className="text-neutral-body my-0">
                          Asal Sekolah/Perguruan Tinggi
                        </p>

                        {profile.jenjang === "SMA/Sederajat" ? (
                          <p className="text-dark">
                            {profile.asal_pendidikan || "-"}
                          </p>
                        ) : (
                          <p className="text-dark">{profile.lainya || "-"}</p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <p className="text-neutral-body my-0">Tahun Masuk</p>

                        <p className="text-dark">
                          {profile.tahun_masuk || "-"}
                        </p>
                      </div>
                    </>
                  ) : (
                    profile.jenjang !== "Tidak Sekolah" && (
                      <>
                        <div className="col-md-6">
                          <p className="text-neutral-body my-0">
                            Asal Sekolah/Perguruan Tinggi
                          </p>

                          <p className="text-dark">
                            {profile.asal_pendidikan || "-"}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="text-neutral-body my-0">
                            Program Studi
                          </p>

                          <p className="text-dark">
                            {profile.program_studi || "-"}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="text-neutral-body my-0">IPK</p>

                          <p className="text-dark">{profile.ipk || "-"}</p>
                        </div>
                        <div className="col-md-6">
                          <p className="text-neutral-body my-0">Tahun Masuk</p>

                          <p className="text-dark">
                            {profile.tahun_masuk || "-"}
                          </p>
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
              <div className="data-pekerjaan">
                <h3 className="font-weight-bolder mb-4">Pekerjaan</h3>
                <div className="row">
                  <div className="col-md-12">
                    <p className="text-neutral-body my-0">Status Pekerjaan</p>

                    <p className="text-dark">
                      {profile.status_pekerjaan || "-"}
                    </p>
                  </div>
                </div>
                {profile.status_pekerjaan === "Pelajar/Mahasiswa" && (
                  <div className="row">
                    <div className="col-md-6">
                      <p className="text-neutral-body my-0">
                        Sekolah/Perguruan Tinggi
                      </p>
                      <p className="text-dark">{profile.sekolah || "-"}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-neutral-body my-0">Tahun Masuk</p>
                      <p className="text-dark">{profile.tahun_masuk || "-"}</p>
                    </div>
                  </div>
                )}
                {profile.status_pekerjaan === "Bekerja" && (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="text-neutral-body my-0">Pekerjaan</p>
                        <p className="text-dark">{profile.pekerjaan || "-"}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="text-neutral-body my-0">
                          Perusahaan / Institusi Tempat Bekerja
                        </p>
                        <p className="text-dark">{profile.perusahaan || "-"}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="text-neutral-body my-0">Penghasilan</p>
                        <p className="text-dark">
                          {profile.penghasilan || "-"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="data-berkas">
                <h3 className="font-weight-bolder mb-4">Berkas</h3>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Scan KTP</p>
                    {fileKtp.includes("pdf") ? (
                      <div
                        className="overflow-auto mx-auto px-auto"
                        style={{
                          height: 250,
                        }}
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        <PDFReader
                          url={`${process.env.END_POINT_API_IMAGE_PELATIHAN}${fileKtp}`}
                          scale={1}
                        />
                      </div>
                    ) : (
                      <Image
                        objectFit="cover"
                        alt="file-ktp"
                        width={320}
                        height={200}
                        src={
                          (profile.File_ktp &&
                            process.env.END_POINT_API_IMAGE_PELATIHAN +
                              profile.File_ktp) ||
                          "/assets/media/default.jpg"
                        }
                        onClick={() => setShow(true)}
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Ijasah</p>
                    {fileIjazah.includes("pdf") ? (
                      <div
                        className="overflow-auto mx-auto px-auto"
                        style={{
                          height: 250,
                        }}
                        onClick={() => {
                          setShowIjasah(true);
                        }}
                      >
                        <PDFReader
                          url={`${process.env.END_POINT_API_IMAGE_PELATIHAN}${fileIjazah}`}
                          scale={1}
                        />
                      </div>
                    ) : (
                      <Image
                        objectFit="cover"
                        alt="file-ijasah"
                        width={320}
                        height={200}
                        src={
                          (profile.ijasah &&
                            process.env.END_POINT_API_IMAGE_PELATIHAN +
                              profile.ijasah) ||
                          "/assets/media/default.jpg"
                        }
                        onClick={() => setShowIjasah(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {profile?.File_ktp}
            <button
              type="button"
              className="close"
              onClick={() => setShow(false)}
            >
              <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fileKtp.includes("pdf") ? (
            <div
              className="overflow-auto mx-auto px-auto"
              style={{
                height: 250,
              }}
            >
              <PDFReader
                url={`${process.env.END_POINT_API_IMAGE_PELATIHAN}${fileKtp}`}
                scale={1}
              />
            </div>
          ) : (
            <img
              src={
                (profile.File_ktp &&
                  process.env.END_POINT_API_IMAGE_PELATIHAN +
                    profile.File_ktp) ||
                "/assets/media/default.jpg"
              }
              width={400}
              alt="ktp-modal"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Kembali</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showIjasah}
        onHide={() => setShowIjasah(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {profile?.ijasah}
            <button
              type="button"
              className="close"
              onClick={() => setShowIjasah(false)}
            >
              <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fileIjazah.includes("pdf") ? (
            <div
              className="overflow-auto mx-auto px-auto"
              style={{
                height: 250,
              }}
            >
              <PDFReader
                url={`${process.env.END_POINT_API_IMAGE_PELATIHAN}${fileIjazah}`}
                scale={1}
              />
            </div>
          ) : (
            <img
              src={
                (profile.ijasah &&
                  process.env.END_POINT_API_IMAGE_PELATIHAN + profile.ijasah) ||
                "/assets/media/default.jpg"
              }
              width={400}
              alt="ktp-modal"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowIjasah(false)}>Kembali</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileUser;
