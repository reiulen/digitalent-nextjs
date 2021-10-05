import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Pagination from "react-js-pagination";
import { getAllSertifikat } from "../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { wrapper } from "../../../redux/store";

const KelolaSertifikat = dynamic(
  () =>
    import(
      "../../../components/content/sertifikat/kelola-sertifikat/tema_pelatihan.jsx"
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
        <KelolaSertifikat token={session.token} />
      </div>
    </>
  );
}

// Function GETSERVERSIDE PROPS
export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ query, req }) => {
      // console.log(query, "INI QUERY");
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
        getAllSertifikat(
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
        props: { session, title: "List Akademi - Sertifikat" },
      };
    }
);
