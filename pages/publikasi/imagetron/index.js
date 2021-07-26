import Layout from "../../../components/templates/layout.component";
import Imagetron from "../../../components/content/publikasi/imagetron/imagetron";

export default function ImagetronPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Imagetron'>
                    <Imagetron />
                </Layout>
            </div>
        </>
    )
}