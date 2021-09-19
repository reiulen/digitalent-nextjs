import Layout from "../../../../components/templates/layout.component";
import Pembahasan from "../../../../components/content/partnership/user/pembahasan";

export default function PembahasanPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Pembahasan - Partnership">
          <Pembahasan />
        </Layout>
      </div>
    </>
  );
}
