import DashbardSubvit from '../../components/content/subvit/dashboard/dashboard-subvit'
import Layout from '../../components/templates/layout.component'

export default function Dashboard() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Dashboard Subvit'>
                    <DashbardSubvit />
                </Layout>
            </div>
        </>
    )
}
