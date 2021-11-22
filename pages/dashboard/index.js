import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
// import DashboardDigitalent from "../../components/content/dashboard-kabadan/digitalent/dashboard-digitalent";
import dynamic from "next/dynamic";

export default function DashboardDigitalentPage() {
  const DashboardDigitalent = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/digitalent/dashboard-digitalent"
      ),
    { ssr: false }
  );
  const MyMap = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/component/map-digitalent.component"
      ),
    { ssr: false }
  );

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div id="map" style={{ display: "none" }}>
          <MyMap />
        </div>
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
