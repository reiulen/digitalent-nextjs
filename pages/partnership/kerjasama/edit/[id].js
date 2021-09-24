// import Layout from "../../../../components/templates/layout.component";
// import EditDetailKerjasama from "../../../../components/content/partnership/manajemen-kerjasama/editDokumentKerjasama";
import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const EditDetailKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/kerjasama/editDokumentKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function editDokumenKerjasama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Dokumen Kerjasama - Partnership"> */}
        <EditDetailKerjasama token={session.token} />
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
        props: { session, title: "Ubah Dokumen Kerjasama - Partnership" },
      };
    }
);
