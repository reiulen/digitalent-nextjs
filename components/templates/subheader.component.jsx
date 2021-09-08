import React, { useEffect, useState } from "react";
// import { Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

const convertBreadcrumb = (string) => {
  return (
    ` ${string.charAt(0).toUpperCase() + string.slice(1).split("?")[0]} /`
    // string.charAt(0).toUpperCase() + string.slice(1).concat("/").split("?")[0]
  );
};

const SubHeader = () => {
  const router = useRouter();

  const days = new Date().toLocaleTimeString("in-ID", { weekday: "long" });
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.splice(0, 2);
      // linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      console.log(pathArray);
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
            {breadcrumbs.map((breadcrumb, i) => {
              return (
                <Link href={breadcrumb.href} key={i}>
                  <a>
                    <p className="text-default mt-2 mb-2">
                      {/* {
                        (convertBreadcrumb(breadcrumb.breadcrumb))
                      } */}

                      {
                        (i == (breadcrumbs.length - 1)) ?
                          (convertBreadcrumb(breadcrumb.breadcrumb)).slice(0, -1)
                        :
                          (convertBreadcrumb(breadcrumb.breadcrumb))
                      } 
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
              {days}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
