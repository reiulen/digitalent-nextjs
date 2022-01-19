import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
const DetailKerjasama = dynamic(
  () =>
    import(
      "../../../components/content/partnership/kerjasama/detailDokumenKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function detailDokumenKerjasama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailKerjasama token={session.token} />
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
        props: { session, title: "Detail Dokumen Kerjasama - Partnership" },
      };
    }
);
