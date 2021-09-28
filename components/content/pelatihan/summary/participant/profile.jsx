import React from "react";
import Image from "next/image";

const ProfileUser = ({ profile }) => {
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
                    src={profile.image}
                    alt="image"
                    width={256}
                    height={256}
                    objectFit="cover"
                  />
                </figure>
              </div>
            </div>
            <div className="col-md-9">
              <h3 className="font-weight-bolder mb-4">Data Pribadi</h3>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">Nama Lengkap</p>
                  <p className="text-dark">{profile.namaLengkap}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">Email</p>
                  <p className="text-dark">{profile.namaLengkap}</p>
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
                  <p className="text-dark">{profile.jenisKelamin}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">No Handphone</p>
                  <p className="text-dark">{profile.noHp}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">Pendidikan</p>
                  <p className="text-dark">{profile.pendidikan}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">Nama Kontak Darurat</p>
                  <p className="text-dark">{profile.namaKontakDarurat}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">Nomor Kontak Darurat</p>
                  <p className="text-dark">{profile.nomorKontakDarurat}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">Tempat Lahir</p>
                  <p className="text-dark">{profile.tempatLahir}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-neutral-body my-0">Tanggal Lahir</p>
                  <p className="text-dark">{profile.tanggalLahir}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
