import Layout from "../../../components/templates/layout.component";
import Galeri from "../../../components/content/publikasi/galeri/galeri";

export default function GaleriPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Galeri'>
                    <Galeri />
                </Layout>
            </div>
        </>
    )
}