// import Layout from "../../../../components/templates/layout.component";
// import Pembahasan from "../../../../components/content/partnership/user/pembahasan";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const Pembahasan = dynamic(
  () => import("../../../../components/content/partnership/user/pembahasan"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function PembahasanPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Pembahasan - Partnership"> */}
        <Pembahasan token={session.token} />
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
            destination: "/partnership/user/auth/login",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Pembahasan - Partnership" },
      };
    }
);
