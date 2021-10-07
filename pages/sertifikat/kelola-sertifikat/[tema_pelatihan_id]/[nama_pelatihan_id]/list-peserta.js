import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import {
  getAllParticipant,
  getDetailParticipant,
} from "../../../../../redux/actions/sertifikat/list-peserta.action";

const ListPeserta = dynamic(
  () =>
    import(
      "../../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/list-peserta"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function KelokaSertifikatPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <KelolaSertifikatKategori /> */}
        <ListPeserta />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ query, req }) => {
      console.log(query, "ini query list peserta");
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
        getDetailParticipant(
          query.nama_pelatihan_id,
          query.page,
          query.keyword,
          query.limit,
          query.publish,
          query.startdate,
          query.enddate,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "List Peserta - Sertifikat" },
      };
    }
);
