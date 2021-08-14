import Layout from "../../../components/templates/layout.component";
import Edit from "../../../components/content/partnership/tanda-tangan/edit";

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <Edit />
        </Layout>
      </div>
    </>
  );
}
