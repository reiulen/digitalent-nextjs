import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

const EditTandaTangan = dynamic(
  () =>
    import("../../../../components/content/partnership/user/tanda-tangan/edit"),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function EditTandaTanganPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditTandaTangan token={session.token} />
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
            destination:
              "http://dts-dev.majapahit.id/partnership/user/auth/login",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Ubah Tanda Tangan Digital - Partnership" },
      };
    }
);
