// import Layout from "../../../../../components/templates/layout.component";
// import DetailDataKerjasamaById from "../../../../../components/content/partnership/manajemen-mitra/detailKerjasamaById";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../../redux/store";

const DetailDataKerjasamaById = dynamic(
  () =>
    import(
      "../../../../../components/content/partnership/mitra/detailKerjasamaById"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function DetailDataKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Detail Data Master Mitra - Paretnership"> */}
        <DetailDataKerjasamaById />
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
        props: { session, title: "Detail Master Mitra - Paretnership" },
      };
    }
);
