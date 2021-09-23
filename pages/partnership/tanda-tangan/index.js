// import Layout from "../../../components/templates/layout.component";
// import LoadingPage from "../../../components/LoadingPage";
// import TandaTangan from "../../../components/content/partnership/tanda-tangan/tableTandaTangan";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const TandaTangan = dynamic(
  () =>
    import(
      "../../../components/content/partnership/tanda-tangan/tableTandaTangan"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

// import { getAllTandaTangan } from "../../../redux/actions/partnership/tandaTangan.actions";

// import { wrapper } from "../../../redux/store";

export default function TandaTanganPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Tanda Tangan Digital - Partnership"> */}
        <TandaTangan />
        {/* </Layout> */}
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Tanda Tangan Digital - Partnership" },
      };
    }
);
