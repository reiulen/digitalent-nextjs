import Layout from "../../../components/templates/layout.component";
import MasterKategoriKerjasama from "../../../components/content/partnership/master-kategori-kerjasama/masterKategoriKerjasama";

// import { fetchAllMKCooporation } from "../../../redux/actions/partnership/mk_cooporation.actions";
// import { wrapper } from "../../../redux/store";

export default function KategoriKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <MasterKategoriKerjasama />
        </Layout>
      </div>
    </>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ query }) => {
//       await store.dispatch(
//         fetchAllMKCooporation(query.page, query.keyword, query.limit)
//       );
//     }
// );
