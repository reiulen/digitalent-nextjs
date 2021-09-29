import dynamic from "next/dynamic";
import Layout from "../../../../components/templates/layout.component";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { getDetailSertifikat } from "../../../../redux/actions/sertifikat/kelola-sertifikat.action";

const KelolaSertifikatNamaPelatihanID = dynamic(
  () =>
    import(
      "../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/nama-pelatihan-id.jsx"
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
        <KelolaSertifikatNamaPelatihanID token={session.token} />
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
            destination: "/",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getDetailSertifikat(
          query.nama_pelatihan,
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
        props: { session, title: "List Nama Pelatihan - Sertifikat" },
      };
    }
);
