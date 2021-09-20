import Layout from "../../../components/templates/layout.component";
// import DetailKerjasama from "../../../components/content/partnership/manajemen-kerjasama/detailDokumenKerjasama";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const DetailKerjasama = dynamic(
  () =>
    import(
      "../../../components/content/partnership/kerjasama/detailDokumenKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function detailDokumenKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Detail Data Kerjasama - Partnership"> */}
        <DetailKerjasama />
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
        props: { session, title: "Detail Dokumen Kerjasama - Partnership" },
      };
    }
);
