import React from "react";

export default function Index() {
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      data-backdrop="static"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="staticBackdrop"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-header">
      <h5 className="modal-title">title</h5>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <i aria-hidden="true" className="ki ki-close"></i>
      </button>
    </div>
          <div className="modal-body">
      <p>Modal body text goes here.</p>
    </div>
         <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        Close
      </button>

      <button type="button" className="btn btn-primary" data-dismiss="modal">
        Save changes
      </button>
    </div>
      </div>
    </div>
  );
}

// Index.defaultProps = {
//   header: (
    
//   ),
//   content: (
    
//   ),
//   footer: (
    
//   ),
// };
