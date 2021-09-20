import Layout from "../../../../components/templates/layout.component";
import Table from "../../../../components/content/partnership/user/kerjasama/table";

export default function IndexPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Kerjasama - Partnership">
          <Table />
        </Layout>
      </div>
    </>
  );
}
