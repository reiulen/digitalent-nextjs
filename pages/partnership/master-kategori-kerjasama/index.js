// import Layout from "../../../components/templates/layout.component";
// import LoadingPage from "../../../components/LoadingPage";
// import MasterKategoriKerjasama from "../../../components/content/partnership/master-kategori-kerjasama/masterKategoriKerjasama";

// import { fetchAllMKCooporation } from "../../../redux/actions/partnership/mk_cooporation.actions";
// import { wrapper } from "../../../redux/store";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const MasterKategoriKerjasama = dynamic(
  () =>
    import(
      "../../../components/content/partnership/master-kategori-kerjasama/masterKategoriKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function KategoriKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Master Kategori Kerjasama - Partnership"> */}
        <MasterKategoriKerjasama />
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
        props: { session, title: "Master Kategori Kerjasama - Partnership" },
      };
    }
);
