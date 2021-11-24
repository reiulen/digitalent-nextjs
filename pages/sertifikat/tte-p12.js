import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Pagination from "react-js-pagination";
import {
  getAllSertifikat,
  getOptionsAcademy,
  getOptionsTheme,
} from "../../redux/actions/sertifikat/kelola-sertifikat.action";
import { wrapper } from "../../redux/store";

const TTEP12 = dynamic(
  () => import("../../components/content/sertifikat/tte-p12/index"),
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
        <TTEP12 token={session.token} />
      </div>
    </>
  );
}

// Function GETSERVERSIDE PROPS
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

      await store.dispatch(getAllSertifikat(session.user.user.data.token));
      await store.dispatch(getOptionsAcademy(session.user.user.data.token));
      await store.dispatch(getOptionsTheme(session.user.user.data.token));

      return {
        props: { session, title: "List Akademi - Sertifikat" },
      };
    }
);
