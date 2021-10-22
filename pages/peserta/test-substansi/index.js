import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const TestSubstansi = dynamic(
  () => import("../../../user-component/content/peserta/test-substansi"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function TestSubstansiPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Dashboard Peserta - Pelatihan" session={session}>
        <TestSubstansi session={session} />
      </Layout>
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
            destination: "/login",
            permanent: false,
          },
        };
      }
      const data = session.user.user.data;
      if (data.user.roles[0] !== "user") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta" },
      };
    }
);