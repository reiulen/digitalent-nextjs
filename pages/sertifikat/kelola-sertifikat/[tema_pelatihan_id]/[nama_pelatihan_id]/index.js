import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import {
  getDetailSertifikat,
  getPublishedSertifikat,
  getSingleSertifikat,
} from "../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const NamaPelatihanID = dynamic(
  () =>
    import(
      "../../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/single_sertifikat_draft"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const EditSertifikat = dynamic(
  () =>
    import(
      "../../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/edit-sertifikat"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const PublishedSertifikat = dynamic(
  () =>
    import(
      "../../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/published_sertifikat"
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

  if (props.status == "1") {
    return (
      <>
        <div className="d-flex flex-column flex-root">
          <PublishedSertifikat token={session} />
        </div>
      </>
    );
  } else if (props.status == "edit") {
    return (
      <>
        <div className="d-flex flex-column flex-root">
          <EditSertifikat token={session} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="d-flex flex-column flex-root">
          <NamaPelatihanID token={session} />
        </div>
      </>
    );
  }
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

      if (query.status == "1") {
        const data = await store.dispatch(
          getPublishedSertifikat(query.id, session.user.user.data.token)
        );
        return {
          props: {
            session,
            title: "Published - Sertifikat",
            status: query.status,
          },
        };
      } else if (query.status == "edit") {
        const data = await store.dispatch(
          getSingleSertifikat(query.id, session.user.user.data.token)
        );
        return {
          props: { session, title: "Edit - Sertifikat", status: query.status },
        };
      } else {
        await store.dispatch(
          getSingleSertifikat(query.id, session.user.user.data.token)
        );
        return {
          props: {
            session,
            title: "Detail - Sertifikat",
            status: query.status,
          },
        };
      }
    }
);
