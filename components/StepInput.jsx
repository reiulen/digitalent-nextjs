import React from 'react';

const StepInput = ({ step }) => {
    let step1 = "bg-light"
    let step2 = "bg-light"
    let step3 = "bg-light"
    if(step == 1){
        step1 = "bg-white"
    }else if(step == 2) {
        step2 = "bg-white"
    }else if(step == 3) {
        step3 = "bg-white"
    }
    return (
        <div className="col-12">
            <div className="row bg-secondary">
                <div className={`col-4 d-flex rounded-top ${ step1 }`}>
                    <div className="my-5 mx-3">
                        <h1 className="badge badge-primary h1">1</h1>
                    </div>
                    <div class="my-5">
                        <h5>Buat Soal</h5>
                        <p>Masukan Informasi Soal</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className={`d-flex rounded-top ${ step2 }`}>
                        <div className="my-5 mx-3">
                            <h1 className="badge badge-secondary h1">2</h1>
                        </div>
                        <div class="my-5">
                            <h5>Bank Soal</h5>
                            <p>Masukan Soal</p>
                        </div>
                    </div>
                </div>
                <div className={`col-4 d-flex rounded-top ${ step3 }`}>
                    <div className="my-5 mx-3">
                        <h1 className="badge badge-secondary h1">3</h1>
                    </div>
                    <div class="my-5">
                        <h5>Publish</h5>
                        <p>Tentukan Publishnya</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepInput