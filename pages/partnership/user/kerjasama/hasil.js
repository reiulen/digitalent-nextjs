import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthMitraSession } from "../../../../utils/middleware/authMiddleware";

const Hasil = dynamic(
  () => import("../../../../components/content/partnership/user/hasil"),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function PembahasanPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Hasil token={session.token} />
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
        props: { session, title: "Hasil kerjasama - Partnership" },
      };
    }
);
