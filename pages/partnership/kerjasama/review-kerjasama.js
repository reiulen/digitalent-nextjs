// import Layout from "../../../components/templates/layout.component";
// import ReviewKerjasama from "../../../components/content/partnership/kerjasama/reviewKerjasama";
// import LoadingPage from "../../../components/LoadingPage";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const ReviewKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/reviewKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function ReviewKerjasamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Review Kerjasama - Partnership"> */}
        <ReviewKerjasama token={session.token} />
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
