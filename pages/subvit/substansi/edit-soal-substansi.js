import EditSubstansiBank from "../../../components/content/subvit/substansi/question-bank-soal/edit";
import Layout from "../../../components/templates/layout.component";

import { detailSubtanceQuestionDetail } from '../../../redux/actions/subvit/subtance-question-detail.action'
import { getAllSubtanceQuestionBanksType } from '../../../redux/actions/subvit/subtance-question-type.actions'
import { wrapper } from '../../../redux/store'

export default function EditSubstansiBankPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Soal Substansi">
          <EditSubstansiBank />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(detailSubtanceQuestionDetail(query.id))
  await store.dispatch(getAllSubtanceQuestionBanksType(query.page, query.keyword, query.limit))
})
