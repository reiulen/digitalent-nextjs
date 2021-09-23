// import Layout from "../../../components/templates/layout.component";
// import SubmitKerjasama from "../../../components/content/partnership/kerjasama/revisiKerjasama";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const SubmitKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/revisiKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function RevisiSubmit(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Revisi Dokumen - Partnership"> */}
        <SubmitKerjasama token={session.token} />
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
        props: { session, title: "Revisi Dokumen - Partnership" },
      };
    }
);
