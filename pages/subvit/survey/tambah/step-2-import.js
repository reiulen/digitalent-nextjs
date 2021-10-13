import Layout from "/components/templates/layout.component";
import StepTwo from "../../../../components/content/subvit/survey/tambah/step-2-import";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

export default function TambahBankSoalTesSurveyStep2(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTwo token={session.token} />
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
        props: { session, title: "Tambah Bank Soal Tes Survey - Subvit" },
      };
    }
);
