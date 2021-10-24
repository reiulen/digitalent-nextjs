import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";

// import LoginAdmin from "../components/content/auth/admin/login";
// import Beranda from "../user-component/content/beranda/beranda"
// import Wrapper from "../"

import { wrapper } from "../redux/store";
import { getAllAkademi } from "../redux/actions/beranda/beranda.actions";
import { getTemaByAkademi } from "../redux/actions/beranda/beranda.actions";
import { getAllPublikasi } from "../redux/actions/beranda/beranda.actions";
// import { getPelatihanByTema } from "../redux/actions/beranda/beranda.actions";

const Beranda = dynamic(() =>
  import("../user-component/content/beranda/beranda")
);
const Wrapper = dynamic(() => import("../components/wrapper/beranda.wrapper"));

export default function HomePage(props) {
  let session = null;
  if (props.session) {
    session = props.session.user.user.data;
  }

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Wrapper title="Digitalent" session={session}>
          <Beranda session={session} />
        </Wrapper>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      // const middleware = middlewareAuthAdminSession(session);
      // if (!middleware.status) {
      //   return {
      //     redirect: {
      //       destination: middleware.redirect,
      //       permanent: false,
      //     },
      //   };
      // }

      await store.dispatch(getAllAkademi());

      await store.dispatch(getTemaByAkademi());

      await store.dispatch(getAllPublikasi());

      // await store.dispatch (
      //   getPelatihanByTema()
      // )

      return {
        props: {
          data: "auth",
          session,
        },
      };
    }
    
);
