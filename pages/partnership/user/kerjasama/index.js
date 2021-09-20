// import Layout from "../../../../components/templates/layout.component";
// import Table from "../../../../components/content/partnership/user/kerjasama/table";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const Table = dynamic(
  () =>
    import("../../../../components/content/partnership/user/kerjasama/table"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function IndexPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Kerjasama - Partnership"> */}
        <Table />
        {/* </Layout> */}
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Kerjasama - Partnership" },
      };
    }
);
