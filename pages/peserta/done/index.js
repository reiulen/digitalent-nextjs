import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../components/LoadingSkeleton";
import dynamic from "next/dynamic";

const Done = dynamic(() => import("../../../user-component/content/done"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function SubvitDone() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Selesai Tes">
          <Done />
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
      title: "Done",
    },
  };
}
