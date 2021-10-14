import dynamic from "next/dynamic";
// import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getDetailParticipant } from "../../../../../redux/actions/sertifikat/list-peserta.action";

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
  store =>
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

      console.log(query);
      await store.dispatch(
        getDetailParticipant(
          query.id,
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
