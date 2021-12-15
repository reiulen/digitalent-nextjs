import Layout from "/components/templates/layout.component";
import StepFour from "../../../../components/content/subvit/substansi/clone/step-four";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { dropdownAkademi } from "../../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { getAllSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";

export default function CloneSoalSubtansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
<<<<<<< HEAD
        <StepFour token={session.token} tokenPermission={props.permission} />
=======
        <StepTree token={session.token} tokenPermission={props.permission} />
>>>>>>> fb9bc4204f29d6f73e8385f01ddb6cea68e4adf7
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
