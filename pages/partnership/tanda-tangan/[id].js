import Layout from "../../../components/templates/layout.component";
import EditTandaTangan from "../../../components/content/partnership/tanda-tangan/edit";

import { getDetailTandaTangan } from "../../../redux/actions/partnership/tandaTangan.actions";
import { wrapper } from "../../../redux/store";

export default function EditTandaTanganPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Tanda Tangan">
          <EditTandaTangan />
        </Layout>
      </div>
    </>
  );
}
