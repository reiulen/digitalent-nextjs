import Layout from "../../../components/templates/layout.component";
import RevisiListKerjasama from "../../../components/content/partnership/kerjasama/revisiListKerjasama";

export default function RevisiSubmit() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Revisi List - Partnership">
          <RevisiListKerjasama />
        </Layout>
      </div>
    </>
  );
}
