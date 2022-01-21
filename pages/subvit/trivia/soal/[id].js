import dynamic from "next/dynamic";
// import EditSoalSurvey from "../../../../components/content/subvit/survey/edit-soal-survey";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const EditSoalSurvey = dynamic(
  () => import("../../../../components/content/subvit/survey/edit-soal-survey"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditSoalSurveyPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <EditSoalSurvey />
            </div>
        </>
    );
}
