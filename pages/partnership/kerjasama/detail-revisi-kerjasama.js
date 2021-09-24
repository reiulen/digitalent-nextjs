// import Layout from "../../../components/templates/layout.component";
// import DetailRevisi from "../../../components/content/partnership/kerjasama/detailRevisiKerjasama";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const DetailRevisi = dynamic(
  () =>
    import(
      "../../../components/content/partnership/kerjasama/detailRevisiKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function DetailRevisiKerjasama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Detail Revisi Kerjasama - Partnership"> */}
        <DetailRevisi token={session.token} />
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
        props: { session, title: "Detail Revisi Kerjasama - Partnership" },
      };
    }
);
