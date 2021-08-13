import EditSubstansiStep1 from "../../../../components/content/subvit/substansi/edit/step-1";
import Layout from "../../../../components/templates/layout.component";

import { getDetailSubtanceQuestionBanks } from '../../../../redux/actions/subvit/subtance.actions'
import { wrapper } from '../../../../redux/store'

export default function EditSubstansiStep1Page() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Test Substansi - Step 1">
          <EditSubstansiStep1 />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(getDetailSubtanceQuestionBanks(query.id))
})
