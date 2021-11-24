import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { getAllPermission } from '../../../../redux/actions/site-management/role.actions'
import { wrapper } from "../../../../redux/store";
import LoadingPage from "../../../../components/LoadingPage";

const TambahRole = dynamic(
  () =>
    import("../../../../components/content/site-management/role/tambah-role"),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function TambahRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TambahRole token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }
      
      await store.dispatch(getAllPermission(session.user.user.data.token))

      return {
        props: { session, title: "Tambah Role - Site Management" },
      };
    }
);
