import dynamic from "next/dynamic";
import LoadingPage from "../../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../../redux/store";

const PageDetail = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/peserta-dts/detail-peserta-dts"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function DetailPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <PageDetail token={session.token} />
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
        props: {
          session,
          title: "Detail Peserta DTS - Site Management",
        },
      };
    }
);
