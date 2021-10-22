import { getSession } from "next-auth/client";

import LoginAdmin from "../components/content/auth/admin/login";
import Beranda from "../user-component/content/beranda/beranda"

import { wrapper } from "../redux/store";
import { getAllAkademi } from "../redux/actions/beranda/beranda.actions";
import { getTemaByAkademi } from "../redux/actions/beranda/beranda.actions";
// import { getPelatihanByTema } from "../redux/actions/beranda/beranda.actions";

export default function HomePage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <LoginAdmin /> */}
        <Beranda />
      </div>
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async({ query, req }) => {
  await store.dispatch(
    getAllAkademi()
  );

  await store.dispatch (
    getTemaByAkademi()
  )

  // await store.dispatch (
  //   getPelatihanByTema()
  // )

  return {
    props: {
      data: "auth",
    },
  };
})
