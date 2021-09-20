// import Layout from "../../../../components/templates/layout.component";
// import RevisiList from "../../../../components/content/partnership/user/revisiList";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const RevisiList = dynamic(
  () => import("../../../../components/content/partnership/user/revisiList"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function RevisiListPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Review Kerjasama - Partnership"> */}
        <RevisiList />
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
        props: { session, title: "Review Kerjasama - Partnership" },
      };
    }
);
