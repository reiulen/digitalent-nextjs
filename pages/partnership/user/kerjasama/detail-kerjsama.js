import Layout from "../../../../components/templates/layout.component";
import Detail from "../../../../components/content/partnership/user/detail-kerjasama";

export default function DetailPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Detail kerjasama  - Partnership">
          <Detail />
        </Layout>
      </div>
    </>
  );
}
