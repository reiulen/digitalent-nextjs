import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const TandaTangan = dynamic(
  () =>
    import(
      "../../../components/content/partnership/tanda-tangan/tableTandaTangan"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function TandaTanganPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TandaTangan token={session.token} />
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
