import Layout from "../../../components/templates/layout.component";
import InputKerjasama from "../../../components/content/partnership/user/inputKerjasama";

export default function inputKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <InputKerjasama />
        </Layout>
      </div>
    </>
  );
}
