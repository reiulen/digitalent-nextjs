import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import DashboardBeasiswa from "../../components/content/dashboard-kabadan/beasiswa/dashboard-beasiswa";

export default function DashboardBeasiswaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardBeasiswa />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

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
    props: {},
  };
}
