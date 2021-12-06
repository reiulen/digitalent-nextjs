import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";

import { wrapper } from "../../redux/store";

import { getAllSimonasKandidat } from "../../redux/actions/dashboard-kabadan/data-peserta/simonas.actions";

const ListKandidatSimonas = dynamic(
  () =>
    import(
      "../../components/content/daftar-peserta-kabadan/list-kandidat-simonas"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DaftarKandidatSimonasPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListKandidatSimonas token={session.token} />
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

      await store.dispatch(getAllSimonasKandidat(session.user.user.data.token));

      return {
        props: { session, title: "Daftar Kandidat - Simonas" },
      };
    }
);
