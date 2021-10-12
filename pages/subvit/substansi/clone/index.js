import Layout from "/components/templates/layout.component";
import StepOne from "/components/content/subvit/substansi/clone/step-one";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function CloneSoalSubtansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepOne token={session.token} />
      </div>
    </>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Clone Bank Soal Tes Subtansi - Subvit" },
      };
    }
);
