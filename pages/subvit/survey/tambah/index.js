import TambahSurveyStep1 from "../../../../components/content/subvit/survey/tambah/step-1";
import Layout from "../../../../components/templates/layout.component";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

export default function TambahSurveyStep1Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TambahSurveyStep1 token={session.token} />
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
        props: { session, title: "Tambah Survey - Subvit" },
      };
    }
);
