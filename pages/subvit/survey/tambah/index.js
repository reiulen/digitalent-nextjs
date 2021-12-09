import TambahSurveyStep1 from "../../../../components/content/subvit/survey/tambah/step-1";
import Layout from "../../../../components/templates/layout.component";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { dropdownAkademi } from "../../../../redux/actions/pelatihan/function.actions";

export default function TambahSurveyStep1Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TambahSurveyStep1 token={session.token} />
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
        dropdownAkademi(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "Tambah Survey - Subvit" },
      };
    }
);
