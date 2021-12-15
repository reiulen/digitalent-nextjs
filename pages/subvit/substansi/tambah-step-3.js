import StepThree from "../../../components/content/subvit/substansi/tambah/step-3.jsx";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware.js";
import { storeCommitmentStep3 } from "../../../redux/actions/pelatihan/function.actions.js";
import { getOneSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions.js";
import { wrapper } from "../../../redux/store";

export default function TambahBankSoalTesSubstansiStep3(props) {
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
        getOneSubtanceQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );

      return {
        props: {
          session,
          title: "Tambah Bank Soal Test Substansi - Subvit",
          permission,
        },
      };
    }
);
