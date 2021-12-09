import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { getDetailParticipant } from "../../../../../redux/actions/sertifikat/list-peserta.action";
import { getPublishedSertifikat } from "../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { wrapper } from "../../../../../redux/store";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const ListPesertaId = dynamic(
  () =>
    import(
      "../../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/list-peserta-id"
    ),
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
        <ListPesertaId token={session} />
      </div>
    </>
  );
}

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

      await store.dispatch(
        getPublishedSertifikat(query.id_pelatihan, session.user.user.data.token)
      );

      await store.dispatch(
        getDetailParticipant(
          //   query.nama_pelatihan_id,
          query.id,
          query.id_pelatihan,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "Detail - Sertifikat" },
      };
    }
);
