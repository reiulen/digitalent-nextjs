import Layout from "/components/templates/layout.component";
import StepOne from "/components/content/subvit/substansi/clone/step-one";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { dropdownAkademi } from "../../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

export default function CloneSoalSubtansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepOne token={session.token} />
      </div>
    </>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
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

      return {
        props: { session, title: "Clone Bank Soal Test Subtansi - Subvit" },
      };
    }
);
