import Beranda from "../user-component/content/beranda/beranda"
import { getSession } from "next-auth/client";

export default function DashboardPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Beranda />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "http://dts-dev.majapahit.id/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: "auth",
    },
  };
}
