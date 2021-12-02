// import "react-pro-sidebar/dist/css/styles.css";
import React, { Fragment } from "react";
import Logo from "/public/assets/logo/mainlogo.png";
import Simonas from "/public/assets/logo/image 10.png";
import Beasiswa from "/public/assets/logo/Logo besiswa fix  3.png";
import Image from "next/dist/client/image";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/client";

const Sidebar = ({ screenClass, titleAkun, accountFalse }) => {
  const router = useRouter();

  const [drop, setDrop] = useState(true);
  const [click, setClick] = useState(1);

  const [dropSimonas, setDropSimonas] = useState(false);
  const [clickSimonas, setClickSimonas] = useState(1);

  const [dropBeasiswa, setDropBeasiswa] = useState(false);
  const [clickBeasiswa, setClickBeasiswa] = useState(1);

  const handleDown = (e) => {
    if (e.target.innerHTML === "Digital Talent Schoolarship") {
      setClick(click + 1);

      if (click % 2 === 0) {
        setDrop(false);
      } else {
        setDrop(true);

        setDropBeasiswa(false);
        setDropSimonas(false);
      }
    } else if (e.target.innerHTML === "SIMONAS") {
      setClickSimonas(clickSimonas + 1);
      if (clickSimonas % 2 === 0) {
        setDropSimonas(false);
      } else {
        setDropSimonas(true);
        setDrop(false);
        setDropBeasiswa(false);
      }
    } else if (e.target.innerHTML === "Beasiswa") {
      setClickBeasiswa(clickBeasiswa + 1);
      if (clickBeasiswa % 2 === 0) {
        setDropBeasiswa(false);
      } else {
        setDropBeasiswa(true);
        setDrop(false);
        setDropSimonas(false);
      }
    }
  };

  const handleDropFalse = () => {
    setDrop(false);
  };

  return (
    <Fragment>
      <div className={screenClass}>
        <div className={styles.titlePlatform}>PLATFORM</div>
        <div
          className={
            drop && !router.pathname.includes("/peserta/profile")
              ? styles.active
              : styles.subMenuTitle
          }
          onClick={(event) => handleDown(event)}
        >
          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <Image
                src={Logo}
                alt=""
                className={styles.img}
                onClick={(event) => handleDown(event)}
              />
            </div>
            <div className="p-2">
              <div>Digital Talent Scholarship</div>
            </div>
          </div>
        </div>

        <div>
          <Link href="/peserta" passHref>
            <div
              className={`${
                router.pathname === "/peserta"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-pie-chart-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Dashboard</div>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/peserta/administrasi" passHref>
            <div
              className={`${
                router.pathname === "/peserta/administrasi"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/administrasi"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-survey-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Administrasi</div>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/peserta/test-substansi" passHref>
            <div
              className={`${
                router.pathname === "/peserta/test-substansi" ||
                router.pathname ===
                  "/peserta/test-substansi/panduan-substansi" ||
                router.pathname === "/peserta/done-substansi" ||
                router.pathname === "/peserta/done-mid-test" ||
                router.pathname === "/peserta/mid-test" ||
                router.pathname === "/peserta/mid-test/panduan-mid-test"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/test-substansi" ||
                    router.pathname ===
                      "/peserta/test-substansi/panduan-substansi" ||
                    router.pathname === "/peserta/done-substansi" ||
                    router.pathname === "/peserta/done-mid-test" ||
                    router.pathname === "/peserta/mid-test" ||
                    router.pathname === "/peserta/mid-test/panduan-mid-test"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-article-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Test Substansi</div>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/peserta/survey" passHref>
            <div
              className={`${
                router.pathname === "/peserta/survey"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/survey"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-chat-smile-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Survey</div>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/peserta/trivia" passHref>
            <div
              className={`${
                router.pathname === "/peserta/trivia"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/trivia"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-lightbulb-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>TRIVIA</div>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/peserta/riwayat-pelatihan" passHref>
            <div
              className={`${
                router.pathname === "/peserta/riwayat-pelatihan"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/riwayat-pelatihan"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-history-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Riwayat Pelatihan</div>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/peserta/bookmark" passHref>
            <div
              className={`${
                router.pathname === "/peserta/bookmark"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/bookmark"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-heart-3-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Favorit</div>
              </div>
            </div>
          </Link>
        </div>

        <div>
          <Link href="/peserta/artikel" passHref>
            <div
              className={`${
                router.pathname.includes("/peserta/artikel/edit") ||
                router.pathname === "/peserta/artikel" ||
                router.pathname === "/peserta/artikel/tambah"
                  ? styles.activeMenuItem
                  : styles.menuItem
              } d-flex flex-row`}
            >
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/artikel"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  } ri-bar-chart-horizontal-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Artikel</div>
              </div>
            </div>
          </Link>
        </div>

        <div
          className={dropSimonas ? styles.active : styles.subMenuTitle}
          onClick={(event) => handleDown(event)}
        >
          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <Image src={Simonas} alt="" className={styles.img} />
            </div>
            <div className="p-2">
              <div>SIMONAS</div>
            </div>
          </div>
        </div>
        <div
          className={dropBeasiswa ? styles.active : styles.subMenuTitle}
          onClick={(event) => handleDown(event)}
        >
          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <Image src={Beasiswa} alt="" className={styles.img} />
            </div>
            <div className="p-2">
              <div>Beasiswa</div>
            </div>
          </div>
        </div>
        <div className={styles.titleAkun}>{titleAkun}</div>
        <div className={accountFalse}>
          <Link href="/peserta/profile" passHref>
            <div
              className={
                router.pathname === "/peserta/profile"
                  ? styles.akunMenuActive
                  : styles.akunMenu
              }
              onClick={handleDropFalse}
            >
              <div className="d-flex flex-row">
                <div className="p-2">
                  <div
                    className={`${
                      router.pathname === "/peserta/profile"
                        ? styles.activeIconMenu
                        : styles.iconMenu
                    } ri-user-line`}
                  ></div>
                </div>
                <div className="p-2">
                  <div>Profile</div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <Link href="/peserta/pengaturan" passHref>
          <div className={styles.akunMenu}>
            <div className="d-flex flex-row">
              <div className="p-2">
                <div
                  className={`${
                    router.pathname === "/peserta/pengaturan"
                      ? styles.activeIconMenu
                      : styles.iconMenu
                  }  ri-settings-4-line`}
                ></div>
              </div>
              <div className="p-2">
                <div>Pengaturan</div>
              </div>
            </div>
          </div>
        </Link>

        <div
          className={styles.akunMenu}
          onClick={() => {
            signOut();
          }}
        >
          <div className="d-flex flex-row">
            <div className="p-2">
              <div
                className={` ${styles.iconMenu} ri-logout-circle-line`}
              ></div>
            </div>
            <div className="p-2">
              <div>Logout</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Sidebar;
