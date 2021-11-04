import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../../utils/middleware/authMiddleware";
import {
  getAllRiwayatPelatihanPeserta,
  getDetailRiwayatPelatihan,
} from "../../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { getAllAkademi } from "../../../../redux/actions/beranda/beranda.actions";

const RiwayatPelatihanDetail = dynamic(
  () =>
    import(
      "../../../../user-component/content/peserta/riwayat-pelatihan/[id]/lulus-pelatihan"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const BelumTersedia = dynamic(
  () =>
    import(
      "../../../../user-component/content/peserta/riwayat-pelatihan/[id]/belum-tersedia"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import("../../../../user-component/components/template/Layout.component")
);

export default function RiwayatPelatihanPage(props) {
  const session = props.session.user.user.data.user;

  return (
    <>
      <Layout title="Administrasi" session={session}>
        {/* {id ? <SeleksiAdministrasi /> : <BelumTersedia />} */}
        <RiwayatPelatihanDetail session={session} />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthPesertaSession(session);

      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      let success = false;
      if (req.cookies.id_pelatihan) {
        await store.dispatch(
          getDetailRiwayatPelatihan(
            req.cookies.id_pelatihan,
            session.user.user.data.user.token
          )
        );
        success = true;
      } else {
        const { data } = await store.dispatch(
          getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
        );
        if (data) {
          const test_substansi = data.list.filter(
            (item) => item.status == "tes substansi"
          );
          if (test_substansi.length > 0) {
            await store.dispatch(
              getDetailRiwayatPelatihan(
                test_substansi[0].id,
                session.user.user.data.user.token
              )
            );
            success = true;
          } else {
            success = false;
          }
        } else {
          success = false;
        }
      }

      await store.dispatch(getDataPribadi(session.user.user.data.user.token));
      await store.dispatch(getAllAkademi());

      return {
        props: {
          data: "auth",
          session,
          title: "Administrasi Pelatihan - Peserta",
        },
      };
    }
);
