import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import EditImagetron from "../../../components/content/publikasi/imagetron/edit";

import { getDetailImagetron } from "../../../redux/actions/publikasi/imagetron.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";
import { getAllKategori } from "../../../redux/actions/publikasi/kategori.actions";

const EditImagetron = dynamic(
  () => import("../../../components/content/publikasi/imagetron/edit"),
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
<<<<<<< HEAD
        <EditImagetron />
=======
        <EditImagetron token={session.token} />
>>>>>>> 279f614e085680387383629b291de8e592fdb1c4
        {/* </Layout> */}
      </div>
    </>
  );
}

<<<<<<< HEAD
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getDetailImagetron(params.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Ubah Imagetron - Publikasi" },
      };
    }
=======
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  await store.dispatch(getAllKategori(session.user.user.data.token))
  await store.dispatch(getDetailImagetron(params.id, session.user.user.data.token));
  return {
    props: { session, title: "Ubah Imagetron - Publikasi" },
  };
}
>>>>>>> 279f614e085680387383629b291de8e592fdb1c4
);
