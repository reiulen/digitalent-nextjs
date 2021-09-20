import Layout from "../../../components/templates/layout.component";
import AjukanRevisiKerjasama from "../../../components/content/partnership/kerjasama/detailRevisiKerjasama";

export default function DetailRevisiKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Detail Data Kerjasama - Partnership">
          <AjukanRevisiKerjasama />
        </Layout>
      </div>
    </>
  );
}
