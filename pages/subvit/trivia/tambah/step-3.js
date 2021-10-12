import StepThree from "/components/content/subvit/trivia/tambah/step-3";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

export default function TambahBankSoalTriviaStep3(props) {
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
        props: { session, title: "Step 3 - Subvit" },
      };
    }
);
