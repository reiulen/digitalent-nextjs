import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
const RevisiListKerjasama = dynamic(
  () =>
    import(
      "../../../components/content/partnership/kerjasama/revisiListKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function RevisiSubmit(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <RevisiListKerjasama token={session.token} />
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
        props: { session, title: "Revisi List - Partnership" },
      };
    }
);
