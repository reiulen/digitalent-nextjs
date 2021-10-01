import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/publikasi/kategori/tambah";

import LoadingPage from "../../../components/LoadingPage";
import { wrapper } from "../../../redux/store";
import { getAllKategori } from "../../../redux/actions/publikasi/kategori.actions";

const Tambah = dynamic(
  () => import("../../../components/content/publikasi/kategori/tambah"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title='Tambah Kategori'>
                    <Tambah />
                </Layout> */}
        <Tambah />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, req }) => {

  const session = await getSession({ req });
  console.log(`from artikel create ${session}`)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await store.dispatch(getAllKategori(session.user.user.data.token))

  return {
    props: { session, title: "Tambah Kategori - Publikasi" },
  }
})



// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session, title: "Tambah Kategori - Publikasi" },
//   };
// }
