import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const ListPelatihan = dynamic(
  () => import("../../../user-component/content/peserta/pelatihan"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function ListPelatihanPage() {
  return (
    <>
      <Layout title="Pelatihan Peserta - Pelatihan">
        <ListPelatihan />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      //   const session = await getSession({ req });
      //   if (!session) {
      //     return {
      //       redirect: {
      //         destination: "/login",
      //         permanent: false,
      //       },
      //     };
      //   }

      return {
        props: { data: "auth", title: "Dashboard - Peserta" },
      };
    }
);
