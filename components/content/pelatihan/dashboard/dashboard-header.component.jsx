import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const DashboardHeader = ({ funcFilterYear, path = "" }) => {
  const router = useRouter();
  const [year, setYear] = useState([
    "Semua",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
  ]);

  useEffect(() => {
    const current = +moment().utc().format("YYYY");
    const arr = [];
    for (let i = 2017; i <= current; i++) {
      arr.push(i);
    }
    arr.push("Semua");
    arr.reverse();
    setYear(arr);
  }, []);

  return (
    <div
      className={`d-flex justify-content-${
        router.pathname != "/dashboard" ? "between" : "end"
      } flex-wrap`}
    >
      {router.pathname !== "/pelatihan/dashboard" ||
        (router.pathname != "/dashboard" && (
          <h2 className="title-section-dashboard d-flex">
            <div
              className="ri-arrow-left-s-line mr-3"
              onClick={() => router.back()}
              style={{ cursor: "pointer" }}
            ></div>
            Dashboard {path}
          </h2>
        ))}
      <a className="px-8 rounded-full" style={{ border: "1px solid #215480" }}>
        <div className="d-flex flex-wrap align-items-center">
          <p className="mt-4 mr-3 text-dashboard-neutral">Pilih Tahun:</p>
          <select
            className="border-0 p-0 background-transparent"
            onChange={(e) => funcFilterYear(e.target.value)}
          >
            {year &&
              year.map((row, i) => (
                <option key={i} value={row == "Semua" ? "" : row}>
                  {row}
                </option>
              ))}
          </select>
        </div>
      </a>
    </div>
  );
};

export default DashboardHeader;
