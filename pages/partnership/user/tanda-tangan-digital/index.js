// import Layout from "../../../../components/templates/layout.component";
// import Table from "../../../../components/content/partnership/user/tanda-tangan/table";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const Table = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/tanda-tangan/table"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function IndexPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Tanda tangan digital - Partnership"> */}
        <Table token={session.token} />
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
            destination: "/partnership/user/auth/login",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Tanda tangan digital - Partnership" },
      };
    }
);
