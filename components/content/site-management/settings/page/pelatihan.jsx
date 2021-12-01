import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";

import PageWrapper from "../../../../wrapper/page.wrapper";
import Upload from "../../../../../public/assets/icon/sitemanagement/Upload.svg";
import Unduh from "../../../../../public/assets/icon/sitemanagement/Unduh.svg";
import Prompt from "./prompt";
import Template from "./template";
import SUBM from "./subm";
import FileSize from "./filesize";
import Ketentuan from "./ketentuan";

import { loadDataPrompt } from "../../../../../redux/actions/site-management/settings/pelatihan.actions";

export default function Pelatihan({ token }) {

  let dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(loadDataPrompt(token));
  }, [token, dispatch]);

  const [page, setPage] = useState(router.query.sidebar !== undefined ? router.query?.sidebar : "Prompt")

  return (
    <PageWrapper>
      <div className="order-1 px-0 sub-menu-pelatihan ">
        <div className="card ">
          <div className="card-body py-0">
            <div
              className="row"
            >
              <div className="col-lg-4 responsive-side-bar">
                <div style={{ marginTop: "32px" }}>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${page === "Prompt" ? "isactive" : "prompt"
                          }`}
                        onClick={() => {
                          setPage("Prompt");
                        }}
                      >
                        <Image
                          src={
                            page === "Prompt"
                              ? "/assets/icon/sitemanagement/Prompt.svg"
                              : "/assets/icon/sitemanagement/PromptNon.svg"
                          }
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3 style={{ fontSize: "16px", marginTop: '6px' }}>Prompt Update</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${page === "Template" ? "isactive" : "prompt"
                          }`}
                        onClick={() => {
                          setPage("Template");
                        }}
                      >
                        <Image
                          src={
                            page === "Template"
                              ? "/assets/icon/sitemanagement/TemplateActive.svg"
                              : "/assets/icon/sitemanagement/Email.svg"
                          }
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3 style={{ fontSize: "16px", marginTop: '6px' }}>Template Email</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${page === "SUBM" ? "isactive" : "prompt"
                          }`}
                        onClick={() => {
                          setPage("SUBM");
                        }}
                      >
                        <Image
                          src={
                            page === "SUBM"
                              ? "/assets/icon/sitemanagement/SUBMActive.svg"
                              : "/assets/icon/sitemanagement/SUBM.svg"
                          }
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3 style={{ fontSize: "16px", marginTop: '6px' }}>SUBM</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${page === "File Size" ? "isactive" : "prompt"
                          }`}
                        onClick={() => {
                          setPage("File Size");
                        }}
                      >
                        <Image
                          src={
                            page === "File Size"
                              ? "/assets/icon/sitemanagement/FileSizeActive.svg"
                              : "/assets/icon/sitemanagement/FileSize.svg"
                          }
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3 style={{ fontSize: "16px", marginTop: '6px' }}>File Size</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${page === "Ketentuan Pelatihan" ? "isactive" : "prompt"
                          }`}
                        onClick={() => {
                          setPage("Ketentuan Pelatihan");
                        }}
                      >
                        <Image
                          src={
                            page === "Ketentuan Pelatihan"
                              ? "/assets/icon/sitemanagement/KetentuanActive.svg"
                              : "/assets/icon/sitemanagement/Ketentuan.svg"
                          }
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3 style={{ fontSize: "16px", marginTop: '6px' }} >Ketentuan Pelatihan</h3>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-8" style={{ marginTop: "32px" }}>
                {page === "Prompt" && <Prompt token={token} />}

                {page === "Template" && <Template token={token} />}

                {page === "SUBM" && (
                  <SUBM token={token} />
                )}

                {page === "File Size" && (
                  <FileSize token={token} />
                )}

                {page === "Ketentuan Pelatihan" && (
                  <Ketentuan token={token} />
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
