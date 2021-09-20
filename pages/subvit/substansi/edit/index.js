import EditSubstansiStep1 from "../../../../components/content/subvit/substansi/edit/step-1";
import { getSession } from "next-auth/client";

import { getDetailSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";

export default function EditSubstansiStep1Page() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSubstansiStep1 />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDetailSubtanceQuestionBanks(query.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Edit Test Substansi Step 1 - Subvit" },
      };
    }
);
