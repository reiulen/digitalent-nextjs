import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import DashboardDigitalent from "../../components/content/dashboard-kabadan/digitalent/dashboard-digitalent";

export default function DashboardDigitalentPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardDigitalent />
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
