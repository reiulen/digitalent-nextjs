import React from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useSelector } from "react-redux";
const DetailRefrence = ({ token }) => {
  const detailDataReference = useSelector((state) => state.detailDataReference);
  console.log("detailDataReference",detailDataReference)
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-0 mt-5 titles-1"
            >
              Detail Data Reference
            </h3>
          </div>
          <div className="card-body pt-0">
            <div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                  Nama Data Reference
                </p>
                <p
                  htmlFor="exampleSelect1"
                  className="fw-400 fz-16"
                  style={{ color: "#1F1F1F" }}
                >
                  {detailDataReference?.dataReference?.name}
                </p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                  Status{" "}
                </p>
                <p
                  htmlFor="exampleSelect1"
                  className="fw-400 fz-16"  
                  style={{ color: "#1F1F1F" }}
                >
                  {detailDataReference?.dataReference?.status == 1 ? "Aktif" : "Tidak Aktif"}
                </p>
              </div>
              <div className="form-group d-flex flex-column mt-4">
                <p htmlFor="exampleSelect1" style={{ color: "#6C6C6C" }}>
                  Value
                </p>
                <ul>
                  {detailDataReference.dataReference.data_references_relasi_id === null ?
                  
                detailDataReference.dataReference.value_reference.map((items,index)=>{
                   return(

                 <li key={index}>
                   <p
                     className="fw-400 fz-16 mb-0"
                     style={{ color: "#1F1F1F" }}
                   >
                     {items.value}
                   </p>
                 </li>
                   )
                 })
                 :
                 detailDataReference.dataReference.valueReference.map((items,index)=>{
                    return(
 
                  <li key={index}>
                    <p
                      className="fw-400 fz-16 mb-0"
                      style={{ color: "#1F1F1F" }}
                    >
                      {items.value}
                    </p>
                    <ul>
                      {items.relasi.map((itemz,idx)=>{
                        return(

                        <li key={idx}>
                          {itemz.value}
                        </li>
                        )
                      })}
                    </ul>
                  </li>
                    )
                  })

                 
                  
                }
                </ul>
              </div>{" "}
            </div>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/reference" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailRefrence;
