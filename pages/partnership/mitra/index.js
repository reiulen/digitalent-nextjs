// import Layout from "../../../components/templates/layout.component";
// import Table from "../../../components/content/partnership/mitra/tableMitra";

// import LoadingPage from "../../../components/LoadingPage";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const Table = dynamic(
  () => import("../../../components/content/partnership/mitra/tableMitra"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);
export default function MitraPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Master Mitra - Partnership"> */}
        <Table token={session.token} />
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
        props: { session, title: "Master Mitra - Partnership" },
      };
    }
);
