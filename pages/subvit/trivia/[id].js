import DetailTrivia from '../../../components/content/subvit/trivia/detail-trivia';

import { getAllTriviaQuestionDetail } from '../../../redux/actions/subvit/trivia-question-detail.action';
import { getDetailTriviaQuestionBanks } from '../../../redux/actions/subvit/trivia-question.actions';
import { wrapper } from '../../../redux/store';
import { getSession } from 'next-auth/client';

export default function DetailTriviaPage(props) {
    const session = props.session.user.user.data;

    return (
        <>
            <div className="d-flex flex-column flex-root">
                <DetailTrivia token={session.token} />
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    store =>
        async ({ params, query, req }) => {
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
                getAllTriviaQuestionDetail(
                    params.id,
                    query.page,
                    query.keyword,
                    query.limit,
                    session.user.user.data.token
                )
            );
            await store.dispatch(
                getDetailTriviaQuestionBanks(
                    params.id,
                    session.user.user.data.token
                )
            );
            return {
                props: { session, title: 'Detail Trivia - Subvit' },
            };
        }
);
