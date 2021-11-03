import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";

// import LoginAdmin from "../components/content/auth/admin/login";
// import Beranda from "../user-component/content/beranda/beranda"
// import Wrapper from "../"

import { wrapper } from "../redux/store";
import { getAllAkademi } from "../redux/actions/beranda/beranda.actions";
import { getTemaByAkademi } from "../redux/actions/beranda/beranda.actions";
import { getAllPublikasi } from "../redux/actions/beranda/beranda.actions";
import { getDataPribadi } from "../redux/actions/pelatihan/function.actions";

import LoadingLanding from "../user-component/components/loader/LandingLoader";

const Beranda = dynamic(
  () => import("../user-component/content/beranda/beranda"),
  {
    loading: function loadingNow() {
      return <LoadingLanding />;
    },
    ssr: false,
  }
);
const Layout = dynamic(() => import("../components/wrapper/beranda.wrapper"), {
  ssr: false,
});

export default function HomePage(props) {
  let session = null;
  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Digitalent" session={session}>
          <Beranda session={session} />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      if (session) {
        await store.dispatch(
          getDataPribadi(session?.user.user.data.user.token)
        );
      }

      await store.dispatch(getAllAkademi());

      await store.dispatch(getTemaByAkademi());

      await store.dispatch(getAllPublikasi());

      return {
        props: {
          data: "auth",
          session,
        },
      };
    }
);
