// import Layout from "../../../../components/templates/layout.component";
// import Submit from "../../../../components/content/partnership/user/submit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const Submit = dynamic(
  () => import("../../../../components/content/partnership/user/submit"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function SubmitPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Submit dokumen kerjasama - Partnership"> */}
        <Submit />
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
        props: { session, title: "Submit dokumen kerjasama - Partnership" },
      };
    }
);
