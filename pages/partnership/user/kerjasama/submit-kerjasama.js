import Layout from "../../../../components/templates/layout.component";
import SubmitKerjasama from "../../../../components/content/partnership/user/kerjasama/submitKerjasama";

export default function DetailKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Submit Kerjsama - Partnership">
          <SubmitKerjasama />
        </Layout>
      </div>
    </>
  );
}
