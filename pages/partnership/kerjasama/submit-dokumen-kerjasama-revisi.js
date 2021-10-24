import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
const SubmitKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/revisiKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function RevisiSubmit(props) {
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
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      // if (!session) {
      //   return {
      //     redirect: {
      //       destination: "http://dts-dev.majapahit.id/login/admin",
      //       permanent: false,
      //     },
      //   };
      // }

      return {
        props: { session, title: "Revisi Dokumen - Partnership" },
      };
    }
);
