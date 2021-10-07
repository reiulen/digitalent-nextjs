import RecoveryPassword from "../../../../components/content/partnership/user/auth/recoveryPassword";
import { getSession } from "next-auth/client";

export default function RecoveryPasswordMitra() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <RecoveryPassword />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
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
      title: "Pemulihan Email - Partnership",
    },
  };
}
