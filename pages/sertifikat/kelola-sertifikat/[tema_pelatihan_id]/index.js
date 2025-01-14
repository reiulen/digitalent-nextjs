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
import Cookies from "js-cookie";
import { getAllPermission } from "../../../../redux/actions/utils/utils.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { getOptionsAcademyCloneSertifikat } from "../../../../redux/actions/sertifikat/clone-sertifikat.action";

const KelolaSertifikatNamaPelatihanID = dynamic(
  () =>
    import(
      "../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/nama_pelatihan"
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

      await store.dispatch(
        getDetailSertifikat(
          query.id ? query.id : query.tema_pelatihan_id,
          query.page,
          query.keyword,
          query.limit,
          query.status,
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getOptionsAcademyCloneSertifikat(
          session.user.user.data.token,
          token_permission
        )
      );

      await store.dispatch(getAllPermission(session.user.user.data.token));
      return {
        props: { session, title: "List Nama Pelatihan - Sertifikat" },
      };
    }
);
