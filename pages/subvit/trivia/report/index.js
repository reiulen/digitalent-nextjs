import ReportTrivia from "../../../../components/content/subvit/trivia/report-trivia";

import { allReportTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function ReportTriviaPage(props) {
    const session = props.session.user.user.data;

    return (
        <>
            <div className="d-flex flex-column flex-root">
                <ReportTrivia token={session.token} />
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

            await store.dispatch(
                allReportTriviaQuestionBanks(
                    query.id,
                    query.page,
                    query.keyword,
                    query.limit,
                    query.card,
                    session.user.user.data.token
                )
            );
            return {
                props: { session, title: "Report Trivia - Subvit" },
            };
        }
);
