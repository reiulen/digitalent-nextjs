import DetailSubstansi from "../../../components/content/subvit/substansi/detail-substansi";
// import Layout from "../../../components/templates/layout.component";

import { getAllSubtanceQuestionDetail } from "../../../redux/actions/subvit/subtance-question-detail.action";
import { getDetailSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions";
import { getAllSubtanceQuestionBanksType } from "../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

export default function DetailSubstansiPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailSubstansi token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
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
        getAllSubtanceQuestionDetail(
          params.id,
          query.page,
          query.keyword,
          query.limit,
          query.status,
          query.category,
          query.pelatihan,
          session.user.user.data.token
        )
      );
      await store.dispatch(
        getDetailSubtanceQuestionBanks(params.id, session.user.user.data.token)
      );
      await store.dispatch(
        getAllSubtanceQuestionBanksType(session.user.user.data.token)
      );

      return {
        props: { session, title: "Detail Substansi - Subvit" },
      };
    }
);
