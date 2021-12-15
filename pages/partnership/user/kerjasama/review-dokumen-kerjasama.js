import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthMitraSession } from "../../../../utils/middleware/authMiddleware";

const ReviewDokumenKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/reviewDokumenKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function RevisiListPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ReviewDokumenKerjasama token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthMitraSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      
      return {
        props: { session, title: "Review Kerjasama - Partnership" },
      };
    }
);
