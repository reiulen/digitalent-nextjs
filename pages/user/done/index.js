import { getSession } from "next-auth/client";

import Done from "../../../user-component/content/done";

export default function SubvitDone() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Done />
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
      title: "Done",
    },
  };
}
