import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";

import { wrapper } from "../redux/store";
import { getAllAkademi } from "../redux/actions/beranda/beranda.actions";
import { getTemaByAkademi } from "../redux/actions/beranda/beranda.actions";
import { getAllPublikasi } from "../redux/actions/beranda/beranda.actions";
import { getDataPribadi } from "../redux/actions/pelatihan/function.actions";
import React, { useState } from "react";
import LoadingLandingPage from "../user-component-new/components/loader/LoadingLandingPage";

const Beranda = dynamic(
  () => import("../user-component-new/content/home/beranda/Beranda.component"),
  {
    loading: function loadingNow() {
      return <LoadingLandingPage />;
    },
    ssr: false,
  }
);
const Layout = dynamic(
  () => import("../user-component-new/components/template/Layout.component"),
  {
    ssr: false,
  }
);

export default function HomePage(props) {
  let session = null;
  if (props.session) {
    session = props.session.user.user.data.user;
  }
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
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
