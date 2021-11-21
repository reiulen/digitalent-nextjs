import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import DashboardSimonas from "../../components/content/dashboard-kabadan/simonas/dashboard-simonas";

export default function DashboardSimonasPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardSimonas />
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
