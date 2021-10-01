import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import {useRouter} from 'next/router'
import axios from 'axios'
import Link from 'next/link'

import Style from "../../../../styles/progressbar.module.css";

function RevisiList({token}) {

  const router = useRouter();
  const cardContainer = {
    background: "#FFFFFF",
    boxShadow: "8px 8px 20px rgba(0, 0, 0, 0.15)",
    borderRadius: "5px",
    padding: "16px 32px",
    borderRadius: "12px",
  };
  const labelStyle = {
    color: "#04AA77",
    fontSize: "14px",
    fontWeight: "600",
    background: "#E6F7F1",
    borderRadius: "4px",
    padding:"4px 10px"
  };

  const styleList = {
    listStyle :"none",
    padding:"0",
    margin:"0"
  }

  const [listCardREvisi, setListCardREvisi] = useState([]);

  const getCardREviewList = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/card-review/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setListCardREvisi(data.data);
      console.log("data",data)
    } catch (error) {
      console.log("action getCardREviewList", error);
    }
  };

  useEffect(() => {
    getCardREviewList(router.query.id);
  }, [router.query.id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">
              Review Kerjasama
            </h3>
          </div>

          <div className="card-body pb-28">
             <div className="row mt-8 mb-10">
              <div className="col-2 p-0">
                <div className="progress-items">
                  {/* <div className="line-progress"></div> */}
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">
                      Submit Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">
                      Review Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Hasil</span>
                  </div>
                </div>
              </div>
            </div>

           <ul style={styleList}>
              {listCardREvisi.length === 0 ? "" : listCardREvisi.map((items,index)=>{
                return(
                  <li key={index} className="mt-5">
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={cardContainer}
                >
                  <div>
                    <h1 className="fw-500 fz-20" style={{ color: "#6C6C6C" }}>
                      {items.title}
                    </h1>
                    <p className="mt-4" style={{ color: "#ADB5BD" }}>
                      {items.information1}
                    </p>
                    <p style={{ color: "#ADB5BD" }}>Revisi Versi.{items.version}</p>
                  </div>

                  {/* <span style={labelStyle}>{items.information2}</span> */}
                {listCardREvisi.length -1 === index ? 

                 
                  <Link href={{
                    pathname:"/partnership/user/kerjasama/pembahasan-1",
                    query:{id:router.query.id,version:items.version,information2:items.information2,index:index}
                  }}>
                 <a className="btn btn-sm btn-rounded-full bg-blue-primary text-white">Lihat Detail Revisi</a> 
                  </Link>
                
                :

                <Link href={{
                    pathname:"/partnership/user/kerjasama/pembahasan-1",
                    query:{id:router.query.id,version:items.version,information2:items.information2,index:index}
                  }}>
                 <a style={labelStyle}>{items.information2}</a> 
                  </Link>

                // 
                 
                
                  
                }



                  {/* <button className="btn btn-sm btn-rounded-full bg-blue-primary text-white">{items.information2}</button> */}


                </div>
              </li>
                )
              })
              
                }
            </ul>
         
         
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default RevisiList;
