import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Pagination from "react-js-pagination";
import {
  getAllSertifikat,
  getOptionsAcademy,
  getOptionsTheme,
} from "../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { wrapper } from "../../../redux/store";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

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
      const token_permission = req.cookies.token_permission;
      const dataPermission = await store.dispatch(
        getAllPermission(session.user.user.data.token)
      );

      const data = await store.dispatch(
        getAllSertifikat(
          session.user.user.data.token,
          dataPermission?.data?.tokenPermission
        )
      );

      await store.dispatch(
        getOptionsAcademy(
          session.user.user.data.token,
          dataPermission.data.tokenPermission
        )
      );

      await store.dispatch(
        getOptionsTheme(
          session.user.user.data.token,
          dataPermission.data.tokenPermission
        )
      );

      return {
        props: { session, title: "List Akademi - Sertifikat" },
      };
    }
);
