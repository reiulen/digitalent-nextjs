import Layout from "../../../../components/templates/layout.component";
import StepTwo from "../../../../components/content/subvit/survey/tambah/step-2-entry";

import { getOneSurveyQuestionBanks } from '../../../../redux/actions/subvit/survey-question.actions'
import { wrapper } from '../../../../redux/store'

export default function TambahBankSoalTesSurveyStep2() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Bank Soal Tes Survey">
          <StepTwo />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(getOneSurveyQuestionBanks(query.id))
})

