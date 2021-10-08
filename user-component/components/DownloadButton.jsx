import React from "react";

const DownloadButton = () => {
    return (
        <div className="bg-white rounded text-center">
            <div>
                <h3 className="font-weight-bolder pt-5">
                    Silabus / Kurikulum Pelatihan
                </h3>

                <button className="btn btn-light my-5">
                    <i className="ri-download-cloud-fill"></i>
                    <span>Unduh Silabus/Kurikulum</span>
                </button>
            </div>
        </div>
    )
}

export default DownloadButton