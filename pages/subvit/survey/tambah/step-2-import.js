import Layout from "/components/templates/layout.component";
import StepTwo from '../../../../components/content/subvit/survey/tambah/step-2-import';

export default function TambahBankSoalTesSurveyStep2() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title="Tambah Bank Soal Tes Survey">
                    <StepTwo />
                </Layout>
            </div>
        </>
    );
}
