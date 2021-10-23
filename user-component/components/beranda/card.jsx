import React from "react";
import { Badge } from "react-bootstrap";
import IconTime from "../../../components/assets/icon-dashboard-peserta/Time";
import IconPeserta from "../../../components/assets/icon-dashboard-peserta/Time";

export default function card({children,label, button, thumbnail}) {
  return (
    <div className="cards-items shadow">
      <div className="top">
        <div className="row d-flex justify-content-between">
          <Badge bg="light">
            <div className="font-weight-bolder">
              {label}
            </div>
          </Badge>
          <div 
            // style={{zIndex:"1", position:"relative"}}
          >
            {button}
          </div>
        </div>
        
      </div>

      <div className="rounded">
        {thumbnail}
      </div>

      <div className="bottom">
        {children}
      </div>
    </div>
  );
}
