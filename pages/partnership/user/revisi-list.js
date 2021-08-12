import Layout from "../../../components/templates/layout.component";
import RevisiList from "../../../components/content/partnership/user/revisiList";

export default function RevisiListPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <RevisiList />
        </Layout>
      </div>
    </>
  );
}
