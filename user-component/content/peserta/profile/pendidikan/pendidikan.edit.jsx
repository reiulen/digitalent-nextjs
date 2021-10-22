import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import style from "../style.module.css";

import {
  updateProfilePendidikan,
  clearErrors,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_PENDIDIKAN_RESET } from "../../../../../redux/types/pelatihan/profile.type";

const PendidikanEdit = ({ funcViewEdit, token }) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const { error: errorPendidikan, data: dataPendidikan } = useSelector(
    (state) => state.drowpdownPendidikan
  );
  const { error: errorPendidikanData, pendidikan } = useSelector(
    (state) => state.dataPendidikan
  );
  const {
    error: errorUpdateData,
    loading,
    success,
  } = useSelector((state) => state.updatePendidikan);

  const [jengjangPendidikan, setJenjangPendidikan] = useState(
    (pendidikan && pendidikan.jenjang_pendidikan) || null
  );
  const [asalSekolah, setAsalSekolah] = useState(
    (pendidikan && pendidikan.asal_sekolah) || null
  );
  const [lainya, setLainya] = useState(
    (pendidikan && pendidikan.lainya) || null
  );
  const [programStudi, setProgramStudi] = useState(
    (pendidikan && pendidikan.program_studi) || null
  );
  const [ipk, setIpk] = useState((pendidikan && pendidikan.ipk) || null);
  const [tahunMasuk, setTahunMasuk] = useState(
    (pendidikan && pendidikan.tahun_masuk) || null
  );

  const [ijazahName, setIjazahName] = useState("Belum ada file");
  const [ijazah, setIjazah] = useState("");
  const [ijazahPreview, setIjazahPreview] = useState("");

  const optionsJenjangPendidikan = [];
  if (dataPendidikan) {
    for (let index = 0; index < dataPendidikan.data.length; index++) {
      let val = {
        value: dataPendidikan.data[index].id,
        label: dataPendidikan.data[index].label,
      };
      optionsJenjangPendidikan.push(val);
    }
  }
  const optionsAsalSekolah = [
    { value: "0", label: "SMP" },
    { value: "1", label: "SMA" },
  ];

  useEffect(() => {
    if (errorUpdateData) {
      toast.error(errorUpdateData);
      dispatch(clearErrors());
    }

    if (success) {
      console.log(success);
      toast.success("Berhasil Update Data");
      funcViewEdit(false);
      dispatch({ type: UPDATE_PENDIDIKAN_RESET });
    }
  }, [errorUpdateData, success, dispatch]);

  const onChangeIjazah = (e) => {
    const type = ["image/jpeg", "image/jpg", "application/pdf"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setIjazah(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setIjazahPreview(e.target.files[0]);
          setIjazahName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data jpg atau pdf.",
          "error"
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        jenjang: jengjangPendidikan.label,
        asal_pendidikan: asalSekolah.label,
        lainya,
        program_studi: programStudi,
        ipk,
        tahun_masuk: parseInt(tahunMasuk),
        ijasah: ijazah,
      };
      console.log(data);
      dispatch(updateProfilePendidikan(data, token));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="informasi-pribadi">
          <h3 className="font-weight-bolder mb-5">Pendidikan Terakhir</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Jenjang Pendidikan</Form.Label>
            <Select
              placeholder="Silahkan Pilih Jenjang Pendidikan"
              options={optionsJenjangPendidikan}
              defaultValue={jengjangPendidikan}
              onChange={(e) =>
                setJenjangPendidikan({ label: e.label, value: e.value })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("jenjang pendidikan")
              }
            />
            {simpleValidator.current.message(
              "jenjang pendidikan",
              jengjangPendidikan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
            <Select
              placeholder="Silahkan Pilih Asal Sekolah / Perguruan Tinggi"
              options={optionsAsalSekolah}
              defaultValue={asalSekolah}
              onChange={(e) =>
                setAsalSekolah({ label: e.label, value: e.value })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("jenjang pendidikan")
              }
            />
            {simpleValidator.current.message(
              "jenjang pendidikan",
              jengjangPendidikan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukan Lainnya ( Sekolah / PT)"
              value={lainya}
              onChange={(e) => setLainya(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("lainya ( sekolah/ pt )")
              }
            />
            {simpleValidator.current.message(
              "lainya ( sekolah/ pt )",
              lainya,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Program Studi</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukan Program Studi"
              value={programStudi}
              onChange={(e) => setProgramStudi(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("program studi")
              }
            />
            {simpleValidator.current.message(
              "program studi",
              programStudi,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridIpk">
              <Form.Label>IPK</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukan IPK"
                value={ipk}
                onChange={(e) => setIpk(e.target.value)}
                onBlur={() => simpleValidator.current.showMessageFor("ipk")}
              />
              {simpleValidator.current.message("ipk", ipk, "required|integer", {
                className: "text-danger",
              })}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridTahun">
              <Form.Label>Tahun Masuk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukan Tahun Masuk"
                value={tahunMasuk}
                onChange={(e) => setTahunMasuk(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tahun masuk")
                }
              />
              {simpleValidator.current.message(
                "tahun masuk",
                tahunMasuk,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <div className="form-group">
            <label className="col-form-label">Unggah Ijazah</label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/jpeg , image/jpg ,application/pdf"
                  onChange={onChangeIjazah}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("ijazah")
                  }
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {ijazahName}
                </label>
                <label style={{ marginTop: "15px" }}>
                  {simpleValidator.current.message(
                    "ijazah",
                    ijazah,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
              </div>
            </div>
            <small className="text-muted">
              *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
            </small>
          </div>
        </div>

        <div className="button-aksi mt-5 float-right">
          <Button
            className={`${style.button_profile_batal} rounded-xl mr-2`}
            type="button"
            onClick={() => funcViewEdit(false)}
          >
            Batal
          </Button>
          <Button
            className={`${style.button_profile_simpan} rounded-xl`}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PendidikanEdit;
