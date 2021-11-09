import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getDetailPelatihan } from "../../../redux/actions/beranda/detail-pelatihan.actions";
import { getAllTemaOriginal } from "../../../redux/actions/beranda/beranda.actions";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import LoadingDetailPelatihan from "../../../user-component/components/loader/DetailPelatihanLoader";

const DetailPelatihan = dynamic(
  () =>
    import(
      "../../../user-component/content/detail/kategori/pelatihan/detail-pelatihan-new"
    ),
  {
    loading: function loadingNow() {
      return <LoadingDetailPelatihan />;
    },
    ssr: false,
  }
);
const Layout = dynamic(
  () => import("../../../components/wrapper/beranda.wrapper"),
  { ssr: false }
);

export default function DetailKategori(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }
  return (
    <div style={{ backgroundColor: "white" }}>
      <Layout title="Detail Pelatihan" session={session}>
        <DetailPelatihan session={session} />
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

      await store.dispatch(getAllTemaOriginal());

      await store.dispatch(getDetailPelatihan(params.id));

      return {
        props: {
          title: "Detail Pelatihan",
          data: "auth",
          session,
        },
      };
    }
);
