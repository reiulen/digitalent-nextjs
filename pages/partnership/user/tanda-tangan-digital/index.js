import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { fetchSignature } from "../../../../redux/actions/partnership/user/tanda-tangan.actions";
const Table = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/tanda-tangan/table"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function IndexPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Table token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/mitra",
            permanent: false,
          },
        };
      }

      await store.dispatch(fetchSignature(session.user.user.data.token));

      return {
        props: { session, title: "Tanda tangan digital - Partnership" },
      };
    }
);
