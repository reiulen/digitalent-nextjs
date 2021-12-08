import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import {
  getAllRiwayatPelatihanPeserta,
  getDetailRiwayatPelatihan,
} from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";

const SeleksiAdministrasi = dynamic(
  () =>
    import(
      "../../../user-component-new/components/global/Riwayat-pelatihan-detail/index"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const BelumTersedia = dynamic(
  () => import("../../../user-component-new/content/peserta/empty-state/index"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function RiwayatPelatihanPage(props) {
  const session = props.session.user.user.data.user;

  return (
    <>
      <Layout title="Administrasi" session={session}>
        {props.success ? (
          <SeleksiAdministrasi session={session} />
        ) : (
          <BelumTersedia />
        )}
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

      // if (!req.cookies.id_pelatihan) {
      //   const { data } = await store.dispatch(
      //     getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
      //   );
      //   if (data.list.length > 0) {
      //     const administrasi = data.list.filter((item) =>
      //       item.status.includes("administrasi")
      //     );
      //     if (administrasi) {
      //       await store.dispatch(
      //         getDetailRiwayatPelatihan(
      //           administrasi[0]?.id,
      //           session.user.user.data.user.token
      //         )
      //       );
      //       success = true;
      //     } else {
      //       success = false;
      //     }
      //   } else {
      //     success = false;
      //   }
      // } else {
      //   await store.dispatch(
      //     getDetailRiwayatPelatihan(
      //       req.cookies.id_pelatihan,
      //       session.user.user.data.user.token
      //     )
      //   );
      //   success = true;
      // }
      let success = false;

      // if (!req.cookies.id_pelatihan) {
      //   const { data } = await store.dispatch(
      //     getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
      //   );
      //   if (!data) {
      //     return (success = false);
      //   } else {
      //     if (data.list.length > 0) {
      //       const administrasi = data.list.filter((item) =>
      //         item.status.includes("administrasi")
      //       );
      //       if (!administrasi) {
      //         return (success = false);
      //       } else {
      //         await store.dispatch(
      //           getDetailRiwayatPelatihan(
      //             administrasi[0]?.id,
      //             session.user.user.data.user.token
      //           )
      //         );
      //         success = true;
      //       }
      //     }
      //   }
      // } else {
      //   await store.dispatch(
      //     getDetailRiwayatPelatihan(
      //       req.cookies.id_pelatihan,
      //       session.user.user.data.user.token
      //     )
      //   );
      //   success = true;
      // }

      await store.dispatch(getAllAkademi());

      if (query.id) {
        //jika ada query id
        const data = await store.dispatch(
          getDetailRiwayatPelatihan(query.id, session.user.user.data.user.token)
        );
        if (data) {
          if (
            data?.data?.status?.includes("administrasi") &&
            !data?.data?.status?.includes("administrasi akhir")
          ) {
            success = true;
          } else {
            success = false;
          }
        } else {
          success = false;
        }
      } else {
        // jika gak ada gw cek di dashboard ada gak status adminisstrasi?
        const dataDashboard = await store.dispatch(
          getDashboardPeserta(session?.user.user.data.user.token)
        );
        if (dataDashboard) {
          const status =
            dataDashboard.data.pelatihan.pelatihan_berjalan.status || "";

          if (!status || status == "") {
            success = false;
          } else if (
            status.includes("administrasi") &&
            !status.includes("administrasi akhir")
          ) {
            await store.dispatch(
              getDetailRiwayatPelatihan(
                dataDashboard.data.pelatihan.pelatihan_berjalan.id,
                session.user.user.data.user.token
              )
            );
            success = true;
          } else {
            //jika gak ada gw cek di riwayat pelatihan ada gak datanya
            const { data } = await store.dispatch(
              getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
            );
            success = false;
            const list = data.list.filter((item) => {
              return (
                item.status.includes("administrasi") &&
                !item.status.includes("administrasi akhir")
              );
            });

            if (list.length == 0 || !list) {
              success = false;
            } else {
              await store.dispatch(
                getDetailRiwayatPelatihan(
                  list[0].id,
                  session.user.user.data.user.token
                )
              );
              success = true;
            }
          }
        }
      }

      return {
        props: {
          data: "auth",
          session,
          title: "Administrasi Pelatihan - Peserta",
          success,
        },
      };
    }
);
