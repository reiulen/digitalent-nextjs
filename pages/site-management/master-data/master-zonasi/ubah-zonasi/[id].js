import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../../redux/store";
import LoadingPage from "../../../../../components/LoadingPage";

import { getAllOptionProvinces } from "../../../../../redux/actions/site-management/option/option-provinces.actions";
import { getDetailZonasi } from "../../../../../redux/actions/site-management/zonasi.actions";
const DetailRole = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/master-data/master-zonasi/ubah"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function DetailRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailRole token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(getAllOptionProvinces(session.user.user.data.token));
      await store.dispatch(
        getDetailZonasi(params.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Ubah Zonasi - Site Management" },
      };
    }
);