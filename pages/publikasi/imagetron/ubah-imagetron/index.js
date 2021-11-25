import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

// import Layout from "../../../components/templates/layout.component";
// import EditImagetron from "../../../components/content/publikasi/imagetron/edit";

import { getDetailImagetron } from "../../../../redux/actions/publikasi/imagetron.actions";
import { wrapper } from "../../../../redux/store";

import LoadingPage from "../../../../components/LoadingPage";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { getSettingPublikasi } from "../../../../redux/actions/publikasi/setting.actions";

const EditImagetron = dynamic(
  () => import("../../../../components/content/publikasi/imagetron/edit"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function EditImagetronPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Imagetron"> */}
        <EditImagetron token={session.token} idUser={session.user.id} />
        {/* </Layout> */}
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, req }) => {
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

  await store.dispatch(getAllKategori(session.user.user.data.token))
  await store.dispatch(getDetailImagetron(query.id, session.user.user.data.token));
  await store.dispatch(getSettingPublikasi(session.user.user.data.token));
  return {
    props: { session, title: "Ubah Imagetron - Publikasi" },
  };
}
);
