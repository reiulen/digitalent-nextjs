import ListTipeSoal from '/components/content/subvit/substansi/tipe-soal/list'
import Layout from '/components/templates/layout.component'

export default function TipeSoal() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='List Tipe Soal Test Substansi'>
                    <ListTipeSoal />
                </Layout>
            </div>
        </>
    )
}
