import { getSession } from "next-auth/client";
import SubtansiUser from "../../../../user-component/content/subvit/subtansi";

export default function SubvitUserSubtansi() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <SubtansiUser />
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
      session,
      data: "auth",
      title: "User Subtansi",
    },
  };
}
