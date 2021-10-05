// import DashbardPublikasi from '../../components/content/publikasi/dashboard/dashboard'
// import Layout from '../../components/templates/layout.component'

// export default function Home() {
//     return (
//         <>
//             <div className="d-flex flex-column flex-root">
//                 <Layout title='Dashboard Publikasi'>
//                     <DashbardPublikasi />
//                 </Layout>
//             </div>
//         </>
//     )
// }

import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
// import Berita from "../../../components/content/publikasi/berita/berita";

import { getAllDashboardPublikasi } from "../../redux/actions/publikasi/dashboard-publikasi.actions";
import { wrapper } from "../../redux/store";
import { getSession } from "next-auth/client";

// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const DashboardPublikasi = dynamic(
  () =>
    import(
      "../../components/content/publikasi/dashboard-publikasi/dashboard-publikasi"
    ),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DashboardPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardPublikasi token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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
        getAllDashboardPublikasi(session.user.user.data.token)
      );
      return {
        props: { session, title: "Dashboard - Publikasi" },
      };
    }
);
