import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import { fetchSignature } from "../../../redux/actions/partnership/tandaTangan.actions";

import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPartnershipPermissions } from "../../../redux/actions/partnership/partnership_permission.actions"

const TandaTangan = dynamic(
  () =>
    import(
      "../../../components/content/partnership/tanda-tangan/tableTandaTangan"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function TandaTanganPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TandaTangan token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
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

      await store.dispatch(fetchSignature(session.user.user.data.token));
      await store.dispatch(getPartnershipPermissions(session.user.user.data.token))

      return {
        props: { session, title: "Tanda Tangan Digital - Partnership" },
      };
    }
);
