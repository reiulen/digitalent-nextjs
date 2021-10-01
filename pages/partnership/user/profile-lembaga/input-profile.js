// import Layout from "../../../../components/templates/layout.component";
// import Tambah from "../../../../components/content/partnership/user/input-profile-kerjasama/tambah";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const Tambah = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/input-profile-kerjasama/tambah"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function TambahPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Input Profile Kerjasama - Partnership"> */}
        <Tambah token={session.token} />
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
        props: { session, title: "Input Profile Kerjasama - Partnership" },
      };
    }
);
