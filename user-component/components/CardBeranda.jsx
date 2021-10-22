import React, {useState, useEffect } from 'react'

import Link from "next/link";
import Image from "next/image";

import { 
  Card,
  Button,
  Badge
} from "react-bootstrap";

// import IconTime from "../../public/assets/icon/icon-dashboard-peserta/Time"
// import IconPeserta from "../../public/assets/icon/icon-dashboard-peserta/Peserta"

const CardBeranda = ({tema, pelatihan, activeAcademy}) => {
  const [show,setShow] = useState(null)

  useEffect(() => {
    handleHoverCard()
  },[])

  const handleHoverCard = () => {
    let arr = []

    if (tema.length !== 0 && pelatihan.length !== 0){
        for (let i = 0; i < tema.length; i++){
            let obj = {
                id: tema[i].id,
                name: tema[i].Name,
                pelatihan: []
            }

            for (let j = 0; j < pelatihan.length; j++){
                let objPelatihan = {
                    id: pelatihan[j].id,
                    name: pelatihan[j].name,
                    hover: false,
                    showDetail: false
                }

                obj.pelatihan.push (objPelatihan)
            }
            arr.push (obj)
        }
        setShow(arr)
    }
}

const handleMouseEnter = (indexTema, indexPelatihan) =>{
  let obj = show
  // console.log (obj)
  // console.log (indexTema)
  // console.log (indexPelatihan)

  for (let i = 0; i < obj.length; i++){
      for (let j = 0; j < obj[i].pelatihan.length; j++){
          if ( i === indexTema && j === indexPelatihan){
              obj[i].pelatihan[j].hover = true
              console.log ('check 1')
              console.log (obj[i].pelatihan[j].hover)
          }
      }
      setShow(obj)
      // console.log (obj)
  }
  // setShow(obj)
  console.log ("mouseOver")
}

const handleMouseLeave = (indexTema, indexPelatihan) =>{
  let obj = show
  // console.log (obj)
  // console.log (indexTema)
  // console.log (indexPelatihan)

  for (let i = 0; i < obj.length; i++){
      for (let j = 0; j < obj[i].pelatihan.length; j++){
          if ( i === indexTema && j === indexPelatihan){
              obj[i].pelatihan[j].hover = false
              console.log ('check 2')
              console.log (obj[i].pelatihan[j].hover)
          }
      }
      setShow(obj)
      // console.log (obj)
  }
  // setShow(obj)
  console.log ("mouseOut")
}

  return (
    <div>
      {
        console.log (tema)
      }

      {
        console.log (pelatihan)
      }

      {
        console.log (show)
      }

      {/* Tema */}
      {
          tema  && pelatihan && show ?
              
              tema.map ((el, i) => {
                  return (
                      <div key={i} > 
                          <div className="my-5 mx-5 row d-flex justify-content-between">
                              <div>
                                  <h1 className="font-weight-bolder">
                                      {el.Name}
                                  </h1>
                              </div>
                              <div className="text-primary">
                                  <Link href="#">
                                      <div className="font-weight-bolder d-flex justify-content-center" style={{cursor:"pointer"}}>
                                          <span className="mt-1">
                                              Lihat Semua
                                          </span>  
                                          <i className="ri-arrow-right-s-line text-primary"></i> 
                                      </div>
                                  </Link>
                              </div>
                          </div>
                          <div className="row d-flex justify-content-around mx-5 px-5">
                              {
                                  
                                  pelatihan.map ((row, ind) => {
                                      console.log ("test1")
                                      // console.log ("render ulang")
                                      return (
                                          show[i].pelatihan[ind].showDetail === false ?
                                              <Card style={{ width: '30rem' }} className="shadow" key={ind} onMouseEnter={() => handleMouseEnter(i, ind)} onMouseLeave={() => handleMouseLeave(i, ind)}>

                                                  <div className="col-12 mt-3 d-flex flex-row  justify-content-between" style={{position:"absolute"}}>
                                                      <Badge bg="light">
                                                          <div className="text-info mt-2">
                                                              Pelatihan {row.metode_pelatihan}
                                                          </div>
                                                      </Badge>

                                                      {
                                                          show[i].pelatihan[ind].hover === true ?
                                                              <div>
                                                                  <Button className="btn btn-white py-1 pl-2 pr-1 rounded-circle mr-2">
                                                                      <i className="ri-share-line" />
                                                                  </Button>
                                                                  <Button className="btn btn-white py-1 pl-2 pr-1 mr-2 rounded-circle">
                                                                      <i className="ri-heart-line" />
                                                                  </Button>
                                                              </div>
                                                          :
                                                              <div>
                                                                  <h1 className="text-white">Fail</h1>
                                                              </div>
                                                      }

                                                      {
                                                          console.log (show[i].pelatihan[ind].hover)
                                                      }
                                                      
                                                  </div>
                                                  
                                                  <div>
                                                      <Card.Img 
                                                          variant="top"  
                                                          src={`https://dts-beasiswa-dev.s3-ap-southeast-1.amazonaws.com/${row.gambar}`} 
                                                      />
                                                  </div>

                                                  <div className="ml-2 " style={{position:"absolute", marginTop:"28vh"}}>
                                                      <Image 
                                                          src={`/assets/media/Frame_6523.svg`}
                                                          width="50vh"
                                                          height="50vh"
                                                          className="rounded"
                                                      />
                                                  </div>

                                                  <div className="row d-flex justify-content-between mx-5 mt-3">
                                                      <div style={{marginLeft:"7vh"}}>
                                                          {row.mitra}
                                                      </div>
                                                      <Badge bg="light">
                                                          <div className="text-danger mt-1">
                                                              {row.status}
                                                          </div>
                                                      </Badge>
                                                  </div>

                                                  <Card.Body>
                                                      
                                                      <div>
                                                          <h4>{row.name}</h4>
                                                      </div>

                                                      <div className="text-muted">
                                                          {
                                                              activeAcademy
                                                          }
                                                      </div>

                                                      <div 
                                                          className="row my-3" 
                                                          style={{height:"2px", backgroundColor:"#ADB5BD"}}
                                                      >
                                                      </div>

                                                      <div className="d-flex align-content-center">
                                                          <i className="ri-time-line mr-2"></i>
                                                          <span className="mt-1">Registrasi: {new Date (row.pendaftaran_mulai).toLocaleDateString("en-GB")} - {new Date (row.pendaftaran_selesai).toLocaleDateString("en-GB")}</span>
                                                      </div>
                                                      <div className="d-flex align-content-center">
                                                          <i className="ri-group-line mr-2"></i>
                                                          <span className="mt-1">Kuota {row.kuota_peserta} Peserta</span>
                                                      </div>
                                                  </Card.Body>
                                              </Card>
                                          :
                                              null
                                      )
                                  })
                              }
                          </div>
                      </div>
                      
                  )
              })
              
              
          :
              null
      }
    </div>


    // <div className="cards-items">
    //   <div className="top">
    //     <label>PELATIHAN ONLINE</label>
    //   </div>
    //   <div className="rounded"></div>

    //   <div className="bottom">
    //     <div className="rounded"></div>
    //     <div className="d-flex align-items-center justify-content-between pl-24">
    //       <p className="fw-600" style={{ color: "#6C6C6C" }}>
    //         Gojek
    //       </p>
    //       <button className="btn btn-green-rounded">OPEN</button>
    //     </div>
    //     <h1
    //       className="fz-18 fw-600 mt-4"
    //       style={{ color: "#1F1F1F" }}
    //     >
    //       Intermediate Multimedia Designer
    //     </h1>
    //     <h3
    //       className="mb-0 fz-18 fw-400 mt-4"
    //       style={{ color: "#6C6C6C" }}
    //     >
    //       Vocational School Graduate Academy
    //     </h3>
    //     <hr />

    //     {/* regis and kuota */}
    //     <div className="mt-2">
    //       <div className="d-flex align-items-center">
    //         <IconTime className="mr-2" />
    //         Registrasi: 05 Juli 2021 - 21 Juli 2021
    //       </div>
    //       <div className="d-flex align-items-center mt-2">
    //         <IconPeserta className="mr-2" />
    //         Kuota: 1000 Peserta
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default CardBeranda