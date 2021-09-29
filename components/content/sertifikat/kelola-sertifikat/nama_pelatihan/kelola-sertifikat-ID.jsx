import React, { useState, useEffect, useRef, createRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// #Page, Component & Library
import PageWrapper from "../../../../wrapper/page.wrapper";
import Image from "next/image";
// #Icon

export default function KelolasertifikatID() {
  const router = useRouter();
  const { query } = router;
  // console.log(router);
  return (
    <PageWrapper>
      {/* error START */}
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          {/* START HEADER */}
          <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10 ">
            <div className="card-title d-flex">
              <div className="text-dark">Sertifikat A</div>
            </div>
            <div className="card-toolbar">
              <Link href={`/sertifikat/kelola-sertifikat/${query.akademi}`}>
                <a className="btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-lg">
                  Kembali
                </a>
              </Link>
              <div
                // href={`/sertifikat/master-sertifikat/${query.akademi}/${query.id}/edit`}
                data-toggle="modal"
                data-target="#editModal"
              >
                <button className="btn btn-primary-rounded-full rounded-pill btn-lg">
                  Ubah
                </button>
              </div>
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top">
            <div className="position-relative " style={{ height: "600px" }}>
              <Image
                src={
                  "https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/certificate-images/2d08970e-7c1a-483a-ae55-ce19e6b8d36f.jpg"
                }
                alt="fitur"
                // height={495}
                // width={700}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          {/* END BODY */}
        </div>

        {/* MODAL TANDA TANGAN */}
        <div className="modal fade" tabIndex="-1" role="dialog" id="editModal">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajukan Perubahan</h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                ></button>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <a aria-hidden="true">&times;</a>
                </button>
              </div>
              <div className="modal-body">
                <p>Alasan Perubahan</p>
                <div className="input-group">
                  <textarea
                    className="form-control h-100px"
                    aria-label="With textarea"
                    onChange={e => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
