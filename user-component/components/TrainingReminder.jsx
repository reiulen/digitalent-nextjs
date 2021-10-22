import React from "react";
import Image from "next/image";

const TrainingReminder = () => {
   return (
       <div className="my-5 rounded" style={{backgroundColor:"#E6F2FF"}}>
           <div className="p-5">
                <div className="row d-flex align-items-center">
                    <div className="p-3 ml-3">
                        <Image 
                            src={`/assets/media/logo-bell.svg`}
                            width={40}
                            height={40}
                        />
                    </div>
                    
                    <div className="font-weight-bolder text-dark">
                        <h4>
                            Buat Pengingat Pelatihan
                        </h4>
                    </div>
                </div>
                <p className="text-muted">
                        Buat Pengingat Pelatihan Sekarang juga.
                        Jangan Sampai Ketinggalan Informasi Terbaru.
                </p>
                <div className="row">
                    <input 
                        type="text" 
                        placeholder="Cari Tema"
                        className="form-control col-8 rounded-pill"
                    />
                    <div className="col-3 ml-2">
                        <button className="btn btn-primary rounded-pill">
                            Buat
                        </button>
                    </div>
                    
                </div>
                
                    
           </div>
        </div>
   ) 
}


export default TrainingReminder