import ListTipeSoal from "../../../../components/content/subvit/substansi/tipe-soal/list";
import Layout from "/components/templates/layout.component";

import { getAllSubtanceQuestionBanksType } from "../../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { getPermissionSubvit } from "../../../../redux/actions/subvit/subtance.actions";

export default function TipeSoal(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTipeSoal token={session.token} />
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
      await store.dispatch(
        getAllSubtanceQuestionBanksType(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      await store.dispatch(getPermissionSubvit(session.user.user.data.token));

      return {
        props: { session, title: "Tipe Soal Substansi - Subvit" },
      };
    }
);
