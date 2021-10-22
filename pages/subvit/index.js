import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";
// import DashbardSubvit from "../../components/content/subvit/dashboard/dashboard-subvit";
// import Layout from "../../components/templates/layout.component";
import { getSession } from "next-auth/client";
import { getDashboardSubvit } from "../../redux/actions/subvit/subtance-question-detail.action";
import { wrapper } from "../../redux/store";

const DashboardSubvit = dynamic(
  () => import("../../components/content/subvit/dashboard/dashboard-subvit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardSubvit />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }
      console.log(query);
      await store.dispatch(
        getDashboardSubvit(
          query.page_substansi,
          query.page_trivia,
          query.page_survey,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "Dashboard - Subvit" },
      };
    }
);
