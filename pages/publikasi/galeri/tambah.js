import Layout from "../../../components/templates/layout.component";
import Tambah from "../../../components/content/publikasi/galeri/tambah";

export default function TambahPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Tambah Galeri'>
                    <Tambah />
                </Layout>
            </div>
        </>
    )
}