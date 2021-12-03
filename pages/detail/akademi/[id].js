// import DetailAkademi from "../../../user-component/content/detail/kategori/akademi/detail-akademi";
import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getDetailAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { getAllPelatihanByAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import {
  getAllAkademi,
  getAllKotaPeserta,
  getAllPenyeleggaraPeserta,
  getAllTemaOriginal,
} from "../../../redux/actions/beranda/beranda.actions";

import LoadingDetailAkademi from "../../../user-component-new/components/loader/LoadingDetailAkademi";

const DetailAkademi = dynamic(
  () =>
    import(
      "../../../user-component-new/content/home/detail-akademi/DetailAkademi.component"
    ),
  {
    loading: function loadingNow() {
      return <LoadingDetailAkademi />;
    },
    ssr: false,
  }
);
const Layout = dynamic(
  () =>
    import("../../../user-component-new/components/template/Layout.component"),
  { ssr: false }
);

export default function DetailAkademiPelatihan(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <Layout title="Detail Akademi" session={session}>
        <DetailAkademi session={session} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(getDetailAkademi(params.id));
      await store.dispatch(getAllAkademi());
      await store.dispatch(getAllTemaOriginal());
      await store.dispatch(getAllKotaPeserta());
      await store.dispatch(getAllPenyeleggaraPeserta());

      await store.dispatch(
        getAllPelatihanByAkademi(
          params.id,
          query.tema_id,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          sessionToken
        )
      );

      return {
        props: {
          title: "Detail Akademi",
          data: "auth",
          session,
        },
      };
    }
);
