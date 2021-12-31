import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const DashboardHeader = ({ funcFilterYear, path = "" }) => {
  const router = useRouter();
  const year = ["2021", "2020", "2019", "2018", "2017", "2016"];
  return (
    <div className="d-flex justify-content-between flex-wrap">
      <h2 className="title-section-dashboard d-flex">
        {router.pathname !== "/pelatihan/dashboard" && (
          <div
            className="ri-arrow-left-s-line mr-3"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          ></div>
        )}
        Dashboard {path}
      </h2>
      <button className="btn btn-outline-primary-dashboard px-8">
        <div className="d-flex flex-wrap align-items-center">
          <p className="mt-4 mr-3 text-dashboard-neutral">Pilih Tahun:</p>
          <select
            className="border-0 p-0 background-transparent"
            onChange={(e) => funcFilterYear(e.target.value)}
          >
            {year &&
              year.map((row, i) => (
                <option key={i} value={row}>
                  {row}
                </option>
              ))}
          </select>
        </div>
      </button>
    </div>
  );
};

export default DashboardHeader;
