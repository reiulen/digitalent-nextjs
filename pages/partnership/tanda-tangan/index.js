import Layout from "../../../components/templates/layout.component";
import TandaTangan from "../../../components/content/partnership/tanda-tangan/tableTandaTangan";

import { getAllTandaTangan } from "../../../redux/actions/partnership/tandaTangan.actions";
import { wrapper } from "../../../redux/store";

export default function TandaTanganPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <TandaTangan />
        </Layout>
      </div>
    </>
  );
}
