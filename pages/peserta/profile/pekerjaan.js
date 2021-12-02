import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";

const Pekerjaan = dynamic(
  () =>
    import(
      "../../../user-component-new/content/peserta/profile/pekerjaan/index"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function PekerjaanPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Pekerjaan Peserta - Pelatihan" session={session}>
        <Pekerjaan session={session} />
      </Layout>
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
            destination: "http://dts-dev.majapahit.id/login",
            permanent: false,
          },
        };
      }
      const data = session.user.user.data;
      if (data.user.roles[0] !== "user") {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login",
            permanent: false,
          },
        };
      }
      await store.dispatch(getAllAkademi());

      return {
        props: { data: "auth", session, title: "Profile - Peserta" },
      };
    }
);
