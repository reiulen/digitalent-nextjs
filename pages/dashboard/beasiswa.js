import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
// import DashboardBeasiswa from "../../components/content/dashboard-kabadan/beasiswa/dashboard-beasiswa";

export default function DashboardBeasiswaPage() {
  const DashboardBeasiswa = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/beasiswa/dashboard-beasiswa"
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
