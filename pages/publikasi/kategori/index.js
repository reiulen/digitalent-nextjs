import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import Kategori from "../../../components/content/publikasi/kategori/kategori";

import {
  getAllKategori,
  paginationKategori,
} from "../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../redux/store";

// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Kategori = dynamic(
  () => import("../../../components/content/publikasi/kategori/kategori"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function KategoriPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/* <Layout title='Kategori - Publikasi'>
                    <Kategori />
                </Layout> */}
                <Kategori token={session.token}/>
            </div>
        </>
    )
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
      await store.dispatch(getAllKategori(session.user.user.data.token));
      await store.dispatch(
        paginationKategori(
          query.page,
          query.keyword,
          query.limit,
          query.publish,
          query.startdate,
          query.enddate,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "Kategori - Publikasi" },
      };
    }
);
