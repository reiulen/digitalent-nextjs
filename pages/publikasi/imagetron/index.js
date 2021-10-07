import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import Imagetron from "../../../components/content/publikasi/imagetron/imagetron";

import { getAllImagetron } from "../../../redux/actions/publikasi/imagetron.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Imagetron = dynamic(
  () => import("../../../components/content/publikasi/imagetron/imagetron"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

<<<<<<< HEAD
export default function ImagetronPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title='Imagetron - Publikasi'> */}
        <Imagetron />
        {/* </Layout> */}
      </div>
    </>
  );
=======
export default function ImagetronPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/* <Layout title='Imagetron - Publikasi'> */}
                    <Imagetron token={session.token}/>
                {/* </Layout> */}
            </div>
        </>
    )
>>>>>>> 279f614e085680387383629b291de8e592fdb1c4
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
      await store.dispatch(
        getAllImagetron(
          query.page,
          query.keyword,
          query.limit,
          query.publish,
          query.startdate,
          query.enddate,
          session.user.user.data.token
        )
      );
      return {
        props: { session, title: "Imagetron - Publikasi" },
      };
    }
);
