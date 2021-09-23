import StepTwo from "../../../../components/content/subvit/trivia/tambah/step-2-import";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

export default function TambahBankSoalTesTriviaStep2(props) {
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
    store =>
        async ({ req }) => {
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
                props: { session, title: "Step 2 Import - Subvit" },
            };
        }
);
