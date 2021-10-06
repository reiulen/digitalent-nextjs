import Layout from "../../../../components/templates/layout.component";
import StepThree from "../../../../components/content/subvit/survey/tambah/step-3";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

export default function TambahBankSoalTesSurveyStep3(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepThree token={session.token} />
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
        props: { session, title: "Tambah Bank Soal Tes Survey - Subvit" },
      };
    }
);
