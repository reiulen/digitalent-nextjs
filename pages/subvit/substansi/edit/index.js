import EditSubstansiStep1 from "../../../../components/content/subvit/substansi/edit/step-1";
import { getSession } from "next-auth/client";

import { getDetailSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";
import {
  dropdownAkademi,
  dropdownPelatihan,
  dropdownTema,
} from "../../../../redux/actions/pelatihan/function.actions";

export default function EditSubstansiStep1Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSubstansiStep1 token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(dropdownTema(session.user.user.data.token));
      await store.dispatch(dropdownPelatihan(session.user.user.data.token));

      await store.dispatch(
        getDetailSubtanceQuestionBanks(query.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Ubah Test Substansi Step 1 - Subvit" },
      };
    }
);
