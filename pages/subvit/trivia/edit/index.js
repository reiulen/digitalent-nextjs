import EditTriviaStep1 from "../../../../components/content/subvit/trivia/edit/step-1";

import { getDetailTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import {
  dropdownAkademi,
  dropdownPelatihan,
  dropdownTema,
} from "../../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

export default function EditTriviaStep1Page(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditTriviaStep1 token={session.token} />
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

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      const permission = req.cookies.token_permission;

      await store.dispatch(
        dropdownAkademi(session.user.user.data.token, permission)
      );
      await store.dispatch(
        dropdownTema(session.user.user.data.token, permission)
      );
      await store.dispatch(
        dropdownPelatihan(session.user.user.data.token, permission)
      );
      await store.dispatch(
        getDetailTriviaQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );

      return {
        props: { session, title: "Ubah Trivia Step 1 - Subvit" },
      };
    }
);
