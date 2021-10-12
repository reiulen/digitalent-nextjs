import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import Layout from "../../../../user-component/components/template/Layout.component";

const SubtansiUser = dynamic(
  () => import("../../../../user-component/content/subvit/subtansi"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function SubvitUserSubtansi() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tes Subtansi">
          <SubtansiUser />
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // const session = await getSession({ req: context.req });
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "http://dts-dev.majapahit.id/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      data: "auth",
      title: "User Subtansi",
    },
  };
}
