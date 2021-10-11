import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { getAllPage } from "../../../../redux/actions/site-management/settings/page.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const Page = dynamic(
  () =>
    import("../../../../components/content/site-management/settings/page/page"),
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
        <Page token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      await store.dispatch(getAllPage(session.user.user.data.token));
      return {
        props: { session, title: "Page - Site Management" },
      };
    }
);
