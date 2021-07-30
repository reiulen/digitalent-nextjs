import Layout from "/components/templates/layout.component";
import Tambah from "/components/content/subvit/substansi/tambah";

export default function TambahPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Tambah Bank Soal Tes Subtansi'>
                    <Tambah />
                </Layout>
            </div>
        </>
    )
}