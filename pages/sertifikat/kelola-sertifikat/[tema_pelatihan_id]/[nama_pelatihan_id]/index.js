import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import { getDetailParticipant } from "../../../../../redux/actions/sertifikat/list-peserta.action";
import { getSingleSertifikat } from "../../../../../redux/actions/sertifikat/kelola-sertifikat.action";

const NamaPelatihanID = dynamic(
  () =>
    import(
      "../../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/single_sertifikat"
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
        <NamaPelatihanID token={session} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getSingleSertifikat(
          query.nama_pelatihan_id,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "Detail - Sertifikat" },
      };
    }
);
