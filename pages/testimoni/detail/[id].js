import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions"
// import { getDetailBerandaArtikel, getKategoriBerandaArtikel,  getTagBerandaArtikel} from "../../../redux/actions/beranda/artikel.actions"
import { getDetailBerandaTestimoni, getKategoriBerandaTestimoni,  getTagBerandaTestimoni} from "../../../redux/actions/beranda/testimoni.actions"
import LoadingDetailAkademi from "../../../user-component-new/components/loader/LoadingDetailAkademi";

const DetailTestimoni = dynamic (() => 
    import (
        "../../../user-component-new/content/home/detail-testimoni/detail-testimoni"
    ),
    {
      loading: function loadingNow() {
        return <LoadingDetailAkademi />;
      },
      ssr: false,
    }
)

const Layout = dynamic (() =>
    import (
        "../../../user-component-new/components/template/Layout.component"
    )
)

export default function BerandaDetailArtikel(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <div className="bg-white">
            <Layout title="Detail Testimoni" session={session}>
              <DetailTestimoni session={session} />  
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    ( store ) => 
        async ({params, req}) => {
            const session = await getSession({ req });

            let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(sessionToken));

            await store.dispatch(
                getDetailBerandaTestimoni(params.id)
            )

            await store.dispatch (
                getKategoriBerandaTestimoni()
            )

            await store.dispatch(
                getTagBerandaTestimoni()
            )

            return {
                props: {
                  title: "Detail Testimoni",
                  data: "auth",
                  session,
                },
            };
        }
)