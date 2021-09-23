// import LoadingPage from "../../../components/LoadingPage";
// import Layout from "../../../components/templates/layout.component";
// import Table from "../../../components/content/partnership/manajemen-kerjasama/tableKerjasama";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession, session } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const Table = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/tableKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function KerjaSamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Kerjasama - Partnership"> */}
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
        props: { session, title: "Kerjasama - Partnership" },
      };
    }
);
