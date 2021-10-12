import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";

const Penandatanganan = dynamic(
  () =>
    import(
      "../../../components/content/partnership/tanda-tangan/Penandatanganan"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function PenandatangananPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Penandatanganan token={session.token} />
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
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Penandatanganan - Partnership" },
      };
    }
);
