import StepTwo from "/components/content/subvit/substansi/tambah/step-2-import";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

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
        destination: "http://dts-dev.majapahit.id/login/admin",
        permanent: false,
      },
    };
  }

  const middleware = middlewareAuthAdminSession(session);
  if (!middleware.status) {
    return {
      redirect: {
        destination: middleware.redirect,
        permanent: false,
      },
    };
  }

  return {
    props: { session, title: "Tambah Bank Soal Test Substansi - Subvit" },
  };
}
