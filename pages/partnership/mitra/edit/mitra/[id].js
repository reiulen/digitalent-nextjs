import dynamic from "next/dynamic";
import LoadingPage from "../../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../../redux/store";
const DetailDataKerjasamaById = dynamic(
  () =>
    import(
      "../../../../../components/content/partnership/mitra/editKerjasamaById"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);
export default function DetailDataKerjasamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailDataKerjasamaById token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: {
          session,
          title: "Ubah Data Master Mitra Kerjasama - Paretnership",
        },
      };
    }
);
