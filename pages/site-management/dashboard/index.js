import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const SiteManagementDashboard = dynamic(
  () =>
    import(
      "../../../components/content/site-management/dashboard/dashboard-site-management"
    ),
  { loading: () => <LoadingSkeleton /> }
);

export default function DashboardSiteManagement(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <SiteManagementDashboard token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () => async ({ req }) => {
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
      props: { session, title: "Dashboard - Site Management" },
    };
  }
);
