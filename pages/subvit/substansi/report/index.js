import Layout from "/components/templates/layout.component";
import Report from "/components/content/subvit/substansi/report";

export default function ReportPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Report Bank Soal Tes Subtansi'>
                    <Report />
                </Layout>
            </div>
        </>
    )
}