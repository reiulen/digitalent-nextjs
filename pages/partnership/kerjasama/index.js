import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import Layout from "../../../components/templates/layout.component";
// import Table from "../../../components/content/partnership/manajemen-kerjasama/tableKerjasama";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
const Table = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/tableKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Kerjasama - Partnership">
          <Table />
        </Layout>
      </div>
    </>
  );
}

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
//     props: { session },
//   };
// }

// KerjaSamaPage.displayName = "KerjaSamaPage";
