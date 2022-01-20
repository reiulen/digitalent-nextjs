import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";

import { wrapper } from "../../redux/store";
import {
  getAllBeasiswaFilter,
  getAllBeasiswaKandidat,
} from "../../redux/actions/dashboard-kabadan/data-peserta/beasiswa.actions";

const ListKandidatBeasiswa = dynamic(
  () =>
    import(
      "../../components/content/daftar-peserta-kabadan/list-kandidat-beasiswa"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DaftarKandidatBeasiswaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListKandidatBeasiswa token={session.token} />
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

      await store.dispatch(
        getAllBeasiswaKandidat(session.user.user.data.token)
      );
      await store.dispatch(getAllBeasiswaFilter(session.user.user.data.token));

      return {
        props: { session, title: "Daftar Kandidat - Beasiswa" },
      };
    }
);
