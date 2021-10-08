import React from "react";
import { 
    Dropdown,
    Col,
    Form,
    InputGroup,
    FormControl
} from "react-bootstrap";

import { TagsInput } from "react-tag-input-component";

const FilterBar = () => {
    return(
        <div className="row mt-3 ml-1 p-3 bg-white rounded d-flex align-items-center">
            <Dropdown className="border rounded">
                <Dropdown.Toggle variant="white" id="dropdown-basic">
                    VSGA
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">VSGA</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">FGA</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">PRO</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">TA</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">GTA</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">DEA</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">TSA</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div className="col-5 bg-white mr-1">
                <TagsInput 
                    className="bg-white"
                />
            </div>
            
            <div className="col-2">
               
                {/* <InputGroup className="mb-2 pt-2">
                    <InputGroup.Text className="col-2 bg-white text-center">
                        <i className="ri-map-pin-line "></i>
                    </InputGroup.Text>
                    <FormControl id="inlineFormInputGroup" placeholder="Jakarta Barat" className="col-6"/>
                </InputGroup> */}
                <div>
                    <div className="input-group mb-2 pt-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-white">
                                <i className="ri-map-pin-line mr-2"></i>
                            </div>
                        </div>
                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Jakarta Barat" />
                    </div>
                </div>
            </div>

            <div className="col-3">
                
                {/* <InputGroup className="mb-2 pt-2">
                    <InputGroup.Text className="col-2 bg-white text-center">
                        <i className="ri-briefcase-4-line "></i>
                    </InputGroup.Text>
                    <FormControl id="inlineFormInputGroup" placeholder="Tipe Pelatihan" className="col-7"/>
                </InputGroup> */}

                <div>   
                    <div className="input-group mb-2 pt-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-white">
                                <i className="ri-briefcase-4-line mr-2"></i>
                            </div>
                        </div>
                        <input type="text" className="form-control col-6" id="inlineFormInputGroup" placeholder="Tipe Pelatihan" />
                    </div>
                </div>
                
            </div>

            <div>
                <button className="btn btn-primary-rounded-full">
                    <i className="ri-search-line mr-2"></i>
                    Search
                </button>
            </div>
            
            
        </div>
    )
}

export default FilterBar