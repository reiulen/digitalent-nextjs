// import Layout from "../../../components/templates/layout.component";
// import SubmitKerjasama from "../../../components/content/partnership/manajemen-kerjasama/submitKerjasama";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const SubmitKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/submitKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function Submit() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Dokumen Kerjasama - Partnership"> */}
        <SubmitKerjasama />
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
        props: { session, title: "Dokumen Kerjasama - Partnership" },
      };
    }
);
