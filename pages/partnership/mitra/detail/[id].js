// import Layout from "../../../../components/templates/layout.component";
// import DetailDataKerjasama from "../../../../components/content/partnership/manajemen-mitra/detailDataKerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const DetailDataKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/mitra/detailDataKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function DetailDataKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Detail Data Mitra - Paretnership"> */}
        <DetailDataKerjasama />
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
        props: { session, title: "Detail Data Mitra - Paretnership" },
      };
    }
);
