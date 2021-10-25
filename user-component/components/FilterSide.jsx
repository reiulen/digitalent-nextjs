import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { TagsInput } from "react-tag-input-component";

import { 
    Dropdown,
    Col,
    Form,
    InputGroup,
    FormControl
} from "react-bootstrap";

const FilterSide = () => {
    return (
        <div className="bg-white rounded border">
            <div className="row d-flex align-items-center">
                <div className="p-3 ml-3">
                    <Image 
                        src={`/assets/media/logo-filter.svg`}
                        width={40}
                        height={40}
                    />
                </div>
                
                <div className="font-weight-bolder">
                    Filter
                </div>
            </div>

            <div className="my-5 p-3">
                <div className="font-weight-bolder">
                    Penyelenggara
                </div>
                <Dropdown>
                    <Dropdown.Toggle variant="white" id="dropdown-basic" className="border rounded">
                        Semua Penyelenggara
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Gojek</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Bukalapak</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Tokopedia</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Google</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Facebook</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Apple</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="my-5 p-3">
                <div className="font-weight-bolder">
                    Kategori Peserta
                </div>
                <Dropdown>
                    <Dropdown.Toggle variant="white" id="dropdown-basic" className="border rounded">
                        Peserta Umum
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Peserta Umum</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Peserta Khusus</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="my-5 p-3">
                <div className="font-weight-bolder">
                    Kata Kunci
                </div>
                <TagsInput 
                    placeHolder="Contoh Java"
                    seprators={["Enter", "Tab"]}
                />
            </div>

            <div className="my-5 p-3">
                <div className="font-weight-bolder">
                    Tanggal Mulai Pelaksanaan
                </div>
                <div>
                    <DatePicker
                        className="form-search-date form-control-sm form-control"
                        // selected={startDate}
                        // onChange={(date) => handleStartDate(date)}
                        selectsStart
                        // startDate={startDate}
                        // endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd-mm-yy"
                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                        // minDate={moment().toDate()}
                        // minDate={addDays(new Date(), 20)}
                    />
                </div>
                
            </div>

            <div className="my-5 p-3">
                <div className="font-weight-bolder">
                    Tanggal Akhir Pelaksanaan
                </div>
                <div>
                    <DatePicker
                        className="form-search-date form-control-sm form-control"
                        // selected={startDate}
                        // onChange={(date) => handleStartDate(date)}
                        selectsStart
                        // startDate={startDate}
                        // endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd-mm-yy"
                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                        // minDate={moment().toDate()}
                        // minDate={addDays(new Date(), 20)}
                    />
                </div>
                
            </div>

            <div className="my-5 p-3">
                <div className="row d-flex justify-content-around">
                    <button className="btn btn-white-ghost-rounded-full">
                        Reset Filter
                    </button>

                    <button className="btn btn-primary rounded-pill">
                        Tampilkan
                    </button>
                </div>
            </div>

            
        </div>
    )
}

export default FilterSide