import Layout from "../../../../components/templates/layout.component";
import EditMitra from "../../../../components/content/partnership/manajemen-mitra/edit";

export default function EditMitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Artikel">
          <EditMitra />
        </Layout>
      </div>
    </>
  );
}
