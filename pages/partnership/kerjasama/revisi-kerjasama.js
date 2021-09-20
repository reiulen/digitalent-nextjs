// import Layout from "../../../components/templates/layout.component";
// import RevisiListKerjasama from "../../../components/content/partnership/kerjasama/revisiListKerjasama";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const RevisiListKerjasama = dynamic(
  () =>
    import(
      "../../../components/content/partnership/kerjasama/revisiListKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function RevisiSubmit() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Revisi List - Partnership"> */}
        <RevisiListKerjasama />
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
        props: { session, title: "Revisi List - Partnership" },
      };
    }
);
