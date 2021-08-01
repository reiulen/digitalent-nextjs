import DashbardPublikasi from '../../components/content/publikasi/dashboard/dashboard-publikasi'
import Layout from '../../components/templates/layout.component'

export default function Home() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Dashboard Publikasi'>
                    <DashbardPublikasi />
                </Layout>
            </div>
        </>
    )
}
