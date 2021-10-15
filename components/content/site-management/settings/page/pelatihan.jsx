import React from 'react'
import Link from "next/link";
import Image from "next/image";

// import Prompt from '../../'
import PageWrapper from "../../../../wrapper/page.wrapper";

export default function pelatihan() {

    const active = {
        backgroundColor: "#ECF5FC", marginBottom: "8px", borderRadius: "5px"
    }

    const nonActive = {
        color: "#6C6C6C",
        fontWeight: "normal"
    }

    return (
        <PageWrapper>
            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-body pt-0">
                        <div className="table-filter">
                            <div className="row align-items-center">
                                <div className="border-right">
                                    <div className="col pelatihan-click" style={{ marginTop: "32px" }}>
                                        <Link href="/site-management/setting/pelatihan" passHref>
                                            <a>
                                                <div className="d-flex align-items-center active">

                                                    <Image src={"/assets/icon/sitemanagement/Prompt.svg"} width={24} height={24} alt="Prompt Icon" />
                                                    <h3>Prompt Update</h3>

                                                </div>
                                            </a>

                                        </Link>
                                        <Link href="/site-management/setting/pelatihan" passHref>
                                            <a>
                                                <div className="d-flex align-items-center prompt">

                                                    <Image src={"/assets/icon/sitemanagement/Email.svg"} width={24} height={24} alt="Prompt Icon" />
                                                    <h3>Template Email</h3>

                                                </div>
                                            </a>

                                        </Link>
                                        <Link href="/site-management/setting/pelatihan" passHref>
                                            <a>
                                                <div className="d-flex align-items-center prompt">

                                                    <Image src={"/assets/icon/sitemanagement/SUBM.svg"} width={24} height={24} alt="Prompt Icon" />
                                                    <h3>SUBM</h3>

                                                </div>
                                            </a>

                                        </Link>
                                        <Link href="/site-management/setting/pelatihan" passHref>
                                            <a>
                                                <div className="d-flex align-items-center prompt">

                                                    <Image src={"/assets/icon/sitemanagement/FileSize.svg"} width={24} height={24} alt="Prompt Icon" />
                                                    <h3>File Size</h3>

                                                </div>
                                            </a>

                                        </Link>
                                        <Link href="/site-management/setting/pelatihan" passHref>
                                            <a>
                                                <div className="d-flex align-items-center prompt">

                                                    <Image src={"/assets/icon/sitemanagement/Ketentuan.svg"} width={24} height={24} alt="Prompt Icon" />
                                                    <h3>Ketentuan Pelatihan</h3>

                                                </div>
                                            </a>

                                        </Link>
                                    </div>
                                </div>

                                <div className="col">
                                    <h1>halo</h1>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                                        <label className ="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
