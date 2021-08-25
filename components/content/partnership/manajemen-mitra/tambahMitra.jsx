import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  getProvinces
} from "../../../../redux/actions/partnership/mitra.actions";

// import {
//   newMitra,
//   clearErrors,
// } from "../../../../redux/actions/partnership/mitra.actions";

// import { getAllKota } from "../../../../redux/actions/utils/utils.actions";

// import LoadingPage from "../../../LoadingPage";

// import { NEW_MITRA_RESET } from "../../../../redux/types/partnership/mitra.type";

const TambahMitra = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [institution_name, setInstitution_name] = useState("")
  const [email, setEmail] = useState("")
  const [agency_logo, setAgency_logo] = useState("")
  const [wesite, setWesite] = useState("")
  const [address, setAddress] = useState("")
  const [indonesia_provinces_id, setIndonesia_provinces_id] = useState("")
  const [indonesia_cities_id, setIndonesia_cities_id] = useState("")
  const [postal_code, setPostal_code] = useState("")
  const [pic_name, setPic_name] = useState("")
  const [pic_contact_number, setPic_contact_number] = useState("")
  const [pic_email, setPic_email] = useState("")
  // pertama kali load provinces set kesini
  const [allProvinces, setAllProvinces] = useState([])

  const [error, setError] = useState({
    institution_name:"",
    email:'',
    agency_logo: '',
    wesite: '',
    address: '',
    indonesia_provinces_id: '',
    indonesia_cities_id:'',
    postal_code:'',
    pic_name:'',
    pic_contact_number:'',
    pic_email:'',
})

const onSubmit = (e) => {
  e.preventDefault()
  // if()


}



  useEffect(() => {
    dispatch(getProvinces())
  }, []);


  return (
    <PageWrapper>

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {/* {loading ? <LoadingPage loading={loading} /> : ""} */}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Mitra
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Gambar Logo
                </label>
                <div className="col-sm-3">
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        name="logo"
                        class="custom-file-input"
                        id="inputGroupFile04"
                        // onChange={onChangeGambar}
                      />
                      <label class="custom-file-label" for="inputGroupFile04">
                        Cari Dokumen
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama Lembaga
                </label>
                <div className="col-sm-10">
                  
                  <input
                  onFocus={()=>setError({...error,institution_name:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama Lembaga"
                    onChange={(e) => setInstitution_name(e.target.value)}
                  />
                  {error.institution_name ? <p className="error-text">{error.institution_name}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,email:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email ? <p className="error-text">{error.email}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Website
                </label>
                <div className="col-sm-10">
                  
                  
                  <input
                  onFocus={()=>setError({...error,wesite:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Website"
                    onChange={(e) => setWesite(e.target.value)}
                  />
                  {error.wesite ? <p className="error-text">{error.wesite}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Alamat
                </label>
                <div className="col-sm-10">
                  
                  <input
                  onFocus={()=>setError({...error,address:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Alamat"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {error.address ? <p className="error-text">{error.address}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Provinsi
                </label>
                <div className="col-10">
                  <select
                    // onChange={(e) => setProvinsi(e.target.value)}
                    // onBlur={(e) => setProvinsi(e.target.value)}
                    className="form-control"
                  >
                      <option value="">Data kosong</option>
                          <option>
                            {/* {row.name} */}ss
                          </option>
                       
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kota / Kabupaten
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    // onChange={(e) => setKotaKabupaten(e.target.value)}
                    // onBlur={(e) => setKotaKabupaten(e.target.value)}
                  >
                    
                          <option>
                            {/* {row.name} */}asd
                          </option>
                        
                  </select>
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Kota / Kabupaten"
                    onChange={(e) => setKotaKabupaten(e.target.value)}
                  /> */}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kode Pos
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,postal_code:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Kode Pos"
                    onChange={(e) => setPostal_code(e.target.value)}
                  />
                  {error.postal_code ? <p className="error-text">{error.postal_code}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama PIC
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,pic_name:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama"
                    onChange={(e) => setPic_name(e.target.value)}
                  />
                  {error.pic_name ? <p className="error-text">{error.pic_name}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  No. Kontak PIC
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,pic_contact_number:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan NO. Kontak"
                    onChange={(e) => pic_contact_number(e.target.value)}
                  />
                  {error.pic_contact_number ? <p className="error-text">{error.pic_contact_number}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email PIC
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,pic_email:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Email"
                    onChange={(e) => setPic_email(e.target.value)}
                  />
                  {error.pic_email ? <p className="error-text">{error.pic_email}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <div className="row align-items-right mt-5 ml-auto">
                  <div className="col-sm mr-4">
                    <Link href="/partnership/manajemen-mitra">
                      <a className="btn btn-outline-primary btn-sm mr-3">
                        Kembali
                      </a>
                    </Link>
                    {/* <Link href="/partnership/manajemen-mitra"> */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => onSubmit(e)}
                    >
                      Simpan
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahMitra;
