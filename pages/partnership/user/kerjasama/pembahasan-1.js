// import Layout from "../../../../components/templates/layout.component";
// import RevisiSubmit from "../../../../components/content/partnership/user/revisiSubmit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const RevisiSubmit = dynamic(
  () => import("../../../../components/content/partnership/user/revisiSubmit"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function RevisiSubmitPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Pembahasan - Partnership"> */}
        <RevisiSubmit />
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
        props: { session, title: "Pembahasan - Partnership" },
      };
    }
);
