import React from "react";
import { getSession } from "next-auth/client";

import PusatInformasi from "../../../user-component/components/beranda/pusat-informasi";
import dynamic from "next/dynamic";
const Layout = dynamic(
  () => import("../../../components/wrapper/beranda.wrapper"),
  {
    ssr: false,
  }
);

export default function PusatInformasis() {
  return (
    <Layout title="Pusat Informasi">
      <PusatInformasi />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "http://dts-dev.majapahit.id/partnership/user/kerjasama",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      data: "auth",
      title: "Pusat Informasi - Peserta",
    },
  };
}
