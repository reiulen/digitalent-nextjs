import Layout from "../../../components/templates/layout.component";
import Vidio from "../../../components/content/publikasi/vidio/vidio";

export default function VidioPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Video'>
                    <Vidio />
                </Layout>
            </div>
        </>
    )
}