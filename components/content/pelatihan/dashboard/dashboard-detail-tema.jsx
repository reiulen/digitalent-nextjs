import React, { useEffect } from "react";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardTotal from "../../dashboard-kabadan/component/card-total.component";
import TotalPerAkademi from "../../dashboard-kabadan/component/total-perakademi.component";
import DashboardHeader from "./dashboard-header.component";

import { helperHandlePercentage } from "../../../../utils/middleware/helper";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import LoadingDashboard from "../../dashboard-kabadan/component/loading-dashboard.component";

import {
  getDigitalentTotalPengguna,
  getDigitalentTotalDataPendaftar,
  getDetailAkademiPendaftar,
  getDetailAkademiPeserta,
} from "../../../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";

const DashboardDetailTema = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { akademi_id } = router.query;
  const token_permission = Cookies.get("token_permission");

  useEffect(() => {
    dispatch(getDigitalentTotalPengguna(token, token_permission));
    dispatch(getDigitalentTotalDataPendaftar(token, token_permission));
    dispatch(getDetailAkademiPendaftar(token, token_permission, akademi_id));
    dispatch(getDetailAkademiPeserta(token, token_permission, akademi_id));
  }, [dispatch]);

  const {
    loading: loadingAkademiPeserta,
    error: errorAkademiPeserta,
    akademiPeserta,
  } = useSelector((state) => state.detailAkademiPeserta);
  const {
    loading: loadingAkademiPendaftar,
    error: errorAkademiPendaftar,
    akademiPendaftar,
  } = useSelector((state) => state.detailAkademiPendaftar);

  return (
    <PageWrapper>
      <section className="opening-hello">
        <DashboardHeader
          funcFilterYear={(value) => {
            dispatch(
              getDetailAkademiPendaftar(
                token,
                token_permission,
                akademi_id,
                value
              )
            );
            dispatch(
              getDetailAkademiPeserta(
                token,
                token_permission,
                akademi_id,
                value
              )
            );
          }}
          path={akademi_id}
        />
      </section>
      <section className="total-pengguna mt-10">
        <h2 className="title-section-dashboard-mini">
          total peserta {akademi_id}
        </h2>
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar"}
              value={akademiPeserta?.pendaftar?.total}
              statisticDay={akademiPeserta?.pendaftar?.total_penambahan}
              dailyAdd={helperHandlePercentage(
                akademiPeserta?.pendaftar?.total_penambahan,
                akademiPeserta?.pendaftar?.total
              )}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Peserta"}
              value={akademiPeserta?.peserta?.total}
              statisticDay={akademiPeserta?.peserta?.total_penambahan}
              dailyAdd={helperHandlePercentage(
                akademiPeserta?.peserta?.total_penambahan,
                akademiPeserta?.peserta?.total
              )}
            />
          </div>
        </div>
      </section>
      <section className="total-per-akademi">
        <h2 className="title-section-dashboard-mini">
          total per tema {akademi_id}
        </h2>
        {loadingAkademiPendaftar && (
          <div className="text-center">
            <LoadingDashboard loading={loadingAkademiPendaftar} />
          </div>
        )}
        <div className="row mt-5">
          {akademiPendaftar?.map((row, i) => (
            <div className="col-md-4 mb-8" key={i}>
              <TotalPerAkademi
                group={row.name}
                link={`/dashboard/${akademi_id}/${encodeURIComponent(
                  row.name
                )}?id=${row.id}`}
                pendaftar={row.pendaftar}
                peserta={row.peserta}
                lulus={row.lulus}
                sertifikasi={row.sertifikat}
              />
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default DashboardDetailTema;
