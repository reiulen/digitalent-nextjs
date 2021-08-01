import EditTriviaStep1 from "../../../../components/content/subvit/trivia/edit/step-1";
import Layout from "../../../../components/templates/layout.component";

export default function EditTriviaStep1Page() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Test Trivia - Step 1">
          <EditTriviaStep1 />
        </Layout>
      </div>
    </>
  );
}
