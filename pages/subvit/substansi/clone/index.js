import dynamic from "next/dynamic";
import Layout from "/components/templates/layout.component";
// import StepOne from "/components/content/subvit/substansi/clone/step-one";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { dropdownAkademi } from "../../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { getAllSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const StepOne = dynamic(
  () => import("/components/content/subvit/substansi/clone/step-one"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function CloneSoalSubtansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepOne token={session.token} tokenPermission={props.permission} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

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
        getAllSubtanceQuestionBanks(
          query.page,
          query.keyword,
          (query.limit = 100),
          session.user.user.data.token,
          permission
        )
      );

      await store.dispatch(
        dropdownAkademi(session.user.user.data.token, permission)
      );

      return {
        props: {
          session,
          title: "Clone Bank Soal Test Subtansi - Subvit",
          permission,
        },
      };
    }
);
