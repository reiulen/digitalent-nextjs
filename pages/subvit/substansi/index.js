import ListSubstansi from '../../../components/content/subvit/substansi/list-substansi'
import Layout from '../../../components/templates/layout.component'

export default function Substansi() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='List Test Substansi'>
                    <ListSubstansi />
                </Layout>
            </div>
        </>
    )
}
