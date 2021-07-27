import Layout from "../../../components/templates/layout.component";
import ArtikelPeserta from "../../../components/content/publikasi/artikel-peserta/artikel-peserta";

export default function ArtikelPesertaPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Artikel Peserta'>
                    <ArtikelPeserta />
                </Layout>
            </div>
        </>
    )
}