import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import { fetchMitra } from "../../../redux/actions/partnership/mitra.actions";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPartnershipPermissions } from "../../../redux/actions/partnership/partnership_permission.actions";
const Table = dynamic(
  () => import("../../../components/content/partnership/mitra/tableMitra"),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
export default function MitraPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Table token={session.token} />
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
      const cookiePermission = req.cookies.token_permission;

      await store.dispatch(
        fetchMitra(session.user.user.data.token, cookiePermission)
      );
      await store.dispatch(
        getPartnershipPermissions(
          session.user.user.data.token,
          cookiePermission
        )
      );

      return {
        props: { session, title: "Master Mitra - Partnership" },
      };
    }
);
