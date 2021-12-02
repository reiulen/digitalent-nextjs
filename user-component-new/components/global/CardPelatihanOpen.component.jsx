import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import Image from "next/image";
import ShareOverlay from "../global/ShareOverlay.component";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import { SweatAlert } from "../../../utils/middleware/helper";
import { getAllPelatihanByAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { useDispatch } from "react-redux";

const CardPelatihanOpen = ({
  funcMouseEnter,
  funcMouseLeave,
  funcQuickView,
  show,
  row,
  i,
  session,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleBookmark = async (pelatihan) => {
    const link = process.env.END_POINT_API_PELATIHAN;
    const config = {
      headers: {
        Authorization: "Bearer " + session?.token,
      },
    };

    const body = {
      pelatihan_id: pelatihan.id,
    };
    if (!pelatihan.bookmart) {
      try {
        const data = await axios.post(
          `${link}api/v1/bookmart-peserta/create`,
          body,
          config
        );
        if (data) {
          SweatAlert(
            "Berhasil",
            "Anda berhasil menambahkan pelatihan ke bookmark",
            "success"
          );
          // dispatch(getAllPelatihanByAkademi(session?.token, router.query.id));
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    } else {
      try {
        const data = await axios.delete(
          `${link}api/v1/bookmart-peserta/delete?pelatihan_id=${pelatihan.id}`,
          config
        );
        if (data) {
          SweatAlert(
            "Berhasil",
            "Anda berhasil menghapus pelatihan dari bookmark",
            "success"
          );
          // dispatch(getAllPelatihanByAkademi(session?.token, router.query.id));
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    }
  };
  return (
    <>
      <div
        onMouseEnter={() => funcMouseEnter(i)}
        onMouseLeave={() => funcMouseLeave(i)}
      >
        <div
          className={
            show[i] !== true && row.status === "Dibuka"
              ? `parent-image-pelatihan-new`
              : `parent-image-pelatihan-new-hover`
          }
        >
          <Image
            className={`image-list-pelatihan-new`}
            src={
              (row.gambar &&
                process.env.END_POINT_API_IMAGE_BEASISWA + row.gambar) ||
              "/assets/media/default-card.png"
            }
            layout="fill"
            objectFit="cover"
            alt="Image Thumbnail"
          />
        </div>
        <Card.ImgOverlay>
          <div className="d-flex justify-content-between">
            <div className="align-self-start">
              <Badge
                bg={`py-3 px-4 badge-card-pelatihan-new`}
                classNam="d-flex "
              >
                Pelatihan {row.metode_pelatihan}
              </Badge>
            </div>
            {show[i] && (
              <div className="whishlist align-self-end float-right">
                <Button
                  variant="light"
                  className={`float-right d-flex justify-content-center align-items-center wishlist-card-new`}
                >
                  <i
                    className={
                      !row.bookmart
                        ? `ri-heart-line p-0`
                        : `ri-heart-fill p-0 text-danger`
                    }
                    style={{
                      color: "#6C6C6C",
                    }}
                    onClick={() => {
                      if (!session) {
                        router.push("/peserta");
                      } else {
                        handleBookmark(row);
                      }
                    }}
                  ></i>
                </Button>

                <ShareOverlay
                  url={`http://dts-dev.majapahit.id/detail/pelatihan/${row.id}`}
                  quote={row.name}
                >
                  <Button
                    variant="light"
                    className={`float-right d-flex justify-content-center align-items-center mr-2 wishlist-card-new`}
                  >
                    <i
                      className="ri-share-line p-0"
                      style={{
                        color: "#6C6C6C",
                      }}
                    ></i>
                  </Button>
                </ShareOverlay>
              </div>
            )}
          </div>
        </Card.ImgOverlay>
        <Card.Body className="position-relative">
          <div className="mitra-pelatihan-new">
            <Image
              src={
                (row.gambar_mitra && row.file_path + row.gambar_mitra) ||
                "/assets/media/mitra-default.png"
              }
              width={60}
              height={60}
              objectFit="cover"
              thumbnail
              roundedCircle
              className={`mitra-pelatihan-image-new`}
              alt="Image Mitra"
            />
          </div>
          <div
            className="d-flex justify-content-between position-relative pb-0 mb-0"
            style={{ top: "-15px" }}
          >
            <p className={`pl-18 my-0 text-mitra-new`}>{row.mitra}</p>
            <div className="status align-self-center">
              <p
                className={`${
                  row.status === "Dibuka"
                    ? "status-mitra-open-new"
                    : "status-mitra-close-new"
                } text-uppercase my-0`}
              >
                {row.status}
              </p>
            </div>
          </div>
          <p className={`my-0 title-card-new`}>{row.name}</p>
          <p
            style={{
              fontSize: "14px",
              color: "#6C6C6C",
            }}
          >
            {row.akademi}
          </p>
          <hr />
          {show[i] !== true ? (
            <div className="d-flex flex-column">
              <div className="date d-flex align-items-center align-middle">
                <i className="ri-time-line"></i>
                <span className={`text-date-register-new pl-2`}>
                  Registrasi:{" "}
                  {moment(row.pendaftaran_mulai).utc().format("DD MMM YYYY")} -{" "}
                  {moment(row.pendaftaran_selesai).utc().format("DD MMM YYYY")}
                </span>
              </div>
              <div className="date d-flex align-items-center align-middle">
                <i className="ri-group-line"></i>
                <span className={`text-date-register-new pl-2`}>
                  Kuota: {row.kuota_peserta} Peserta
                </span>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "21px" }}>
              <Button
                className={`btn-block rounded-xl my-auto btn-quick-view-new`}
                onClick={() => funcQuickView(i)}
              >
                LIHAT
              </Button>
            </div>
          )}
        </Card.Body>
      </div>
    </>
  );
};

export default CardPelatihanOpen;
