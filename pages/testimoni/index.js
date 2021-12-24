import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"
// import { getAllBerandaArtikel, getKategoriBerandaArtikel,  getTagBerandaArtikel} from "../../redux/actions/beranda/artikel.actions"
import { getAllBerandaTestimoni, getKategoriBerandaTestimoni,  getTagBerandaTestimoni} from "../../redux/actions/beranda/testimoni.actions"
import { getAllAkademi } from "../../redux/actions/beranda/beranda.actions";
import LoadingDetailAkademi from "../../user-component-new/components/loader/LoadingDetailAkademi";

const Testimoni  =  dynamic (() => 
    import (
        "../../user-component-new/content/home/testimoni/testimoni"
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
        "../../user-component-new/components/template/Layout.component"
    )
)

export default function BerandaTestimoni(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <div className="bg-white">
            <Layout title="Testimoni" session={session}>
                <Testimoni session={session} ></Testimoni>
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    ( store ) => 
        async ({query, req}) => {
            const session = await getSession({ req });

            let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(sessionToken));

            await store.dispatch(
                getAllBerandaTestimoni(
                    query.page,
                    query.keyword,
                    query.limit,
                    query.filterPublish,
                    query.sort,
                    query.category_id,
                    query.category_name,
                    query.category_akademi,
                    query.tag
                )
            ) 

            await store.dispatch (
                getKategoriBerandaTestimoni()
            )

            await store.dispatch(
                getAllAkademi()
            );

            await store.dispatch(
                getTagBerandaTestimoni()
            )

            return {
                props: {
                  title: "Testimoni",
                  data: "auth",
                  session,
                },
            };
        }
)
