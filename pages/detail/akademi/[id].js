// import DetailAkademi from "../../../user-component/content/detail/kategori/akademi/detail-akademi";
import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getDetailAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { getAllPelatihanByAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";

import LoadingDetailAkademi from "../../../user-component/components/loader/DetailAkademiLoader";

const DetailAkademi = dynamic(
  () =>
    import(
      "../../../user-component/content/detail/kategori/akademi/detail-akademi-new"
    ),
  {
    loading: function loadingNow() {
      return <LoadingDetailAkademi />;
    },
    ssr: false,
  }
);
const Layout = dynamic(
  () => import("../../../components/wrapper/beranda.wrapper"),
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
    async ({ params, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(getDetailAkademi(params.id));

      await store.dispatch(
        getAllPelatihanByAkademi(
          params.id,
          params.tema_id,
          params.provinsi,
          params.tipe_pelatihan,
          params.penyelenggara,
          params.kategori_peserta,
          params.kata_kunci,
          params.tanggal_mulai,
          params.tanggal_akhir,
          params.page
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
