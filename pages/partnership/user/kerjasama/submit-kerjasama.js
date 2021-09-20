// import Layout from "../../../../components/templates/layout.component";
// import SubmitKerjasama from "../../../../components/content/partnership/user/kerjasama/submitKerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const SubmitKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/kerjasama/submitKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function DetailKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Submit Kerjsama - Partnership"> */}
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
        props: { session, title: "Submit Kerjsama - Partnership" },
      };
    }
);
