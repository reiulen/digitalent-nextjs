// import Layout from "../../../../components/templates/layout.component";
// import ReviewKerjasama from "../../../../components/content/partnership/user/reviewKerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const ReviewKerjasama = dynamic(
  () =>
    import("../../../../components/content/partnership/user/reviewKerjasama"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function ReviewKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Review Kerjasama - Partnership"> */}
        <ReviewKerjasama />
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
