import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep3 = () => {
  const router = useRouter();

  const [komitmenPeserta] = useState("Ya");
  const [formKomitmen] = useState(
    "1. Bersedia mengikuti seluruh tahapan pelatihan sejak awal hingga selesai; 2. Bersedia menjadi calon Penerima Bantuan Pemerintah Digital Talent Scholarship Tahun 2021; 3. Bersedia memenuhi persyaratan administratif serta Syarat dan Ketentuan yang berlaku; 4. Bersedia memenuhi Kewajiban dan Tata Tertib sebagai peserta pelatihan;"
  );

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={3}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/pelatihan/view-pelatihan/${1}`}
        link2={`/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${1}`}
        link3={`/pelatihan/pelatihan/view-pelatihan/view-komitmen/${1}`}
        link4={`/pelatihan/pelatihan/view-pelatihan/view-parameter/${1}`}
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

            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() => router.back()}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ViewTrainingStep3;