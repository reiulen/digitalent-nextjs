// import Layout from "../../../components/templates/layout.component";
// import EditTandaTangan from "../../../components/content/partnership/tanda-tangan/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const EditTandaTangan = dynamic(
  () =>
    import("../../../../components/content/partnership/user/tanda-tangan/edit"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);
// import { getDetailTandaTangan } from "../../../redux/actions/partnership/tandaTangan.actions";
// import { wrapper } from "../../../redux/store";

export default function EditTandaTanganPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Tanda Tangan Digital - Partnership"> */}
        <EditTandaTangan token={session.token} />
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
            destination: "/partnership/user/auth/login",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Ubah Tanda Tangan Digital - Partnership" },
      };
    }
);
