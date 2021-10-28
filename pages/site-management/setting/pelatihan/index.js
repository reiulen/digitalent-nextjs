import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { getAllPage } from "../../../../redux/actions/site-management/settings/page.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const Pelatihan = dynamic(
  () =>
    import("../../../../components/content/site-management/settings/page/pelatihan"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Pages(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Pelatihan token={session.token} />
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

      await store.dispatch(getAllPage(session.user.user.data.token));
      return {
        props: { session, title: "Pelatihan - Site Management" },
      };
    }
);
