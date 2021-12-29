import dynamic from "next/dynamic";
// import StepTwo from "../../../../components/content/subvit/trivia/tambah/step-2-import";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const StepTwo = dynamic(
  () =>
    import("../../../../components/content/subvit/trivia/tambah/step-2-import"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TambahBankSoalTesTriviaStep2(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTwo token={session.token} tokenPermission={props.permission} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      const permission = req.cookies.token_permission;

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      return {
        props: { session, title: "Step 2 Import - Subvit", permission },
      };
    }
);
