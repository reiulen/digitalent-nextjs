import Layout from "/components/templates/layout.component";
import StepTwo from "/components/content/subvit/substansi/tambah/step-2-entry";

import { getAllSubtanceQuestionBanksType } from '../../../redux/actions/subvit/subtance-question-type.actions'
import { getOneSubtanceQuestionBanks } from '../../../redux/actions/subvit/subtance.actions'
import { wrapper } from '../../../redux/store'

export default function TambahBankSoalTesSubstansiStep2() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Bank Soal Tes Subtansi">
          <StepTwo />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(getAllSubtanceQuestionBanksType(query.page, query.keyword, query.limit))
  await store.dispatch(getOneSubtanceQuestionBanks(query.id))
})