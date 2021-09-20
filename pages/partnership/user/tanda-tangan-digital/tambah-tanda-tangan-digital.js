// import Layout from "../../../../components/templates/layout.component";
// import Tambah from "../../../../components/content/partnership/user/tanda-tangan/tambah";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const Tambah = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/tanda-tangan/tambah"
    ),
  { loading: () => <LoadingPage /> }
);
export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Tambah tanda tangan digital -Partnership"> */}
        <Tambah />
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
        props: { session, title: "Tambah tanda tangan digital - Partnership" },
      };
    }
);
