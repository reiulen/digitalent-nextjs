import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { signOut } from "next-auth/client";

import Image from "next/image";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import IconSearch from "../../../components/assets/icon/Search";
import IconLogin from "../../../components/assets/icon-dashboard-peserta/Login";
import IconRegister from "../../../components/assets/icon-dashboard-peserta/Register";

const Navigationbar = ({ session }) => {
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  const handlerLogout = () => {
    signOut();
  };

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow header-dashboard"
        sticky="top"
      >
        <Navbar.Brand href="/">
          <Image
            src={`/assets/icon/mainlogo.svg`}
            width={50}
            height={50}
            alt="brand-navbar"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto dropdown-explore">
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="navdropdown-child"
            >
              <NavDropdown.Item
                href="#action/3.1"
                className="navdropdown-child"
              >
                Beranda
              </NavDropdown.Item>
              <div className="btn-group dropright">
                <button
                  type="button"
                  className="btn btn-white-navbar"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="row">
                    <div className="col-9 text-left">Pelatihan</div>
                    <div className="col-1 text-right">
                      <i className="ri-arrow-right-s-line text-dark ml-1"> </i>
                    </div>
                  </div>
                </button>
                <div className="dropdown-menu ml-3">
                  <a className="dropdown-item navdropdown-child" href="#">
                    VSGA
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    FGA
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    PRO
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    TA
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    GTA
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    DEA
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    TSA
                  </a>
                </div>
              </div>
              <div className="btn-group dropright">
                <button
                  type="button"
                  className="btn btn-white-navbar dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Pusat Informasi
                </button>
                <div className="dropdown-menu ml-3">
                  <a className="dropdown-item navdropdown-child" href="#">
                    Panduan Test Substansi
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    Hak dan Kewajiban
                  </a>
                </div>
              </div>
              <NavDropdown.Item
                href="#action/3.4"
                className="navdropdown-child"
              >
                Tentang Kami
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.4"
                className="navdropdown-child"
              >
                Penyelenggara
              </NavDropdown.Item>
              <div className="btn-group dropright">
                <button
                  type="button"
                  className="btn btn-white-navbar"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="row">
                    <div className="col-9 text-left">Rilis Media</div>
                    <div className="col-1 text-right">
                      <i className="ri-arrow-right-s-line text-dark"> </i>
                    </div>
                  </div>
                </button>
                <div className="dropdown-menu ml-3">
                  <a className="dropdown-item navdropdown-child" href="#">
                    Berita
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    Artikel
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    Galeri
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    Video
                  </a>
                </div>
              </div>
              <NavDropdown.Item
                href="#action/3.4"
                className="navdropdown-child"
              >
                FAQ
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.4"
                className="navdropdown-child"
              >
                Kontak
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="w-100 mx-5">
            <div className="position-relative w-100">
              <FormControl
                type="search"
                placeholder="Search"
                className="pl-10 rounded-full"
                aria-label="Search"
              />
              <IconSearch
                className="left-center-absolute"
                style={{ left: "10px" }}
              />
            </div>
          </Form>
          <Nav>
<<<<<<< HEAD
            <Link href="/login">
              <a>
                <button className="btn btn-sm btn-login-peserta">
                  <IconLogin className="mr-2" />
                  Masuk
                </button>
              </a>
            </Link>
            <Link href="/register">
              <a>
                <button className="btn btn-register-peserta btn-sm">
                  <IconRegister className="mr-2" />
                  Daftar
                </button>
              </a>
            </Link>
=======
            {session ? (
              <button
                className="btn btn-sm btn-login-peserta"
                onClick={() => handlerLogout()}
              >
                <IconLogin className="mr-2" />
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <a>
                    <button className="btn btn-sm btn-login-peserta">
                      <IconLogin className="mr-2" />
                      Masuk
                    </button>
                  </a>
                </Link>
                <Link href="/register">
                  <a>
                    <button className="btn btn-register-peserta btn-sm">
                      <IconRegister className="mr-2" />
                      Daftar
                    </button>
                  </a>
                </Link>
              </>
            )}
>>>>>>> 807b4a7de637fc677572fdc6da5861f3727a8ddd
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { signOut } from "next-auth/client";
// import { useDispatch, useSelector } from "react-redux";
// import Link from "next/link";

// import Image from "next/image";

// import {
//   Navbar,
//   Container,
//   Nav,
//   NavDropdown,
//   Button,
//   Form,
//   FormControl,
//   Dropdown,
// } from "react-bootstrap";

// const NavbarComponent = ({ session }) => {
//   const { error: errorDataPribadi, dataPribadi } = useSelector(
//     (state) => state.getDataPribadi
//   );

//   console.log(dataPribadi);
//   const handlerLogout = () => {
//     signOut({
//       callbackUrl: `${window.location.origin}/login`,
//     });
//   };

//   return (
//     <>
//       <Navbar bg="white" expand="lg" className="shadow" sticky="top">
//         <Container>
//           <Navbar.Brand href="/">
//             <Image
//               src={`/assets/icon/mainlogo.svg`}
//               width={50}
//               height={50}
//               alt="brand-navbar"
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <NavDropdown
//                 title="Explore"
//                 id="basic-nav-dropdown"
//                 className="navdropdown-child"
//               >
//                 <NavDropdown.Item
//                   href="#action/3.1"
//                   className="navdropdown-child"
//                 >
//                   Beranda
//                 </NavDropdown.Item>
//                 <div className="btn-group dropright">
//                   <button
//                     type="button"
//                     className="btn btn-white-navbar"
//                     data-toggle="dropdown"
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                   >
//                     <div className="row">
//                       <div className="col-9 text-left">Pelatihan</div>
//                       <div className="col-1 text-right">
//                         <i className="ri-arrow-right-s-line text-dark ml-1">
//                           {" "}
//                         </i>
//                       </div>
//                     </div>
//                   </button>
//                   <div className="dropdown-menu ml-3">
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       VSGA
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       FGA
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       PRO
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       TA
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       GTA
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       DEA
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       TSA
//                     </a>
//                   </div>
//                 </div>
//                 <div className="btn-group dropright">
//                   <button
//                     type="button"
//                     className="btn btn-white-navbar dropdown-toggle"
//                     data-toggle="dropdown"
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                   >
//                     Pusat Informasi
//                   </button>
//                   <div className="dropdown-menu ml-3">
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       Panduan Test Substansi
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       Hak dan Kewajiban
//                     </a>
//                   </div>
//                 </div>
//                 <NavDropdown.Item
//                   href="#action/3.4"
//                   className="navdropdown-child"
//                 >
//                   Tentang Kami
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   href="#action/3.4"
//                   className="navdropdown-child"
//                 >
//                   Penyelenggara
//                 </NavDropdown.Item>
//                 <div className="btn-group dropright">
//                   <button
//                     type="button"
//                     className="btn btn-white-navbar"
//                     data-toggle="dropdown"
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                   >
//                     <div className="row">
//                       <div className="col-9 text-left">Rilis Media</div>
//                       <div className="col-1 text-right">
//                         <i className="ri-arrow-right-s-line text-dark"> </i>
//                       </div>
//                     </div>
//                   </button>
//                   <div className="dropdown-menu ml-3">
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       Berita
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       Artikel
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       Galeri
//                     </a>
//                     <a className="dropdown-item navdropdown-child" href="#">
//                       Video
//                     </a>
//                   </div>
//                 </div>
//                 <NavDropdown.Item
//                   href="#action/3.4"
//                   className="navdropdown-child"
//                 >
//                   FAQ
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   href="#action/3.4"
//                   className="navdropdown-child"
//                 >
//                   Kontak
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//             <Form className="d-flex col-9">
//               <FormControl
//                 type="search"
//                 placeholder="Search"
//                 className="mr-2"
//                 aria-label="Search"
//               />
//             </Form>
//             <Nav>
//               <Nav.Link href="#" className="mr-3">
//                 <i className="ri-heart-fill"></i>
//               </Nav.Link>
//               <Nav.Link href="#" className="mr-3">
//                 <i className="ri-notification-2-fill"></i>
//               </Nav.Link>
//               <NavDropdown
//                 title={`${
//                   dataPribadi ? dataPribadi.name.split(" ")[0] || "-" : "-"
//                 }`}
//                 id="basic-nav-dropdown"
//                 className="font-weight-bolder mb-0 pb-0"
//               >
//                 <Link href="/peserta" passHref>
//                   <NavDropdown.Item href="#" className="navdropdown-child">
//                     Dashboard
//                   </NavDropdown.Item>
//                 </Link>
//                 <Link href="/peserta/profile" passHref>
//                   <NavDropdown.Item href="#" className="navdropdown-child">
//                     Profile
//                   </NavDropdown.Item>
//                 </Link>
//                 <Link href="/peserta/pelatihan" passHref>
//                   <NavDropdown.Item href="#" className="navdropdown-child">
//                     Pelatihan
//                   </NavDropdown.Item>
//                 </Link>
//                 <NavDropdown.Item href="#" className="navdropdown-child">
//                   Artikel
//                 </NavDropdown.Item>
//                 <NavDropdown.Item href="#" className="navdropdown-child">
//                   Pengaturan
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   href="#"
//                   className="navdropdown-child"
//                   onClick={() => handlerLogout()}
//                 >
//                   Keluar
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default NavbarComponent;
