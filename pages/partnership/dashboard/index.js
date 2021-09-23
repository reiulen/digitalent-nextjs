import dynamic from "next/dynamic";
// import LoadingPage from "../../../components/LoadingPage";
// import Layout from "../../../components/templates/layout.component";
// import Dashboard from "../../../components/content/partnership/dashboard/DashboardPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const Dashboard = dynamic(
  () =>
    import("../../../components/content/partnership/dashboard/DashboardPage"),
  { loading: () => <LoadingSkeleton /> }
);

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Dashboard - Partnership"> */}
        <Dashboard />
        {/* </Layout> */}
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Dashboard - Partnership" },
      };
    }
);
