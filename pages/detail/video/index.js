import { getSession } from "next-auth/client"
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware"

import { getAllVideo } from "../../../redux/actions/publikasi/video.actions"
import { getAllKategori } from "../../../redux/actions/publikasi/kategori.actions"
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions"

const VideoPage = dynamic(() =>
    import("../../../user-component/content/detail/kategori/publikasi/videoPage")
)
const Layout = dynamic(() =>
    import("../../../user-component/content/wrapper/layout.wrapper")
)

export default function VideoDetail(props) {
    // let session = null;
    // if (props.session) {
    const session = props.session.user.user.data;
    // }
    return (
        <div>
            <Layout title="Detail Video">
                <VideoPage token={session.token} />
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query, req }) => {
            const session = await getSession({ req });
            // const middleware = middlewareAuthPesertaSession(session);
            // if (!middleware.status) {
            //     return {
            //         redirect: {
            //             destination: middleware.redirect,
            //             permanent: false,
            //         },
            //     };
            // }
            // let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(session.user.user.data.token));
            await store.dispatch(getAllVideo(
                query.page,
                query.keyword,
                query.limit,
                query.publish,
                query.startdate,
                query.enddate,
                session.user.user.data.token));
            await store.dispatch(getAllKategori(session.user.user.data.token));

            return {
                props: {
                    title: "Detail Video",
                    data: "auth",
                    session,
                }
            }
        }
)