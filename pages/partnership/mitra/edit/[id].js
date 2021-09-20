// import Layout from "../../../../components/templates/layout.component";
// import EditMitra from "../../../../components/content/partnership/manajemen-mitra/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const EditMitra = dynamic(
  () => import("../../../../components/content/partnership/mitra/edit"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function EditMitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Mitra - Paretnership"> */}
        <EditMitra />
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
        props: { session, title: "Ubah Mitra - Paretnership" },
      };
    }
);
