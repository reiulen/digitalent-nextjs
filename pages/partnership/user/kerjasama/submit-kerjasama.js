import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthMitraSession } from "../../../../utils/middleware/authMiddleware";

const SubmitKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/kerjasama/submitKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function DetailKerjasamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <SubmitKerjasama token={session.token} />
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
        props: { session, title: "Submit Kerjsama - Partnership" },
      };
    }
);
