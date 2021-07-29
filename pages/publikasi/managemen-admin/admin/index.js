import Layout from "../../../../components/templates/layout.component";
import Admin from "../../../../components/content/publikasi/managmen-admin/admin/admin";

export default function AdminPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Admin'>
                    <Admin />
                </Layout>
            </div>
        </>
    )
}