import dynamic from "next/dynamic";
// import StepThree from "/components/content/subvit/trivia/tambah/step-3";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getOneTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";

const StepThree = dynamic(
  () => import("/components/content/subvit/trivia/tambah/step-3"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
export default function TambahBankSoalTriviaStep3(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepThree token={session.token} tokenPermission={props.permission} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const session = await getSession({ req });

      const permission = req.cookies.token_permission;

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getOneTriviaQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );

      return {
        props: { session, title: "Step 3 - Subvit", permission },
      };
    }
);
