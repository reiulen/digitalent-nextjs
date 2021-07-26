import Layout from "../../../components/templates/layout.component";
import Kategori from "../../../components/content/publikasi/kategori/kategori";

export default function KategoriPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Kategori'>
                    <Kategori />
                </Layout>
            </div>
        </>
    )
}