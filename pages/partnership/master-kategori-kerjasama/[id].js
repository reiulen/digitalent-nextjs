import Layout from "../../../components/templates/layout.component";
import Edit from "../../../components/content/partnership/master-kategori-kerjasama/edit";

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Partnership">
          <Edit />
        </Layout>
      </div>
    </>
  );
}
