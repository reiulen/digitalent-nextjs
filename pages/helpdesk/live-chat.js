import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";

const FormPengaduan = dynamic(() =>
  import("../../user-component-new/content/home/helpdesk/live-chat")
);

const Layout = dynamic(
  () => import("../../user-component-new/components/template/Layout.component"),
  { ssr: false }
);

export default function BerandaKontak(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Layout title="Bantuan" session={session}>
          <FormPengaduan session={session}></FormPengaduan>
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      return {
        props: {
          title: "Berita",
          data: "auth",
          session,
        },
      };
    }
);
