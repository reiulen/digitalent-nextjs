import dynamic from "next/dynamic";
import Layout from "/components/templates/layout.component";
// import StepTwo from "../../../../components/content/subvit/survey/tambah/step-2-import";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const StepTwo = dynamic(
  () => import("../../../../components/content/subvit/survey/tambah/step-2-import"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
export default function TambahBankSoalTesSurveyStep2(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTwo token={session.token} tokenPermission={props.permission} />
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

      const permission = req.cookies.token_permission;

      return {
        props: {
          session,
          title: "Tambah Bank Soal Tes Survey - Subvit",
          permission,
        },
      };
    }
);
