import EditTriviaStep2 from '../../../../components/content/subvit/trivia/edit/step-2';

import { getDetailTriviaQuestionBanks } from '../../../../redux/actions/subvit/trivia-question.actions';
import { wrapper } from '../../../../redux/store';

export default function EditTriviaStep2Page(props) {
    const session = props.session.user.user.data;

    return (
        <>
            <div className="d-flex flex-column flex-root">
                <EditTriviaStep2 token={session.token} />
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
                        destination: '/',
                        permanent: false,
                    },
                };
            }
            await store.dispatch(
                getDetailTriviaQuestionBanks(
                    query.id,
                    session.user.user.data.token
                )
            );
            return {
                props: { session, title: 'Edit Triva Step 2 - Subvit' },
            };
        }
);
