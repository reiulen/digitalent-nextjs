// import DetailPelatihan from "../../../user-component/content/detail/kategori/pelatihan/detail-pelatihan"
import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getDetailPelatihan } from "../../../redux/actions/beranda/detail-pelatihan.actions";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";

const DetailPelatihan = dynamic(() =>
  import("../../../user-component/content/detail/kategori/pelatihan/detail-pelatihan")
);
const Layout = dynamic(() => import("../../../user-component/content/wrapper/layout.wrapper"))

export default function DetailKategori (props) {
  let session = null;
  
  if (props.session) {
    session = props.session.user.user.data;
  }
    return (
        <div>
          <Layout title="Detail Pelatihan" session={session}>
            <DetailPelatihan session={session}/>
          </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ params, req }) => {
  const session = await getSession({ req });

  await store.dispatch(getDataPribadi(session.user.user.data.user.token));

  await store.dispatch(
    getDetailPelatihan(params.id)
  );

  return {
    props: {
      title:"Detail Pelatihan", data: "auth", session,
    },
  };
})