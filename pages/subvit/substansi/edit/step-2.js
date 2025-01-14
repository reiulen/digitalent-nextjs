import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import EditSubstansiStep2 from "../../../../components/content/subvit/substansi/edit/step-2";
import Layout from "../../../../components/templates/layout.component";

import { getDetailSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const EditSubstansiStep2 = dynamic(
  () => import("../../../../components/content/subvit/substansi/edit/step-2"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditSubstansiStep2Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSubstansiStep2
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
        getDetailSubtanceQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: {
          session,
          title: "Edit Test Substansi  Step 2 - Subvit",
          permission,
        },
      };
    }
);
