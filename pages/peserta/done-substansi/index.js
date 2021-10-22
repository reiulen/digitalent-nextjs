import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../components/LoadingSkeleton";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";

const Done = dynamic(() => import("../../../user-component/content/done"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function SubvitDone(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Selesai Test Substansi - Subvit" session={session}>
          <Done />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      console.log(session.user.user.data);
      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      return {
        props: { data: "auth", session, title: "Selesai Test Substansi" },
      };
    }
);
