import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepReviewPelatihan from "../../../../StepReviewPelatihan";

const ViewFormCommitment = () => {
  const router = useRouter();

  const [komitmenPeserta] = useState("Ya");
  const [formKomitmen] = useState(
    "1. Bersedia mengikuti seluruh tahapan pelatihan sejak awal hingga selesai; 2. Bersedia menjadi calon Penerima Bantuan Pemerintah Digital Talent Scholarship Tahun 2021; 3. Bersedia memenuhi persyaratan administratif serta Syarat dan Ketentuan yang berlaku; 4. Bersedia memenuhi Kewajiban dan Tata Tertib sebagai peserta pelatihan;"
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <PageWrapper>
      <StepReviewPelatihan
        step={3}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        link1={`/pelatihan/review/view-pelatihan/${1}`}
        link2={`/pelatihan/review/view-pelatihan/view-form-pendaftaran/${1}`}
        link3={`/pelatihan/review/view-pelatihan/view-form-komitmen/${1}`}
      />

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <h3 className="font-weight-bolder pb-5 pt-4">Form Komitmen</h3>

            <div className="row">
              <div className="col-md-12">
                <p className="text-neutral-body">Komitmen Peserta</p>
                <p className="text-dark">{komitmenPeserta}</p>
              </div>
              <div className="col-md-12">
                <p className="text-neutral-body">Form Komitmen</p>
                <textarea rows="6" className="form-control" disabled>
                  {formKomitmen}
                </textarea>
              </div>
            </div>

            <div className="form-group my-5 pb-5">
              <div className="float-left mb-5">
                <button
                  className="btn btn-rounded-full btn-sm py-3 px-5 btn-danger mr-2"
                  type="button"
                >
                  Tolak
                </button>
              </div>
              <div className="float-right mb-5">
                <button
                  className="btn btn-light-ghost-rounded-full mr-2"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Revisi
                </button>
                <button className="btn btn-primary-rounded-full" type="submit">
                  Setujui
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Catatan Revisi</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModal(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-5">
            <label className="p-0">Isi Catatan</label>
            <textarea rows="5" className="form-control"></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Batal
          </button>
          <button className="btn btn-primary-rounded-full" type="submit">
            Ajukan Revisi
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ViewFormCommitment;
