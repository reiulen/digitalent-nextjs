// import "react-pro-sidebar/dist/css/styles.css";
import Logo from "/public/assets/logo/mainlogo.png";
import Simonas from "/public/assets/logo/image 10.png";
import Beasiswa from "/public/assets/logo/Logo besiswa fix  3.png";
import Image from "next/dist/client/image";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/client";

const Sidebar = () => {
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

  return (
    <>
      <div className={styles.titlePlatform}>PLATFORM</div>
      <div
        className={drop ? styles.active : styles.subMenuTitle}
        onClick={(event) => handleDown(event)}
      >
        <div className="d-flex flex-row">
          <div className="p-2">
            <Image
              src={Logo}
              alt=""
              className={styles.img}
              onClick={(event) => handleDown(event)}
            />
          </div>
          <div className="p-2">
            <td>Digital Talent Schoolarship</td>
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
              <i
                className={`${
                  router.pathname === "/peserta"
                    ? styles.activeIconMenu
                    : styles.iconMenu
                } ri-pie-chart-line`}
              ></i>
            </div>
            <div className="p-2">
              <td>Dashboard</td>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/peserta/administrasi" passHref>
          <div className={`${styles.menuItem} d-flex flex-row`}>
            <div className="p-2">
              <i className={`${styles.iconMenu} ri-survey-line`}></i>
            </div>
            <div className="p-2">
              <td>Administrasi</td>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/peserta/test-substansi" passHref>
          <div
            className={`${
              router.pathname === "/peserta/test-substansi" ||
              router.pathname === "/peserta/test-substansi/panduan-substansi" ||
              router.pathname === "/peserta/done-substansi" ||
              router.pathname === "/peserta/done-mid-test" ||
              router.pathname === "/peserta/mid-test" ||
              router.pathname === "/peserta/mid-test/panduan-mid-test"
                ? styles.activeMenuItem
                : styles.menuItem
            } d-flex flex-row`}
          >
            <div className="p-2">
              <i
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
              ></i>
            </div>
            <div className="p-2">
              <td>Test Substansi</td>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/peserta/survey" passHref>
          <div
            className={`${
              router.pathname === "/peserta/survey" ||
              router.pathname === "/peserta/done-survey"
                ? styles.activeMenuItem
                : styles.menuItem
            } d-flex flex-row`}
          >
            <div className="p-2">
              <i
                className={`${
                  router.pathname === "/peserta/survey" ||
                  router.pathname === "/peserta/done-survey"
                    ? styles.activeIconMenu
                    : styles.iconMenu
                } ri-chat-smile-line`}
              ></i>
            </div>
            <div className="p-2">
              <td>Survey</td>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/peserta/trivia" passHref>
          <div
            className={`${
              router.pathname === "/peserta/trivia" ||
              router.pathname === "/peserta/done-trivia"
                ? styles.activeMenuItem
                : styles.menuItem
            } d-flex flex-row`}
          >
            <div className="p-2">
              <i
                className={`${
                  router.pathname === "/peserta/trivia" ||
                  router.pathname === "/peserta/done-trivia"
                    ? styles.activeIconMenu
                    : styles.iconMenu
                } ri-lightbulb-line`}
              ></i>
            </div>
            <div className="p-2">
              <td>TRIVIA</td>
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
              <i
                className={`${
                  router.pathname === "/peserta/riwayat-pelatihan"
                    ? styles.activeIconMenu
                    : styles.iconMenu
                } ri-history-line`}
              ></i>
            </div>
            <div className="p-2">
              <td>Riwayat Pelatihan</td>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <div
          className={`${
            router.pathname === "/peserta/bookmark"
              ? styles.activeMenuItem
              : styles.menuItem
          } d-flex flex-row`}
        >
          <div className="p-2">
            <i
              className={`${
                router.pathname === "/peserta/bookmark"
                  ? styles.activeIconMenu
                  : styles.iconMenu
              } ri-heart-3-line`}
            ></i>
          </div>
          <div className="p-2">
            <td>Bookmark</td>
          </div>
        </div>
      </div>

      <div>
        <div className={`${styles.menuItem} d-flex flex-row`}>
          <div className="p-2">
            <i className={`${styles.iconMenu} ri-menu-2-line`}></i>
          </div>
          <div className="p-2">
            <td>Artikel</td>
          </div>
        </div>
      </div>

      <div
        className={dropSimonas ? styles.active : styles.subMenuTitle}
        onClick={(event) => handleDown(event)}
      >
        <div className="d-flex flex-row">
          <div className="p-2">
            <Image src={Simonas} alt="" className={styles.img} />
          </div>
          <div className="p-2">
            <td>SIMONAS</td>
          </div>
        </div>
      </div>
      <div
        className={dropBeasiswa ? styles.active : styles.subMenuTitle}
        onClick={(event) => handleDown(event)}
      >
        <div className="d-flex flex-row">
          <div className="p-2">
            <Image src={Beasiswa} alt="" className={styles.img} />
          </div>
          <div className="p-2">
            <td>Beasiswa</td>
          </div>
        </div>
      </div>
      <div className={styles.titleAkun}>AKUN</div>
      <Link href="/peserta/profile" passHref>
        <div
          className={
            router.pathname === "/peserta/profile"
              ? styles.akunMenuActive
              : styles.akunMenu
          }
        >
          <div className="d-flex flex-row">
            <div className="p-2">
              <i
                className={`${
                  router.pathname === "/peserta/profile"
                    ? styles.activeIconMenu
                    : styles.iconMenu
                } ri-user-line`}
              ></i>
            </div>
            <div className="p-2">
              <td>Profile</td>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.akunMenu}>
        <div className="d-flex flex-row">
          <div className="p-2">
            <i className="ri-settings-4-line"></i>
          </div>
          <div className="p-2">
            <td>Pengaturan</td>
          </div>
        </div>
      </div>
      <div
        className={styles.akunMenu}
        onClick={() => {
          signOut();
        }}
      >
        <div className="d-flex flex-row">
          <div className="p-2">
            <i className="ri-logout-circle-line"></i>
          </div>
          <div className="p-2">
            <td>Logout</td>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
