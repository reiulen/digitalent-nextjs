import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const Detail = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/kerjasama/detail-dokumen-kerjsama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function DetailPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Detail token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/login/mitra",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Detail kerjasama  - Partnership" },
      };
    }
);
