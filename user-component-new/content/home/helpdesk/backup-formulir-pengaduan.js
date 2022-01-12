import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import LoadingDetailAkademi from "../../user-component-new/components/loader/LoadingDetailAkademi";
import { getDropdownHelpdesk } from "../../redux/actions/beranda/helpdesk.action";

const FormPengaduan = dynamic(
  () =>
    import("../../user-component-new/content/home/helpdesk/formulir-pengaduan"),
  {
    loading: function loadingNow() {
      return <LoadingDetailAkademi />;
    },
    ssr: false,
  }
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

      const data = await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(getDropdownHelpdesk());
      return {
        props: {
          title: "Berita",
          data: "auth",
          session,
        },
      };
    }
);
