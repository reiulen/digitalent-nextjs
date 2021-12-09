import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";
// import DashboardSimonas from "../../components/content/dashboard-kabadan/simonas/dashboard-simonas";
import {
  getSimonasCompanyTotal,
  getSimonasProjectTotal,
  getSimonasCompanyAmount,
  getSimonasProjectAmount,
  getSimonasApplierTotal,
  getSimonasApplierTotalActive,
  getSimonasApplierAmountJob,
  getSimonasApplierAmountProject,
  getSimonasApplierAge,
  getSimonasApplierGender,
  getSimonasApplierEducationJob,
  getSimonasApplierEducationProject,
} from "../../redux/actions/dashboard-kabadan/dashboard/simonas.actions";
import { getDigitalentTotalPengguna } from "../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";

export default function DashboardSimonasPage(props) {
  const DashboardSimonas = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/simonas/dashboard-simonas"
      ),
    { ssr: false }
  );
  const MyMap = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/component/map-digitalent.component"
      ),
    { ssr: false }
  );
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div id="map" style={{ display: "none" }}>
          <MyMap />
        </div>
        <DashboardSimonas token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDigitalentTotalPengguna(session.user.user.data.token)
      );

      await store.dispatch(
        getSimonasCompanyTotal(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasProjectTotal(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasCompanyAmount(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasProjectAmount(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierTotal(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierTotalActive(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierAmountJob(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierAmountProject(session.user.user.data.token)
      );
      await store.dispatch(getSimonasApplierAge(session.user.user.data.token));
      await store.dispatch(
        getSimonasApplierGender(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierEducationJob(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierEducationProject(session.user.user.data.token)
      );

      return {
        props: { session, title: "Dashboard - Simonas" },
      };
    }
);
