import dynamic from "next/dynamic";
import LoadingPage from "../../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../../redux/store";
import {
  getDetailPesertaManage,
  getPelatihanByPeserta,
} from "../../../../../redux/actions/site-management/user/peserta-dts";
import {dropdownProvinsi} from '../../../../../redux/actions/pelatihan/function.actions'

const PageUbah = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/peserta-dts/ubah-peserta"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function UbahPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <PageUbah token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDetailPesertaManage(session.user.user.data.token, query.id)
      );

      await store.dispatch(
        getPelatihanByPeserta(session.user.user.data.token, query.id)
      );

      await store.dispatch(dropdownProvinsi(session.user.user.data.token));

      return {
        props: {
          session,
          title: "Ubah Peserta DTS - Site Management",
        },
      };
    }
);
