import StepTwo from "/components/content/subvit/substansi/tambah/step-2-import";
import { getSession } from "next-auth/client";

export default function TambahBankSoalTesSubstansiStep2(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTwo token={session.token} />
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
