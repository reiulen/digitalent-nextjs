import StepOne from "/components/content/subvit/trivia/tambah/step-1";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function TambahBankSoalTesTriviaStep1(props) {
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
    store =>
        async ({ query, req }) => {
            const session = await getSession({ req });
            if (!session) {
                return {
                    redirect: {
                        destination: "/",
                        permanent: false,
                    },
                };
            }
            return {
                props: { session, title: "Step 1 - Subvit" },
            };
        }
);
