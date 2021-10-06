import Layout from "/components/templates/layout.component";
import Report from "../../../../components/content/subvit/substansi/report";
import { allReportSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function ReportPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Report token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        allReportSubtanceQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.pelatihan,
          query.status,
          query.nilai,
          query.card,
          session.user.user.data.token
        )
      );
      return {
        props: { session, title: "Report Bank Soal Tes Substansi - Subvit" },
      };
    }
);
