// import Layout from "../../../components/templates/layout.component";
// import EditTandaTangan from "../../../components/content/partnership/tanda-tangan/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const EditTandaTangan = dynamic(
  () => import("../../../components/content/partnership/tanda-tangan/edit"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);
// import { getDetailTandaTangan } from "../../../redux/actions/partnership/tandaTangan.actions";
// import { wrapper } from "../../../redux/store";

export default function EditTandaTanganPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Tanda Tangan Digital - Partnership"> */}
        <EditTandaTangan />
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
        props: { session, title: "Ubah Tanda Tangan Digital - Partnership" },
      };
    }
);
