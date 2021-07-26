import Layout from "../../../components/templates/layout.component";
import Artikel from "../../../components/content/publikasi/artikel/artikel";

export default function ArtikelPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Dashboard Publikasi'>
                    <Artikel />
                </Layout>
            </div>
        </>
    )
}