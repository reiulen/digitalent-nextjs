// import Layout from "../../../../components/templates/layout.component";
// import ReviewDokKerjasama from "../../../../components/content/partnership/user/reviewDokKerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const ReviewDokKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/reviewDokKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function ReviewDokKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Submit revisi dokumen kerjsama - Partnership"> */}
        <ReviewDokKerjasama />
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
        props: {
          session,
          title: "Submit revisi dokumen kerjsama - Partnership",
        },
      };
    }
);
