import DetailSubstansi from "../../../components/content/subvit/substansi/detail-substansi";
import Layout from "../../../components/templates/layout.component";

import { getAllSubtanceQuestionDetail } from '../../../redux/actions/subvit/subtance-question-detail.action'
import { getDetailSubtanceQuestionBanks } from '../../../redux/actions/subvit/subtance.actions'
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
  await store.dispatch(getAllSubtanceQuestionDetail(params.id, query.page, query.limit))
  await store.dispatch(getDetailSubtanceQuestionBanks(params.id))
})