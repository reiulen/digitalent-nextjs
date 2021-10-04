import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const ReviewDokumenKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/reviewDokumenKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function RevisiListPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ReviewDokumenKerjasama token={session.token} />
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
            destination: "/partnership/user/auth/login",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Review Kerjasama - Partnership" },
      };
    }
);
