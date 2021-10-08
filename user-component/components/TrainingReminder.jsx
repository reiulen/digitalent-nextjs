import React from "react";

const TrainingReminder = () => {
   return (
       <div className="bg-primary text-white my-5 rounded">
           <div className="p-5">
                <h3>
                    Buat Pengingat Pelatihan
                </h3>
                <p>
                        Buat Pengingat Pelatihan Sekarang juga.
                        Jangan Sampai Ketinggalan Informasi Terbaru.
                </p>
                <div>
                    <input 
                            type="text" 
                            placeholder="Cari Tema"
                            className="form-control col-12"
                        />
                </div>
                
                    <button className="btn btn-primary my-5">
                        Buat Pengingat Pelatihan
                    </button>
           </div>
        </div>
   ) 
}

export default TrainingReminder