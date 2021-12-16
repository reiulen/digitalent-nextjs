import dynamic from "next/dynamic";
import Layout from "/components/templates/layout.component";
// import TambahTipeSoal from "../../../../components/content/subvit/substansi/tipe-soal/tambah";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const TambahTipeSoal = dynamic(
  () => import("../../../../components/content/subvit/substansi/tipe-soal/tambah"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
export default function TambahTipeSoalTestSubstansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TambahTipeSoal
          token={session.token}
          tokenPermission={props.permission}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      const permission = req.cookies.token_permission;

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      return {
        props: {
          session,
          title: "Tambah Tipe Soal Test Subtansi - Subvit",
          permission,
        },
      };
    }
);
