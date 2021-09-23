import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import IconCalender from "../../../assets/icon/Calender";
import axios from "axios";

const ReviewKerjasama = () => {
  const router = useRouter();
  const id = router.query;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const notify = (value) =>
    toast.info(`🦄 ${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cooperationID, setCooperationID] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");

  console.log(title, date, cooperationID, period, periodUnit);

  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/cek-progres/${id}`
      );
      console.log("data sdfsdf",data)
      setTitle(data.data.title);
      setDate(data.data.submission_date);
      setCooperationID(data.data.cooperation_category);
      setPeriod(data.data.period);
      setPeriodUnit(data.data.period_unit);

    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };

  const acceptDokument = async(e) => {
    console.log("acceptDokument")
    e.preventDefault()
    try {
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/accept/${router.query.id}`
        );
        console.log("data",data)
        router.push({
          pathname:"/partnership/kerjasama/",
          query:{successTerima:true}
        })
      } catch (error) {
        console.log("error acceptDokument",error)
      }
    }
    
    const rejectDokument = async(e) => {
    console.log("rejectDokument")
    e.preventDefault()
    try {
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/reject/${router.query.id}`
      );

      console.log("data asdasd",data)
      router.push({
        pathname:"/partnership/kerjasama/",
        query:{successReject:true}
      })
    } catch (error) {
      console.log("error acceptDokument",error)
    }
  }

  useEffect(() => {
    setDataSingle(router.query.id);
  }, [router.query.id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Review Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Tanggal
                </label>
                <input
                  readOnly
                  type="date"
                  required
                  value={date&&date}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Judul kerjasama
                </label>
                <input
                  required
                  readOnly
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Judul Kerjasama"
                />
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kategori kerjasama
                </label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  disabled
                  value={cooperationID.id}
                >
                  <option>{cooperationID.name}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <input
                      required
                      readOnly
                      type="number"
                      className="form-control mt-2"
                      onChange={(e) => setPeriod(e.target.value)}
                      value={period}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-control mt-2">Tahun</div>
                  </div>
                </div>
              </div>
              {cooperationID === ""
                ? ""
                : cooperationID.data_content.map((items, i) => {
                    return (
                      <div key={i} className={`form-group`}>
                        <label htmlFor="staticEmail" className="col-form-label">
                          {items.cooperation_form}
                        </label>
                        <textarea
                          readOnly
                          value={items.form_content}
                          name=""
                          id={i}
                          cols="30"
                          rows="5"
                          className="form-control"
                        ></textarea>
                      </div>
                    );
                  })}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <button
                    // type="button"
                    onClick={(e)=>rejectDokument(e)}
                    className="btn btn-sm btn-rounded-full bg-red-primary text-white"
                  >
                    Tolak
                  </button>
                  <Link
                    href={{
                      pathname:"/partnership/kerjasama/detail-revisi-kerjasama",
                      query:{id:router.query.id,varsion:router.query.version}
                    }}
                    passHref
                  >
                    <a className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mx-5">
                      Ajukan Revisi
                    </a>
                  </Link>
                  <button
                  // type="button"
                    onClick={(e)=>acceptDokument(e)}
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                  >
                    Terima
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReviewKerjasama;
