import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import { getAllPenyeleggaraPeserta } from "../../redux/actions/beranda/beranda.actions";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";

import LoadingDetailAkademi from "../../user-component-new/components/loader/LoadingDetailAkademi";
import { getPencarian } from "../../redux/actions/pelatihan/pencarian.action";

const Pencarian = dynamic(
  () =>
    import(
      "../../user-component-new/content/home/pencarian/Pencarian.component"
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

export default function PencarianPelatihan(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <Layout title="Pencarian" session={session}>
        <Pencarian session={session} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getAllPenyeleggaraPeserta());
      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(
        getPencarian(
          query.cari || "",
          query.page || 1,
          query.limit || 6,
          query.penyelenggara || "",
          query.pelatihan_mulai || "",
          query.pelatihan_akhir || "",
          query.kategori_peserta || "",
          token || ""
        )
      );

      return {
        props: {
          title: "Penyelenggara",
          data: "auth",
          session,
        },
      };
    }
);
