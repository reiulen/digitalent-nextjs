import DetailSubstansi from "../../../components/content/subvit/substansi/detail-substansi";
import Layout from "../../../components/templates/layout.component";

import { getAllSubtanceQuestionDetail } from '../../../redux/actions/subvit/subtance-question-detail.action'
import { getDetailSubtanceQuestionBanks } from '../../../redux/actions/subvit/subtance.actions'
import { getAllSubtanceQuestionBanksType } from '../../../redux/actions/subvit/subtance-question-type.actions'
import { wrapper } from '../../../redux/store'

export default function DetailSubstansiPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Detail Substansi">
          <DetailSubstansi />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, query }) => {
  await store.dispatch(getAllSubtanceQuestionDetail(params.id, query.page, query.keyword, query.limit, query.status, query.category, query.pelatihan))
  await store.dispatch(getDetailSubtanceQuestionBanks(params.id))
  await store.dispatch(getAllSubtanceQuestionBanksType())
})