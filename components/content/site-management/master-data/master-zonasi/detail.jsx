import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import axios from "axios";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();
  const [formInput, setFormInput] = useState([]);
  const [nameZonation, setNameZonation] = useState("")

  useEffect(() => {
    async function getDetailZonasi(id, token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/zonasi/detail/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setNameZonation(data.data.name)
        setFormInput(data.data.data);
      } catch (error) {
        notify(error.response.data.message);
      }
    }

    getDetailZonasi(router.query.id, token);
  }, [router.query.id, token]);
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark titles-1"
            >
              {nameZonation}
            </h3> </div>
          <div className="card-body pt-0 px-4 px-sm-8"> <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">Provinsi</th>
                      <th className="text-left align-middle">Kota / Kabupaten</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formInput.length === 0 ? "" :
                    formInput.map((items,index)=>{
return(
                   
                    <tr key={index}>
                      <td className="text-left">{index+1}</td>
                      <td className="text-left">{items.provinsi}</td>
                      <td className="align-middle text-left">
                        {items.kota_kabupaten.map(((items,idx)=>{
                          return (
                            <p key={idx}>{items.label}</p>
                          )
                        }))}
                      </td> </tr>
                      )
                       })
                      }
                  </tbody>
                </table>
              </div>{" "}
              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/master-data/master-zonasi">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mt-5 mt-sm-0">
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
