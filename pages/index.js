import { getSession } from "next-auth/client";

// import LoginAdmin from "../components/content/auth/admin/login";
import Beranda from "../user-component/content/beranda/beranda"

import { middlewareAuthAdminSession } from "../utils/middleware/authMiddleware";

import { wrapper } from "../redux/store";
import { getAllAkademi } from "../redux/actions/beranda/beranda.actions";
import { getTemaByAkademi } from "../redux/actions/beranda/beranda.actions";
import { getAllPublikasi } from "../redux/actions/beranda/beranda.actions"
// import { getPelatihanByTema } from "../redux/actions/beranda/beranda.actions";

export default function HomePage(props) {

  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <LoginAdmin /> */}
        <Beranda session = {session}/>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async({req}) => {

  await store.dispatch(
    getAllAkademi()
  );

  await store.dispatch (
    getTemaByAkademi()
  )

  await store.dispatch (
    getAllPublikasi()
  )

  // await store.dispatch (
  //   getPelatihanByTema()
  // )

  return {
    props: {
      data: "auth",
      session
    },
  };
})
