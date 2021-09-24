import React from "react";
import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep1 = () => {
  return (
    <PageWrapper>
      <StepViewPelatihan
        step={1}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/pelatihan/view-pelatihan/${1}`}
      />

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <h3 className="font-weight-bolder pb-5 pt-4">Data Pelatihan</h3>
            <table className=" w-100 table-responsive-sm">
              <thead
                style={{
                  fontWeight: "400",
                  color: "#6C6C6C",
                  lineHeight: "22px",
                }}
              >
                <tr>
                  <td className="w-50">Peserta DTS</td>
                  <td className="w-50 pl-2">Ketentuan Peserta</td>
                </tr>
              </thead>
              <tbody
                style={{
                  fontWeight: "400",
                  color: "#1F1F1F",
                  lineHeight: "25px",
                }}
              >
                <tr>
                  <td>Tidak</td>
                  <td className="font-weight-bold pl-2">
                    Peserta dapat mengikuti pelatihan <br /> ini ditahun yang
                    sama pada Akademi ini
                  </td>
                </tr>
              </tbody>
            </table>
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

export default ViewTrainingStep1;
