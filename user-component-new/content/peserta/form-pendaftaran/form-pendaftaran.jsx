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

import RadioReference from "../../../../components/content/pelatihan/training/components/radio-reference.component";
import OptionsReference from "../../../../components/content/pelatihan/training/components/option-reference.component";
import CheckboxReference from "../../../../components/content/pelatihan/training/components/checkbox-reference.component";

import { helperElementRender } from "../../../../utils/middleware/helper";
import FormBuilderComponent from "./component/form-builder.component";

const FormPendaftaran = ({ propsTitle, funcView, token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [title, setTitle] = useState(propsTitle);
  const { formBuilder } = useSelector((state) => state.getFormBuilder);
  const [dataPendaftaran, setDataPendaftaran] = useState(
    formBuilder?.FormBuilder
  );

  const { error: errorPelatihan, pelatihan: dataTraining } = useSelector(
    (state) => state.getPelatihan
  );

  // const dummyForm = {
  //   komitmen: false,
  //   form_pendaftaran: [
  //     {
  //       key: 1,
  //       name: "Nama Trigered Satu",
  //       element: "triggered",
  //       size: "col-md-12",
  //       option: "manual",
  //       dataOption: "data1;data2",
  //       required: "1",
  //       fileName: "",
  //       value: "",
  //       triggered: "1",
  //       triggered_parent: [
  //         {
  //           key: 1,
  //           triggeredName: "data1",
  //           triggeredForm: [
  //             {
  //               key: 1,
  //               name: " Trigger Dua",
  //               element: "triggered",
  //               size: "col-md-12",
  //               option: "manual",
  //               dataOption: "data3;data4",
  //               fileName: "Belum ada file",
  //               value: "",
  //               triggered: "1",
  //               triggered_children: [
  //                 {
  //                   key: 1,
  //                   triggeredName: "data3",
  //                   triggeredForm: [
  //                     {
  //                       key: 1,
  //                       name: "trigger Tiga",
  //                       element: "triggered",
  //                       size: "col-md-12",
  //                       option: "manual",
  //                       dataOption: "data5;data6",
  //                       fileName: "Belum ada file",
  //                       triggered: "1",
  //                       required: "1",
  //                       value: "",
  //                       triggered_index: [
  //                         {
  //                           key: 1,
  //                           triggeredName: "data5",
  //                           triggeredForm: [
  //                             {
  //                               key: 1,
  //                               name: "Input Checkbox",
  //                               element: "checkbox",
  //                               size: "col-md-12",
  //                               option: "select_reference",
  //                               dataOption: "7",
  //                               fileName: "Belum ada file",
  //                               triggered: "0",
  //                               required: "1",
  //                               value: "",
  //                             },
  //                           ],
  //                         },
  //                         {
  //                           key: 2,
  //                           triggeredName: "data6",
  //                           triggeredForm: [
  //                             {
  //                               key: 1,
  //                               name: "Input Alamat",
  //                               element: "textarea",
  //                               size: "col-md-12",
  //                               option: "",
  //                               dataOption: "",
  //                               fileName: "Belum ada file",
  //                               triggered: "0",
  //                               required: "1",
  //                               value: "",
  //                             },
  //                           ],
  //                         },
  //                       ],
  //                     },
  //                   ],
  //                 },
  //                 {
  //                   key: 2,
  //                   triggeredName: "data4",
  //                   triggeredForm: [],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           key: 2,
  //           triggeredName: "data2",
  //           triggeredForm: [],
  //         },
  //       ],
  //     },
  //     {
  //       key: 2,
  //       name: "Universitas",
  //       element: "upload_document",
  //       size: "col-md-12",
  //       option: "",
  //       dataOption: "",
  //       required: "1",
  //       fileName: "nameFile.pdf",
  //       value: "",
  //       triggered: "0",
  //       triggered_parent: [],
  //     },
  //   ],
  // };

  // const [dataPendaftaran, setDataPendaftaran] = useState(
  //   dummyForm.form_pendaftaran
  // );

  useEffect(() => {
    dataPendaftaran &&
      dataPendaftaran.length > 0 &&
      dataPendaftaran.map((rowBuilder, i) => {
        // FIRST FORM BUILDER OBJECT
        if (rowBuilder.element === "checkbox") {
          rowBuilder.value = [];
        }
        rowBuilder.triggered_parent.length > 0 &&
          rowBuilder.triggered_parent.map((rowParent, indexParent) => {
            // TITLE FORM BUILDER OBJECT PARENT
            rowParent.triggeredForm.length > 0 &&
              rowParent.triggeredForm.map((rowFormParent, indexFormParent) => {
                // SECOND FORM BUILDER OBJECT
                if (rowFormParent.element === "checkbox") {
                  rowFormParent.value = [];
                }
                rowFormParent.triggered_children.length > 0 &&
                  rowFormParent.triggered_children.map(
                    (rowChildren, indexChildren) => {
                      // TITLE FORM BUILDER OBJECT CHILDREN
                      rowChildren.triggeredForm.length > 0 &&
                        rowChildren.triggeredForm.map(
                          (rowFormChildren, indexFormChildren) => {
                            // THIRD FORM BUILDER OBJECT
                            if (rowFormChildren.element === "checkbox") {
                              rowFormChildren.value = [];
                            }
                            rowFormChildren.triggered_index.length > 0 &&
                              rowFormChildren.triggered_index.map(
                                (rowIndex, indexIndex) => {
                                  // TITLE FORM BUILDER OBJECT INDEX
                                  rowIndex.triggeredForm.length > 0 &&
                                    rowIndex.triggeredForm.map(
                                      (rowFormIndex, indexFormIndex) => {
                                        // FOURTH FORM BUILDER OBJECT
                                        if (
                                          rowFormIndex.element === "checkbox"
                                        ) {
                                          rowFormIndex.value = [];
                                        }
                                        // console.log(rowFormIndex);
                                        // FOURTH FORM BUILDER OBJECT
                                      }
                                    );
                                  // console.log(rowIndex);
                                  // TITLE FORM BUILDER OBJECT INDEX
                                }
                              );
                            // console.log(rowFormChildren);
                            // THIRD FORM BUILDER OBJECT
                          }
                        );
                      // TITLE FORM BUILDER OBJECT CHILDREN
                      // console.log(rowChildren);
                    }
                  );
                // SECOND FORM BUILDER OBJECT
                // console.log(rowFormParent);
              });
            // TITLE FORM BUILDER OBJECT PARENT
            // console.log(rowParent);
          });
        // FIRST FORM BUILDER OBJECT
        // console.log(rowBuilder);
      });
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
    if (
      alfa !== null &&
      parentIndex === null &&
      beta === null &&
      childrenIndex === null &&
      gamma === null &&
      indexIndex === null &&
      delta === null
    ) {
      let list = [...dataPendaftaran];
      let element = list[alfa];

      if (element.element === "checkbox") {
        let valArr = element.value;
        if (valArr.length > 0) {
          valArr.map((row, i) => {
            if (row === value) {
              valArr.splice(i, 1);
            } else {
              valArr.push(value);
            }
          });
        } else {
          valArr.push(value);
        }
      } else {
        element.value = value;
      }
      if (element.element === "file_image" || element.element === "file_doc") {
        let type = [""];
        if (element.element === "file_image") {
          type = ["image/jpg", "image/png", "image/jpeg"];
        } else if (element.element === "file_doc") {
          type = ["application/pdf"];
        }
        if (value.target.files[0]) {
          if (type.includes(value.target.files[0].element)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                element.value = reader.result;
              }
            };
            reader.readAsDataURL(value.target.files[0]);
            element.fileName = value.target.files[0].name;
          } else {
            value.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang dimasukkan tidak sesuai format.",
              "error"
            );
          }
        }
      }
      setDataPendaftaran(list);
    }
    if (
      alfa !== null &&
      parentIndex !== null &&
      beta !== null &&
      childrenIndex === null &&
      gamma === null &&
      indexIndex === null &&
      delta === null
    ) {
      let list = [...dataPendaftaran];
      let element =
        list[alfa].triggered_parent[parentIndex].triggeredForm[beta];

      if (element.element === "checkbox") {
        let valArr = element.value;
        if (valArr.length > 0) {
          valArr.map((row, i) => {
            if (row === value) {
              valArr.splice(i, 1);
            } else {
              valArr.push(value);
            }
          });
        } else {
          valArr.push(value);
        }
      } else {
        element.value = value;
      }
      if (element.element === "file_image" || element.element === "file_doc") {
        let type = [""];
        if (element.element === "file_image") {
          type = ["image/jpg", "image/png", "image/jpeg"];
        } else if (element.element === "file_doc") {
          type = ["application/pdf"];
        }
        if (value.target.files[0]) {
          if (type.includes(value.target.files[0].element)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                element.value = reader.result;
              }
            };
            reader.readAsDataURL(value.target.files[0]);
            element.fileName = value.target.files[0].name;
          } else {
            value.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang dimasukkan tidak sesuai format.",
              "error"
            );
          }
        }
      }
      setDataPendaftaran(list);
    }
    if (
      alfa !== null &&
      parentIndex !== null &&
      beta !== null &&
      childrenIndex !== null &&
      gamma !== null &&
      indexIndex === null &&
      delta === null
    ) {
      let list = [...dataPendaftaran];
      let element =
        list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
          .triggered_children[childrenIndex].triggeredForm[gamma];

      if (element.element === "checkbox") {
        let valArr = element.value;
        if (valArr.length > 0) {
          valArr.map((row, i) => {
            if (row === value) {
              valArr.splice(i, 1);
            } else {
              valArr.push(value);
            }
          });
        } else {
          valArr.push(value);
        }
      } else {
        element.value = value;
      }
      if (element.element === "file_image" || element.element === "file_doc") {
        let type = [""];
        if (element.element === "file_image") {
          type = ["image/jpg", "image/png", "image/jpeg"];
        } else if (element.element === "file_doc") {
          type = ["application/pdf"];
        }
        if (value.target.files[0]) {
          if (type.includes(value.target.files[0].element)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                element.value = reader.result;
              }
            };
            reader.readAsDataURL(value.target.files[0]);
            element.fileName = value.target.files[0].name;
          } else {
            value.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang dimasukkan tidak sesuai format.",
              "error"
            );
          }
        }
      }
      setDataPendaftaran(list);
    }
    if (
      alfa !== null &&
      parentIndex !== null &&
      beta !== null &&
      childrenIndex !== null &&
      gamma !== null &&
      indexIndex !== null &&
      delta !== null
    ) {
      let list = [...dataPendaftaran];
      let element =
        list[alfa].triggered_parent[parentIndex].triggeredForm[beta]
          .triggered_children[childrenIndex].triggeredForm[gamma]
          .triggered_index[indexIndex].triggeredForm[delta];
      if (element.element === "checkbox") {
        let valArr = element.value;
        if (valArr.length > 0) {
          valArr.map((row, i) => {
            if (row === value) {
              valArr.splice(i, 1);
            } else {
              valArr.push(value);
            }
          });
        } else {
          valArr.push(value);
        }
      } else {
        element.value = value;
      }
      if (element.element === "file_image" || element.element === "file_doc") {
        let type = [""];
        if (element.element === "file_image") {
          type = ["image/jpg", "image/png", "image/jpeg"];
        } else if (element.element === "file_doc") {
          type = ["application/pdf"];
        }
        if (value.target.files[0]) {
          if (type.includes(value.target.files[0].element)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                element.value = reader.result;
              }
            };
            reader.readAsDataURL(value.target.files[0]);
            element.fileName = value.target.files[0].name;
          } else {
            value.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang dimasukkan tidak sesuai format.",
              "error"
            );
          }
        }
      }

      setDataPendaftaran(list);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let list = [...dataPendaftaran];
    list &&
      list.map((rowBuilder, i) => {
        // FIRST FORM BUILDER OBJECT
        if (rowBuilder.element === "checkbox") {
          rowBuilder.value = [];
        }
        rowBuilder.triggered_parent.length > 0 &&
          rowBuilder.triggered_parent.map((rowParent, indexParent) => {
            // TITLE FORM BUILDER OBJECT PARENT
            rowParent.triggeredForm.length > 0 &&
              rowParent.triggeredForm.map((rowFormParent, indexFormParent) => {
                // SECOND FORM BUILDER OBJECT
                if (rowFormParent.element === "checkbox") {
                  let val = rowFormParent.value.join(",");
                  rowFormParent.value = val;
                }
                rowFormParent.triggered_children.length > 0 &&
                  rowFormParent.triggered_children.map(
                    (rowChildren, indexChildren) => {
                      // TITLE FORM BUILDER OBJECT CHILDREN
                      rowChildren.triggeredForm.length > 0 &&
                        rowChildren.triggeredForm.map(
                          (rowFormChildren, indexFormChildren) => {
                            // THIRD FORM BUILDER OBJECT
                            if (rowFormChildren.element === "checkbox") {
                              let val = rowFormChildren.value.join(",");
                              rowFormChildren.value = val;
                            }
                            rowFormChildren.triggered_index.length > 0 &&
                              rowFormChildren.triggered_index.map(
                                (rowIndex, indexIndex) => {
                                  // TITLE FORM BUILDER OBJECT INDEX
                                  rowIndex.triggeredForm.length > 0 &&
                                    rowIndex.triggeredForm.map(
                                      (rowFormIndex, indexFormIndex) => {
                                        // FOURTH FORM BUILDER OBJECT
                                        if (
                                          rowFormIndex.element === "checkbox"
                                        ) {
                                          let val =
                                            rowFormIndex.value.join(",");
                                          rowFormIndex.value = val;
                                        }
                                        // console.log(rowFormIndex);
                                        // FOURTH FORM BUILDER OBJECT
                                      }
                                    );
                                  // console.log(rowIndex);
                                  // TITLE FORM BUILDER OBJECT INDEX
                                }
                              );
                            // console.log(rowFormChildren);
                            // THIRD FORM BUILDER OBJECT
                          }
                        );
                      // TITLE FORM BUILDER OBJECT CHILDREN
                      // console.log(rowChildren);
                    }
                  );
                // SECOND FORM BUILDER OBJECT
                // console.log(rowFormParent);
              });
            // TITLE FORM BUILDER OBJECT PARENT
            // console.log(rowParent);
          });
        // FIRST FORM BUILDER OBJECT
        // console.log(rowBuilder);
      });
    if (dataTraining?.komitmen == "1") {
      if (simpleValidator.current.allValid()) {
        // let list = [...dataPendaftaran];
        // list.map((row, i) => {
        //   if (row.type === "checkbox") {
        //     let val = row.value.join(",");
        //     row.value = val;
        //   }
        // });
        const data = {
          komitmen: dataTraining.komitmen,
          form_pendaftaran: list,
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
      // let list = [...dataPendaftaran];
      // list.map((row, i) => {
      //   if (row.type === "checkbox") {
      //     let val = row.value.join(",");
      //     row.value = val;
      //   }
      // });
      const data = {
        komitmen: dataTraining.komitmen,
        form_pendaftaran: list,
        pelatian_id: +router.query.id,
      };
      dispatch(newPendaftaranPelatihan(data, token));
    }
  };

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
              type="button"
              onClick={onSubmit}
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
