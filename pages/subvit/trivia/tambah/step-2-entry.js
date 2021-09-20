import StepTwo from '/components/content/subvit/trivia/tambah/step-2-entry';

import { getOneTriviaQuestionBanks } from '../../../../redux/actions/subvit/trivia-question.actions';
import { wrapper } from '../../../../redux/store';

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
        async ({ query, req }) => {
            const session = await getSession({ req: context.req });
            if (!session) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                };
            }
            await store.dispatch(getOneTriviaQuestionBanks(query.id));
            return {
                props: { session, title: 'Step 2 Entry - Subvit' },
            };
        }
);
