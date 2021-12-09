import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Pagination from "react-js-pagination";
import { wrapper } from "../../redux/store";
import { getTTEP12 } from "../../redux/actions/sertifikat/tte-p12.action";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";

const TTEP12 = dynamic(
  () => import("../../components/content/sertifikat/tte-p12/index"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function KelokaSertifikatPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TTEP12 token={session.token} />
      </div>
    </>
  );
}

// Function GETSERVERSIDE PROPS
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

      const data = await store.dispatch(
        getTTEP12(session.user.user.data.token)
      );

      return {
        props: { session, title: "List Akademi - Sertifikat" },
      };
    }
);
