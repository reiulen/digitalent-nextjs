import Layout from "../../../../components/templates/layout.component";
import RevisiSubmit from "../../../../components/content/partnership/user/revisiSubmit";

export default function RevisiSubmitPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Pembahasan - Partnership">
          <RevisiSubmit />
        </Layout>
      </div>
    </>
  );
}
