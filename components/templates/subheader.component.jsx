import React, { useEffect, useState } from "react";
// import { Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";
import "moment/locale/id";

const snakeToPascal = (string) => {
  return string
    .split("/")
    .map((snake) =>
      snake
        .split("-")
        .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
        .join(" ")
    )
    .join("/");
};

const convertBreadcrumb = (string) => {
  let newStr = snakeToPascal(string);
  let result = "";

  newStr = newStr.split("%20").join(" ");
  for (let i = 0; i < newStr.length; i++) {
    result = newStr.split("?")[0] + " /";
  }
  // return ` ${newStr.charAt(0).toUpperCase() + newStr.slice(1).split("?")[0]} /` ;
  // return ` ${string.charAt(0).toUpperCase() + string.slice(1).split("?")[0]} /` ;
  // string.charAt(0).toUpperCase() + string.slice(1).concat("/").split("?")[0]
  return result;
};

const SubHeader = () => {
  const router = useRouter();

  const days = new Date().toLocaleTimeString("in-ID", { weekday: "long" });
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  var date = new Date();

  var myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];

  useEffect(() => {
    time();
  });
  const [jam, setJam] = useState();
  const time = () => {
    var e = document.getElementById("jam"),
      d = new Date(),
      h,
      m,
      s;
    h = d.getHours();
    m = set(d.getMinutes());
    s = set(d.getSeconds());
    setJam(`${h}:${m}:${s}`);
    if (e) {
      e.innerHTML = h + ":" + m + ":" + s;
    }
    setTimeout(() => {
      time();
    }, 1000);
  };

  const set = (e) => {
    e = e < 10 ? "0" + e : e;
    return e;
  };

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      // linkPath.splice(0, 2);
      linkPath.shift();
      if (!isNaN(linkPath[linkPath.length - 1])) {
        linkPath.splice(linkPath.length - 1, 1);
      }
      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });
      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <>
      <div className="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
          <div className="d-flex align-items-center flex-wrap mr-2 bread-crumb">
            {breadcrumbs[0].breadcrumb.includes("subvit?page")
              ? breadcrumbs.map((breadcrumb, i) => {
                  return (
                    <Link href={breadcrumb.href} key={i}>
                      {/* <Link href="/" key={i}> */}
                      <a
                        style={{
                          cursor: i !== 1 ? "default" : "",
                          pointerEvents: i !== 1 ? "none" : "",
                        }}
                      >
                        <p className="text-default mt-2 mb-2">
                          &nbsp; Dashboard Subvit
                        </p>
                      </a>
                    </Link>
                  );
                })
              : breadcrumbs.map((breadcrumb, i) => {
                  return (
                    <Link href={breadcrumb.href} key={i}>
                      {/* <Link href="/" key={i}> */}
                      <a
                        style={{
                          cursor: i !== 1 ? "default" : "",
                          pointerEvents: i !== 1 ? "none" : "",
                        }}
                      >
                        <p className="text-default mt-2 mb-2">
                          &nbsp;
                          {/* {
                        (convertBreadcrumb(breadcrumb.breadcrumb))
                      } */}
                          {i !== 0
                            ? i == breadcrumbs.length - 1
                              ? decodeURIComponent(
                                  convertBreadcrumb(
                                    breadcrumb.breadcrumb
                                  ).slice(0, -1)
                                )
                              : decodeURIComponent(
                                  convertBreadcrumb(breadcrumb.breadcrumb)
                                )
                            : null}
                        </p>
                      </a>
                    </Link>
                  );
                })}
          </div>
          <div className="d-flex align-items-center">
            <i className="flaticon2-crisp-icons-1 mr-2"></i>
            <span
              className="text-muted font-size-base font-weight-bold mr-2"
              id="kt_dashboard_daterangepicker_title"
            >
              <div className="p-1">
                {thisDay} {moment().format("ll")}, <span id="jam">{jam}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
