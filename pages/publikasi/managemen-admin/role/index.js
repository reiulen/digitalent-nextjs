import Layout from "../../../../components/templates/layout.component";
import Role from "../../../../components/content/publikasi/managmen-admin/role/role";

export default function RolePage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Role'>
                    <Role />
                </Layout>
            </div>
        </>
    )
}