import EditTriviaBank from '../../../components/content/subvit/trivia/question-bank-soal/edit';
import Layout from '../../../components/templates/layout.component';

import { detailTriviaQuestionDetail } from '../../../redux/actions/subvit/trivia-question-detail.action';
import { wrapper } from '../../../redux/store';
import { getSession } from 'next-auth/client';

export default function EditTriviaBankPage(props) {
    const session = props.session.user.user.data;

    return (
        <>
            <div className="d-flex flex-column flex-root">
                <EditTriviaBank token={session.token} />
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
                detailTriviaQuestionDetail(
                    query.id,
                    session.user.user.data.token
                )
            );
            return {
                props: { session, title: 'Edit Trivia - Subvit' },
            };
        }
);
