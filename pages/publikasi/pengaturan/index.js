import Layout from "../../../components/templates/layout.component";
import PengaturanPublikasi from "../../../components/content/publikasi/pengaturan/pengaturan";

export default function PengaturanPublikasiPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Pengaturan Publikasi'>
                    <PengaturanPublikasi />
                </Layout>
            </div>
        </>
    )
}