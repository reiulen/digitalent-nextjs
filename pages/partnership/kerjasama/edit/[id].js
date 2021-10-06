import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const EditDetailKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/kerjasama/editDokumentKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function editDokumenKerjasama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditDetailKerjasama token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Ubah Dokumen Kerjasama - Partnership" },
      };
    }
);
