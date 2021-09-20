import StepThree from "/components/content/subvit/substansi/tambah/step-3";
import { getSession } from "next-auth/client";

export default function TambahBankSoalTesSubstansiStep3() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepThree />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session, title: "Tambah Bank Soal Tes Substansi - Subvit" },
  };
}
