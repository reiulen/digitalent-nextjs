import Layout from '/components/templates/layout.component';
import StepThree from '/components/content/subvit/trivia/tambah/step-3';
import { getSession } from 'next-auth/client';

export default function TambahBankSoalTriviaStep3(props) {
    const session = props.session.user.user.data;

    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title="Tambah Bank Soal Trivia">
                    <StepThree token={session.token} />
                </Layout>
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
                        destination: '/',
                        permanent: false,
                    },
                };
            }
            return {
                props: { session, title: 'Step 3 - Subvit' },
            };
        }
);
