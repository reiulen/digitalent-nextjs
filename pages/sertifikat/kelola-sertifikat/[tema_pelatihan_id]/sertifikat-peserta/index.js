import dynamic from "next/dynamic";
// import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getAllParticipant } from "../../../../../redux/actions/sertifikat/list-peserta.action";

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
        <ListPeserta />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }
      query.id ? query.id : (query.id = req.cookies.nama_pelatihan_id);
      await store.dispatch(
        getAllParticipant(
          query.id ? query.id : req.cookies.nama_pelatihan_id,
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "List Peserta - Sertifikat" },
      };
    }
);
