import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";

import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
const DetailDataKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/mitra/detailDataKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function DetailDataKerjasamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailDataKerjasama token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
      const session = await getSession({ req });
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
        props: { session, title: "Detail Data Mitra - Paretnership" },
      };
    }
);
