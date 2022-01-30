import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import {
  getSingleValue,
  searchByKeyDetail,
  setPageDetail,
  setLimitDetail,
  exportFileCSVDetail,
  fetchListSelectCooperation,
  fetchListSelectStatus,
  changeValueStatus,
  changeValueKerjaSama,
  deleteCooperation,
  reloadTable,
  changeStatusList,
  changeStatusListCooperation,
} from "../../../redux/actions/partnership/mitra.actions";

import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
const DetailDataKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/mitra/detailDataKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
export default function DetailDataKerjasamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailDataKerjasama token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ params, req }) => {
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

      dispatch(getSingleValue(token, params.id, cookiePermission));
      dispatch(fetchListSelectCooperation(token, cookiePermission));
      dispatch(fetchListSelectStatus(token, cookiePermission));

      await store.dispatch(
        fetchListSelectStatus(session.user.user.data.token, cookiePermission)
      );
      await store.dispatch(
        fetchListSelectCooperation(
          session.user.user.data.token,
          cookiePermission
        )
      );

      return {
        props: { session, title: "Detail Master Mitra - Paretnership" },
      };
    }
);
