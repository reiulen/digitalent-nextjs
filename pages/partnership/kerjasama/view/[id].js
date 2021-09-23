// import Layout from "../../../../components/templates/layout.component";
// import DetailKerjasama from "../../../../components/content/partnership/manajemen-kerjasama/detailDokumenKerjasama";
import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const DetailKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/kerjasama/detailDokumenKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function detailDokumenKerjasama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Detail Data Kerjasama - Partnership"> */}
        <DetailKerjasama token={session.token} />
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
        props: { session, title: "Detail Data Kerjasama - Partnership" },
      };
    }
);
