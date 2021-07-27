import Layout from "../../../components/templates/layout.component";
import Berita from "../../../components/content/publikasi/berita/berita";

export default function BeritaPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Berita'>
                    <Berita />
                </Layout>
            </div>
        </>
    )
}