import ListTrivia from "/components/content/subvit/trivia/list-trivia";
import Layout from "/components/templates/layout.component";

export default function Trivia() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="List Test Trivia">
          <ListTrivia />
        </Layout>
      </div>
    </>
  );
}
