import React from "react";
import IconTime from "../../../components/assets/icon-dashboard-peserta/Time";
import IconPeserta from "../../../components/assets/icon-dashboard-peserta/Time";

export default function card({children,label, button, thumbnail}) {
  return (
    <div className="cards-items shadow">
      <div className="top">
        <div className="row d-flex justify-content-between">
          <div>
            {label}
          </div>
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
