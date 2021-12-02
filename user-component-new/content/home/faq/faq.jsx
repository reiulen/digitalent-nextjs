import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import Image from "next/image";
import { getAllFaq } from "../../../../redux/actions/beranda/faq-content.actions";
import PulseLoaderRender from "../../../../user-component-new/components/loader/PulseLoader";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import styles from "../faq/faq.module.css";

const FaqPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: loadingFaq,
    error,
    faq,
  } = useSelector((state) => state.allFaqContent);
  const { kategori } = useSelector((state) => state.kategoriBerandaFaq);

  const [title, setTitle] = useState("Pertanyaan Populer");
  const [keyword, setKeyword] = useState(null);
  const [showCategoryMobile, setShowCategoryMobile] = useState(false);

  const [content, setContent] = useState(
    faq?.faq.map((row, i) => {
      return {
        ...row,
        isShow: false,
      };
    })
  );

  const handleFilterKeyword = (e) => {
    e.preventDefault();
    dispatch(getAllFaq(null, null, keyword));
    setTitle(`Hasil Pencarian "${keyword}"`);

    if (keyword === "") {
      handlePinnedFaq();
    }
  };

  const handleLinkContent = (string) => {
    let text = string;
    let result = "";

    if (text.includes("<a")) {
      result = text.replace("<a", `<a target="_blank"`);
    } else {
      result = text;
    }

    return result;
  };

  const handlePinnedFaq = () => {
    dispatch(getAllFaq(1, null, null));
    setTitle("Pertanyaan Populer");
  };

  const handleCategoryFaq = (str) => {
    dispatch(getAllFaq(null, str, null));
    setTitle(str);
  };

  return (
    <Container fluid className="px-md-30 px-10 py-10 bg-white">
      <SubHeaderComponent
        data={[{ link: router.asPath, name: "Frequently Asked Questions" }]}
      />
      <div className="row">
        <div className="col-12 col-md-4">
          <h1
            style={{
              fontWeight: "700",
              fontFamily: "Poppins",
              fontSize: "40px",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            className="my-5"
            style={{
              color: "#6C6C6C",
              fontFamily: "Poppins",
              fontSize: "18px",
            }}
          >
            Ada yang bisa Kami Bantu ?
          </p>
        </div>
        <div className="d-none d-md-block col-md-8">
          <div
            className="rounded-lg p-5 text-wrap ml-2"
            style={{ backgroundColor: "#E6F2FF", fontSize: "14px" }}
          >
            <div className="font-weight-bold">
              "Budayakan membaca. Calon peserta/peserta harus membaca setiap
              informasi dengan lengkap dan teliti, agar terhindar dari kesalahan
              informasi dan mengurangi pertanyaan berulang yang tidak perlu."
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <form
            className="position-relative overflow-hidden my-5"
            onSubmit={() => handleFilterKeyword()}
          >
            <i className="ri-search-line left-center-absolute ml-3"></i>
            <input
              type="text"
              className="form-control pl-10"
              placeholder="Cari..."
              value={keyword}
              style={{ borderRadius: "30px", backgroundColor: "#fafafb" }}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="btn btn-primary text-white right-center-absolute"
              style={{
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                borderTopRightRadius: "18px",
                borderBottomRightRadius: "18px",
              }}
              type="submit"
              onClick={handleFilterKeyword}
            >
              Cari
            </button>
          </form>
          <div className="mb-5 d-none d-md-block">
            <h4
              style={{
                fontWeight: "600",
                marginTop: "50px",
                fontFamily: "Poppins",
                fontSize: "16px",
              }}
            >
              Kategori Pertanyaan
            </h4>
            <div>
              <div className={`d-flex flex-row ${styles.menuItem}`}>
                <div
                  className="d-flex align-items-center my-5 font-weight-bolder"
                  style={
                    title === "Pertanyaan Populer"
                      ? { cursor: "pointer", color: "#007CFF" }
                      : { cursor: "pointer", color: "#6C6C6C" }
                  }
                  onClick={() => handlePinnedFaq()}
                >
                  <div
                    className="fas fa-arrow-right mr-3"
                    style={
                      title === "Pertanyaan Populer"
                        ? { cursor: "pointer", color: "#007CFF" }
                        : { cursor: "pointer", color: "#6C6C6C" }
                    }
                  />
                  <td>Pertanyaan Populer</td>
                </div>
              </div>
            </div>

            {kategori && kategori.length !== 0
              ? kategori.map((el, i) => {
                  return (
                    <div key={i}>
                      <div className={`d-flex flex-row ${styles.menuItem}`}>
                        <div
                          className="d-flex align-items-center my-5 font-weight-bolder"
                          style={
                            title === el.nama_kategori
                              ? { cursor: "pointer", color: "#007CFF" }
                              : { cursor: "pointer", color: "#6C6C6C" }
                          }
                          onClick={() => handleCategoryFaq(el.nama_kategori)}
                        >
                          <div
                            className="fas fa-arrow-right mr-3"
                            style={
                              title === el.nama_kategori
                                ? { cursor: "pointer", color: "#007CFF" }
                                : { cursor: "pointer", color: "#6C6C6C" }
                            }
                          />
                          <td>{el.nama_kategori}</td>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          {/* Filter on Mobile */}
          <div
            className="mb-5 d-block d-md-none"
            style={{
              marginTop: "30px",
              borderRadius: "6px",
              border: "1px solid #D7E1EA",
            }}
          >
            <div className="row d-flex justify-content-between align-items-center mx-5 py-5">
              <div className="d-flex align-items-center">
                <Image
                  src={`/assets/media/logo-kategori.svg`}
                  width={32}
                  height={32}
                  alt="Logo Kategori Pertanyaan"
                />
                <span className="font-weight-bolder ml-3">
                  Kategori Pertanyaan
                </span>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setShowCategoryMobile(!showCategoryMobile)}
              >
                <i
                  className={
                    showCategoryMobile === false
                      ? "ri-arrow-down-s-line"
                      : "ri-arrow-right-s-line"
                  }
                />
              </div>
            </div>

            {showCategoryMobile === true ? (
              <div>
                <div className="ml-7">
                  <div className="d-flex flex-row">
                    <div
                      className="d-flex align-items-center my-5 font-weight-bolder"
                      style={
                        title === "Pertanyaan Populer"
                          ? { cursor: "pointer", color: "#007CFF" }
                          : { cursor: "pointer", color: "#6C6C6C" }
                      }
                      onClick={() => handlePinnedFaq()}
                    >
                      <i
                        className="fas fa-arrow-right mr-3"
                        style={
                          title === "Pertanyaan Populer"
                            ? { cursor: "pointer", color: "#007CFF" }
                            : { cursor: "pointer", color: "#6C6C6C" }
                        }
                      />
                      <td>Pertanyaan Populer</td>
                    </div>
                  </div>

                  {kategori && kategori.length !== 0
                    ? kategori.map((el, i) => {
                        return (
                          <div key={i}>
                            <div className="d-flex flex-row">
                              <div
                                className="d-flex align-items-center my-5 font-weight-bolder"
                                style={
                                  title === el.nama_kategori
                                    ? { cursor: "pointer", color: "#007CFF" }
                                    : { cursor: "pointer", color: "#6C6C6C" }
                                }
                                onClick={() =>
                                  handleCategoryFaq(el.nama_kategori)
                                }
                              >
                                <i
                                  className="fas fa-arrow-right mr-3"
                                  style={
                                    title === el.nama_kategori
                                      ? { cursor: "pointer", color: "#007CFF" }
                                      : { cursor: "pointer", color: "#6C6C6C" }
                                  }
                                />
                                <td>{el.nama_kategori}</td>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}
          </div>
          {/* End Filter on Mobile */}
        </div>

        {/* Content */}
        <div className="col-md-8">
          <div className="ml-3">
            <h2
              style={{
                fontWeight: "700",
                marginTop: "10px",
                color: "#203e80",
              }}
            >
              {title}
            </h2>
            {loadingFaq ? (
              <div className="container-fluid">
                <div className="row">
                  <PulseLoaderRender />
                </div>
              </div>
            ) : (
              <div className="my-2 my-md-17">
                {faq?.faq.length > 0 ? (
                  faq?.faq.map((row, i) => {
                    return (
                      <div className="accordion" id="selector" key={i}>
                        <div
                          className="accordion-item"
                          style={{
                            marginTop: "30px",
                            borderRadius: "6px",
                            border: "1px solid #D7E1EA",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setContent(
                              content.filter((item) => {
                                if (row.id === item.id) {
                                  row.isShow = !row.isShow;
                                }
                                return item;
                              })
                            );
                          }}
                          data-toggle="collapse"
                          data-target={
                            i === 0
                              ? "#collapseExample"
                              : `#collapseExample${i}`
                          }
                          key={i}
                          data-parent="#selector"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          <div
                            className={
                              row.isShow === true
                                ? "accordion-header d-flex justify-content-between align-items-center pt-5 "
                                : "accordion-header d-flex justify-content-between align-items-center py-5"
                            }
                            style={{ marginLeft: "30px" }}
                          >
                            <h4 style={{ fontWeight: "600", fontSize: "20px" }}>
                              {row.judul}
                            </h4>
                            <button
                              className="accordion-button btn"
                              type="button"
                            >
                              <i
                                className={
                                  row.isShow === true
                                    ? "fas fa-minus-circle"
                                    : "fas fa-plus-circle"
                                }
                                style={{ color: "#3699ff" }}
                              ></i>
                            </button>
                          </div>
                          <div
                            className="collapse"
                            id={
                              i === 0
                                ? "collapseExample"
                                : `collapseExample${i}`
                            }
                            key={i}
                          >
                            <div
                              className={`accordion-body mx-9 border-0 mb-5 mt-3 text-justify ${styles.detailFaq}`}
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "16px",
                                color: "#464E5F",
                                width: "max-content",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: handleLinkContent(row.jawaban),
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="row mx-auto">
                    <div className="col col-12 d-flex flex-column justify-content-center">
                      <Image
                        src={`/assets/media/gambar-belum-tersedia-page.svg`}
                        width={525}
                        height={350}
                        alt="Tidak Tersedia"
                      />
                      <h1
                        className="font-weight-bolder mt-15 text-center fw-600"
                        style={{ fontFamily: "Poppins", fontSize: "24px" }}
                      >
                        Tidak ada tanya jawab terkait "{keyword}"
                      </h1>

                      <div
                        className="mt-5 text-center"
                        style={{ fontFamily: "Poppins", fontSize: "16px" }}
                      >
                        Silahkan hubungi pusat bantuan kami jika anda
                        membutuhkan bantuan
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* End of Content */}
      </div>
    </Container>
  );
};

export default FaqPage;
