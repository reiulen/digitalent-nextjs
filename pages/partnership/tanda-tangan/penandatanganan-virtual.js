import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const TtdVirtual = dynamic(
  () =>
    import(
      "../../../components/content/partnership/tanda-tangan/penandatangan-virtual"
    ),
  { loading: () => <LoadingPage /> }
);

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TtdVirtual />
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
        props: { session, title: "Tanda tangan virtual - Partnership" },
      };
    }
);
