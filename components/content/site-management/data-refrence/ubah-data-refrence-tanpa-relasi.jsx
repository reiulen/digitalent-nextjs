import React, { useState,useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";
import IconDelete from "../../../assets/icon/Delete";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const Tambah = ({ token }) => {
  const router = useRouter();

  const detailDataReference = useSelector((state) => state.detailDataReference);
  console.log("detailDataReference tanpa relasi",detailDataReference)

  const [nameReference, setNameReference] = useState(detailDataReference.dataReference.name);
  const [number, setNumber] = useState(1);
  const [status, setStatus] = useState(detailDataReference.dataReference.status);
  const [values, setValues] = useState(detailDataReference.dataReference.value_reference.map((items)=>{
    return {...items,value_old:items.value}
  }));
  const [formInput, setFormInput] = useState(detailDataReference.dataReference.value_reference.map((items)=>{
    return {value_old:items.value,value:items.value}
  }))
  console.log("formInput state",formInput)
  console.log("values state",values)


  const handleAdd = () => {
    let _temp = [...values];
    let _tempValue = [...formInput];
    _temp.push({
      name: `Value ${number + 1}`,
      value: "",
    });
    _tempValue.push({
      value_old: "",
      value: "",
    });
    setNumber(number + 1);
    setValues(_temp);
    setFormInput(_tempValue);
  };

  const handleChange = (e, index) => {
    let _temp = [...values];
    let _tempValue = [...formInput];

    _tempValue[index].value = e.target.value;
    // _tempValue[index].value_old = e.target.value;








    _temp[index].value = e.target.value;


      _tempValue[index].value = e.target.value;




      setFormInput(_tempValue);
      setValues(_temp);




    
    // if(_tempValue[index].value_old === ""){
    //   _tempValue[index].value_old = e.target.value
    //   _temp[index].value = e.target.value;
    //   setFormInput(_tempValue);
    //   setValues(_temp);
    // }else{
    //   _temp[index].value = e.target.value;
    //   _tempValue[index].value = e.target.value;
    //   setFormInput(_tempValue);
    //   setValues(_temp);
    // }
    
    
  };

  const handleRemove = (index) => {
    let _temp = [...values];
    let _tempValue = [...formInput];

    let resultTemp = _temp.filter((items, idx) => idx !== index);
    let resultTempValue = _tempValue.filter((items, idx) => idx !== index);



    setValues(resultTemp);
    setFormInput(resultTempValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (nameReference === "") {
      Swal.fire("Gagal", `Nama data reference tidak boleh kosong`, "error");
    } else if (status === "") {
      Swal.fire("Gagal", `Status tidak boleh kosong`, "error");
    } else if (values.length === 1){
      Swal.fire("Gagal", `Form value tidak boleh kosong`, "error");
    } 
    
    else {


      
      let formData = new FormData();

      formData.append("id", router.query.id);
      formData.append("name", nameReference);
      formData.append("status", status);
      
      formInput.forEach((element,index) => {
        if(!element.value_old.length){
          element.value_old = values[index].value
        }
      });

      formInput.forEach((element,i) => {
        formData.append(`value_old[${i}]`, element.value_old);
      });

      formInput.forEach((element,i) => {
        formData.append(`value[${i}]`, element.value);
      });


      // values.forEach((item, i) => {
      //   formData.append(`value[${i}]`, item);
      // });
      // formInput.forEach((item, i) => {
      //   formData.append(`value_old[${i}]`, item);
      // });
      try {
        let { data } = await axios.post(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/reference/update`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire("Berhasil", "Data berhasil diubah", "success").then(() => {
          router.push("/site-management/reference");
        });
      } catch (error) {
        Swal.fire("Gagal simpan", `${error.response.data.message}`, "error");
      }
    }
  };




  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Ubah Reference Dengan Relasi
            </h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  placeholder="Masukan nama reference"
                  type="text"
                  className="form-control"
                  value={nameReference}
                  onChange={(e) => setNameReference(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                {status == 1 ?
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
                :
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Tidak Aktif</option>
                  <option value="1">Aktif</option>
                </select>
                }
              </div>

              {values.map((items, index) => {
                return (
                  <div className="form-group" key={index}>
                    <label htmlFor="staticEmail" className="col-form-label">
                      {items.name}
                    </label>
                    <div className="position-relative d-flex align-items-center">
                      <input
                        placeholder="Masukan value"
                        type="text"
                        value={items.value}
                        onChange={(e) => handleChange(e, index)}
                        className="form-control mr-6"
                      />
                      {index == 0 ? ""
                      :
                      <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: "#EE2D41" }}
                        onClick={() => handleRemove(index)}
                      >
                        <svg
                          className="position-relative"
                          style={{ bottom: "2px" }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                            fill="#ffffff"
                          />
                        </svg>
                      </button>
                      }
                    </div>
                  </div>
                );
              })}

              

             <div className="d-flex align-items-center justify-content-end">
                <div className="form-group">
                  <label className="col-form-label"></label>

                  <p
                    className="btn btn-rounded-full bg-blue-secondary text-white"
                    style={{
                      backgroundColor: "#40A9FF",
                      color: "#FFFFFF",
                      width: "max-content",
                    }}
                    onClick={() => handleAdd()}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Value
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/reference/">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
