import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import {
  getAllBerandaBerita,
  getKategoriBerandaBerita,
  getTagBerandaBerita,
} from "../../redux/actions/beranda/berita.actions";

import {getDetailPages} from '../../redux/actions/site-management/settings/page.actions'
import { getAllAkademi } from "../../redux/actions/beranda/beranda.actions";

const Berita = dynamic(() =>
  import("../../user-component-new/content/home/lainnya/lainnya")
);

const Layout = dynamic(() =>
  import("../../user-component-new/components/template/Layout.component")
);

export default function BerandaBerita(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <div className="bg-white">
      <Layout title="Lainnya" session={session}>
        <Berita session={session}></Berita>
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(
        getDetailPages(params.id)
      );

      return {
        props: {
          title: "Lainnya",
          data: "auth",
          session,
        },
      };
    }
);
