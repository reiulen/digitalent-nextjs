import StepThree from "../../../components/content/subvit/substansi/tambah/step-3.jsx";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware.js";

export default function TambahBankSoalTesSubstansiStep3(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepThree token={session.token} />
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
