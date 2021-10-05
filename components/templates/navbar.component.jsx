import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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
    Dropdown 
} from "react-bootstrap";

const Navigationbar = () => {
    return (
        <>
           <Navbar bg="white" expand="lg">
                <Container>
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
                        <Nav className="me-auto">
                            <NavDropdown title="Explore" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Beranda</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.2">Pelatihan</NavDropdown.Item> */}
                                {/* <DropdownButton
                                    drop='end'
                                    title="Pelatihan"
                                    variant="white"
                                > 
                                    <Dropdown.Item eventKey="1">VSGA</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">FGA</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">PRO</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">TA</Dropdown.Item>
                                    <Dropdown.Item eventKey="5">GTA</Dropdown.Item>
                                    <Dropdown.Item eventKey="6">DEA</Dropdown.Item>
                                    <Dropdown.Item eventKey="7">TSA</Dropdown.Item>
                                </DropdownButton> */}
                                <div className="btn-group dropright">
                                    <button type="button" className="btn btn-white dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Pelatihan
                                    </button>
                                    <div className="dropdown-menu ml-5">
                                        <a className="dropdown-item" href="#">VSGA</a>
                                        <a className="dropdown-item" href="#">FGA</a>
                                        <a className="dropdown-item" href="#">PRO</a>
                                        <a className="dropdown-item" href="#">TA</a>
                                        <a className="dropdown-item" href="#">GTA</a>
                                        <a className="dropdown-item" href="#">DEA</a>
                                        <a className="dropdown-item" href="#">TSA</a>
                                    </div>
                                </div>
                                <NavDropdown.Item href="#action/3.3">Pusat Informasi</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Tentang Kami</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Penyelenggara</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Rilis Media</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">FAQ</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Kontak</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex col-10">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            {/* <Button variant="outline-success">Search</Button> */}
                        </Form>
                        <Nav>
                            <a href="#daftar">
                                {/* <Button className="btn btn-primary rounded-pill ">
                                    Daftar
                                </Button> */}
                                <button className="btn btn-primary-rounded-full rounded-pill btn-sm">
                                    Daftar
                                </button>
                            </a>
                            <a href="/login">
                                {/* <Button className="btn btn-white rounded-pill ">
                                    Masuk
                                </Button> */}
                                <button className="btn btn-outline-primary-rounded-full rounded-pill btn-sm ml-3">
                                    Masuk
                                </button>
                            </a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            {/* <a href="/login">
                <button className="btn btn-primary-rounded-full rounded-pill btn-sm">
                    Login
                </button>
            </a> */}
            
        </>
    )
}

export default Navigationbar