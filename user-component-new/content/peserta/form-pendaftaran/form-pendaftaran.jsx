import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newPendaftaranPelatihan,
  storeFormRegister,
} from "../../../../redux/actions/pelatihan/register-training.actions";

import {
  helperFormatCheckbox,
  helperUnformatCheckbox,
  helperChangeInputForm,
} from "../../../../utils/middleware/helper";
import FormBuilderComponent from "./component/form-builder.component";

const FormPendaftaran = ({ propsTitle, funcView, token }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pindahan, setPindahan] = useState(false);
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [title, setTitle] = useState(propsTitle);
  // const { formBuilder } = useSelector((state) => state.getFormBuilder);
  const { dataForm } = useSelector((state) => state.formRegister);
  const [dataPendaftaran, setDataPendaftaran] = useState([]);

  const { error: errorPelatihan, pelatihan: dataTraining } = useSelector(
    (state) => state.getPelatihan
  );

  useEffect(() => {
    const valueForm = helperFormatCheckbox(dataForm?.form_pendaftaran);
    setDataPendaftaran(valueForm);
  }, []);

  const onChangeInputHandler = (
    value,
    alfa,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueForm = helperChangeInputForm(
      value,
      dataPendaftaran,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    setDataPendaftaran(valueForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let list = [...dataPendaftaran];
    const valueForm = helperUnformatCheckbox(list);

    if (dataTraining?.komitmen == "1") {
      if (simpleValidator.current.allValid()) {
        const data = {
          komitmen: dataForm.komitmen ? "1" : "0",
          form_pendaftaran: valueForm,
        };
        dispatch(storeFormRegister(data));
        funcView(2);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data dengan benar !",
        });
      }
    } else {
      const data = {
        komitmen: dataForm.komitmen ? "1" : "0",
        form_pendaftaran: valueForm,
        pelatian_id: +router.query.id,
      };
      if (pindahan) {
        dispatch(newPendaftaranPelatihan(data, token, pindahan));
      } else {
        dispatch(newPendaftaranPelatihan(data, token));
      }
    }
  };

  useEffect(() => {
    if (dataPribadi?.pindahan_pelatihan_id?.includes(dataTraining?.id)) {
      setPindahan(true);
      return;
    } else {
      setPindahan(false);
    }
  }, []);
  useEffect(() => {
    console.log(pindahan, "ni pindahan");
  }, [pindahan]);
  return (
    <>
      <Card.Body>
        <form onSubmit={onSubmit}>
          <h3 className="font-weight-bolder pb-5 pt-4">{title}</h3>
          <FormBuilderComponent
            formBuilder={dataPendaftaran}
            token={token}
            funcChangeInput={(
              value,
              alfa,
              indexParent,
              beta,
              indexChildren,
              gamma,
              indexIndex,
              delta
            ) =>
              onChangeInputHandler(
                value,
                alfa,
                indexParent,
                beta,
                indexChildren,
                gamma,
                indexIndex,
                delta
              )
            }
          />

          <div className="button-aksi mt-7 float-right">
            <Button
              className={`${style.button_profile_batal} rounded-xl mr-3`}
              type="button"
              onClick={() => router.back()}
            >
              Batal
            </Button>
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
            >
              {dataTraining?.komitmen == "1" ? "Lanjut" : "Daftar"}
            </Button>
          </div>
        </form>
      </Card.Body>
    </>
  );
};

export default FormPendaftaran;
