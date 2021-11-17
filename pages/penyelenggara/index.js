import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import { getAllPenyeleggaraPage } from "../../redux/actions/beranda/beranda.actions";

import LoadingDetailAkademi from "../../user-component-new/components/loader/LoadingDetailAkademi";

const Penyelenggara = dynamic(
  () =>
    import(
      "../../user-component-new/content/home/penyelenggara/Penyelenggara.component"
    ),
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

export default function PenyelenggaraPelatihan(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <Layout title="Penyelenggara" session={session}>
        <Penyelenggara session={session} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      // await store.dispatch(getDataPribadi(sessionToken));
      await store.dispatch(getAllPenyeleggaraPage());

      return {
        props: {
          title: "Penyelenggara",
          data: "auth",
          session,
        },
      };
    }
);
