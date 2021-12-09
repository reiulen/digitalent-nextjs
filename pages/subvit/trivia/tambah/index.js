import StepOne from "/components/content/subvit/trivia/tambah/step-1";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { dropdownAkademi } from "../../../../redux/actions/pelatihan/function.actions";

export default function TambahBankSoalTesTriviaStep1(props) {
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
        dropdownAkademi(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "Tambah TRIVIA - Subvit", permission },
      };
    }
);
