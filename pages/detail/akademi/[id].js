// import DetailAkademi from "../../../user-component/content/detail/kategori/akademi/detail-akademi";
import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getDetailAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { getAllPelatihanByAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";

const DetailAkademi = dynamic(() =>
  import("../../../user-component/content/detail/kategori/akademi/detail-akademi")
);
const Layout = dynamic(() => import("../../../user-component/content/wrapper/layout.wrapper"))

export default function DetailAkademiPelatihan (props) {
  let session = null;
  
  if (props.session) {
    session = props.session.user.user.data;
  }

    return (
        <div>
          <Layout title="Detail Akademi" session={session}>
            <DetailAkademi session={session}/>
          </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ params, req }) => {
  const session = await getSession({ req });

  await store.dispatch(getDataPribadi(session.user.user.data.user.token));

  await store.dispatch(
    getDetailAkademi(params.id)
  );

  await store.dispatch (
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
    )
  )

  return {
    props: {
      title:"Detail Akademi", data: "auth", session,
    },
  };
})