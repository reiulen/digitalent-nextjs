import Layout from "/components/templates/layout.component";
import StepTree from "/components/content/subvit/substansi/clone/step-tree";

import { getDetailSubtanceQuestionBanks } from '../../../../redux/actions/subvit/subtance.actions'
import { wrapper } from '../../../../redux/store'

export default function CloneSoalSubtansi() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Clone Bank Soal Tes Subtansi'>
                    <StepTree />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getDetailSubtanceQuestionBanks(query.id))
})