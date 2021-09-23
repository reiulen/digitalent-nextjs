// import Layout from "../../../components/templates/layout.component";
// import Edit from "../../../components/content/partnership/master-kategori-kerjasama/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const Edit = dynamic(
  () =>
    import(
      "../../../components/content/partnership/master-kategori-kerjasama/edit"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function TambahPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Master Kategori Kerjasama - Partnership"> */}
        <Edit token={session.token} />
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
          title: "Ubah Master Kategori Kerjasama - Partnership",
        },
      };
    }
);
