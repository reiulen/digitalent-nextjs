import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
const DashboardUser = dynamic(
  () =>
    import(
      "../../../components/content/site-management/dashboard/dashboard-user"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardUser />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login/admin",
        permanent: false,
      },
    };
  }

  return {
    props: { session, title: "Dashboard - User" },
  };
}
