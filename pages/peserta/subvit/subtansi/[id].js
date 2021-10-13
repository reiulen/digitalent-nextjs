import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../redux/store";
import Layout from "../../../../user-component/components/template/Layout.component";

const SubtansiUser = dynamic(
  () => import("../../../../user-component/content/subvit/subtansi"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function SubvitUserSubtansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Test Substansi" session={session}>
          <SubtansiUser />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      // console.log(session.user.user.data); untuk cek role user
      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      const getRandomSoal = () => {
        axios
          .get(
            `http://dts-subvit-dev.majapahit.id/api/subtance-question-bank-details/random?training_id=1&theme_id=1&category=Test Substansi`
          )
          .then((res) => res.data.data);
      };

      return {
        props: {
          data: "auth",
          session,
          getRandomSoal,
          title: "Test Substansi",
        },
      };
    }
);
