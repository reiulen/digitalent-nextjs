import React from "react";
import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useSelector } from "react-redux";

const Table = ({ token }) => {

  const detailUnitWork = useSelector(state => state.detailUnitWork)

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark titles-1"
            >
              Detail Satuan Kerja Penyelenggara
            </h3>
           
          </div>
          <hr className="mx-8 my-1" />
          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left fz-14">No</th>
                      <th className="text-left align-middle fz-14">Provinsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailUnitWork?.unitWork.provinsi.map((items,index)=>{
                      return(
                        <tr key={index}>
                      <td className="align-middle text-left">{index+1}</td>
                      <td className="align-middle text-left">{items.provinsi}</td>{" "}
                    </tr>

                      )
                    })}
                    
                  </tbody>
                </table>
              </div>{" "}
              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/master-data/master-satuan-kerja-penyelenggara">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                      Kembali
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
