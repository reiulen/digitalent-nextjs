import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
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

const DetailDataKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/mitra/detailDataKerjasama"),
  { loading: () => <LoadingPage />, ssr: false }
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
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      dispatch(getSingleValue(token, params.id));
      dispatch(fetchListSelectCooperation(token));
      dispatch(fetchListSelectStatus(token));

      await store.dispatch(fetchListSelectStatus(session.user.user.data.token));
      await store.dispatch(
        fetchListSelectCooperation(session.user.user.data.token)
      );

      return {
        props: { session, title: "Detail Master Mitra - Paretnership" },
      };
    }
);
