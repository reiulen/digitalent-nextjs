import Layout from "../../../components/templates/layout.component";
import dynamic from "next/dynamic";
// import LoadingPage from "../../../components/LoadingPage";
// import TandaTangan from "../../../components/content/partnership/tanda-tangan/tableTandaTangan";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
const TandaTangan = dynamic(
  () =>
    import(
      "../../../components/content/partnership/tanda-tangan/tableTandaTangan"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

// import { getAllTandaTangan } from "../../../redux/actions/partnership/tandaTangan.actions";

// import { wrapper } from "../../../redux/store";

export default function TandaTanganPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tanda Tangan Digital - Partnership">
          <TandaTangan />
        </Layout>
      </div>
    </>
  );
}

// TandaTanganPage.displayName = "TandaTanganPage";
