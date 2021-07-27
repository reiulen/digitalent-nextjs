import Layout from "../../../components/templates/layout.component";
import Faq from "../../../components/content/publikasi/faq/faq";

export default function FaqPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen FAQ'>
                    <Faq />
                </Layout>
            </div>
        </>
    )
}