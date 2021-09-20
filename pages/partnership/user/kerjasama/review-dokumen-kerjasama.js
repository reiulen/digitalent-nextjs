// import Layout from "../../../../components/templates/layout.component";
// import ReviewDokumenKerjasama from "../../../../components/content/partnership/user/reviewDokumenKerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const ReviewDokumenKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/reviewDokumenKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function RevisiListPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Review Kerjasama - Partnership"> */}
        <ReviewDokumenKerjasama />
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
