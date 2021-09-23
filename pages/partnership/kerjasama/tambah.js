// import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/partnership/manajemen-kerjasama/tambah";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const Tambah = dynamic(
  () => import("../../../components/content/partnership/kerjasama/tambah"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function TambahPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Tambah Kerjasama - Partnership"> */}
        <Tambah token={session.token} />
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
        props: { session, title: "Tambah Kerjasama - Partnership" },
      };
    }
);
