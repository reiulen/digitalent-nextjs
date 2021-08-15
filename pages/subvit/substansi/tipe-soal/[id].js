import Layout from "/components/templates/layout.component";
import EditTipeSoal from "/components/content/subvit/substansi/tipe-soal/edit";

import { getDetailSubtanceQuestionBanksType } from '../../../../redux/actions/subvit/subtance-question-type.actions'
import { wrapper } from '../../../../redux/store'

export default function EditTipeSoalTestSubstansi() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Tipe Soal Test Subtansi">
          <EditTipeSoal />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
  await store.dispatch(getDetailSubtanceQuestionBanksType(params.id))
})
