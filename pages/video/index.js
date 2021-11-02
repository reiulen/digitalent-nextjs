import { getSession } from "next-auth/client"
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import { getAllVideo } from "../../redux/actions/publikasi/video.actions"
import { getAllKategori } from "../../redux/actions/publikasi/kategori.actions"
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"

const VideoPage = dynamic(
    () => import("../../user-component/content/beranda/videoPage")
)
const Layout = dynamic(
    () => import("../../user-component/content/wrapper/layout.wrapper")
)

export default function VideoDetail(props) {
    const session = props.session.user.user.data
    return (
        <div>
            <Layout title="Video" token={session.Token}>
                <VideoPage token={session.Token} />
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query, req }) => {
            const session = await getSession({ req })

            await store.dispatch(getDataPribadi(session?.user.user.data.user.token));
            await store.dispatch(
                getAllVideo(
                    query.page,
                    query.keyword,
                    query.limit,
                    query.publish,
                    query.startdate,
                    query.enddate,
                    session?.user.user.data.user.token
                )
            )
            await store.dispatch(getAllKategori(session?.user.user.data.user.token));
            return {
                props: {
                    session,
                    data: "auth",
                    title: "Video"
                }
            }
        }
)
