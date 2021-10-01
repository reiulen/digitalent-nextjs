// import Layout from "../../../../components/templates/layout.component";

// import Detail from "../../../../components/content/partnership/user/detail-kerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const Detail = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/kerjasama/detail-dokumen-kerjsama"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function DetailPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Detail kerjasama  - Partnership"> */}
        <Detail token={session.token} />
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
        props: { session, title: "Detail kerjasama  - Partnership" },
      };
    }
);
