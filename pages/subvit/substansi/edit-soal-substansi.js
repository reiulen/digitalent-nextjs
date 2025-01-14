import dynamic from "next/dynamic";
// import EditSubstansiBank from "../../../components/content/subvit/substansi/question-bank-soal/edit";

import { detailSubtanceQuestionDetail } from "../../../redux/actions/subvit/subtance-question-detail.action";
import { getAllSubtanceQuestionBanksType } from "../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPermissionSubvit } from "../../../redux/actions/subvit/subtance.actions";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const EditSubstansiBank = dynamic(
  () =>
    import(
      "../../../components/content/subvit/substansi/question-bank-soal/edit"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditSubstansiBankPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSubstansiBank
          token={session.token}
          tokenPermission={props.permission}
        />
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
        detailSubtanceQuestionDetail(
          query.id,
          session.user.user.data.token,
          permission
        )
      );
      await store.dispatch(
        getAllSubtanceQuestionBanksType(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token,
          permission
        )
      );

      await store.dispatch(
        getPermissionSubvit(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "Ubah Soal Substansi - Subvit", permission },
      };
    }
);
