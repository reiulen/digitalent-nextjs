import Layout from "/components/templates/layout.component";
import EditTipeSoal from "../../../../components/content/subvit/substansi/tipe-soal/edit";

import { getDetailSubtanceQuestionBanksType } from "../../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

export default function EditTipeSoalTestSubstansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditTipeSoal token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
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
        getDetailSubtanceQuestionBanksType(
          params.id,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: { session, title: "Ubah Tipe Soal Test Subtansi - Subvit" },
      };
    }
);
