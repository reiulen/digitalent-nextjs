import { getSession } from "next-auth/client"
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import { getAllVideo, getTagVideo,getKategoriVideoContent } from "../../redux/actions/beranda/video-content.actions"
// import { getAllKategori } from "../../redux/actions/beranda/kategori-content.actions"
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"

const VideoPage = dynamic(
    () => import("../../user-component/content/beranda/videoPage")
)
const Layout = dynamic(
    () => import("../../user-component/content/wrapper/layout.wrapper")
)

export default function VideoDetail(props) {
    let session = null;
    if (props.session) {
        session = props.session.user.user.data.Token
    }
    return (
        <div>
            <Layout title="Video" token={session}>
                <VideoPage token={session} />
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query, req }) => {
            const session = await getSession({ req })

            await store.dispatch(getDataPribadi());
            await store.dispatch(getAllVideo(
                query.page,
                query.keyword,
                query.limit,
                query.filterPublish,
                query.sort,
                query.category_id,
                query.category_name,
                query.tag,
            ));
            await store.dispatch(getTagVideo());
            await store.dispatch(getKategoriVideoContent());
            return {
                props: {
                    session,
                    data: "auth",
                    title: "Video"
                }
            }
        }
)
