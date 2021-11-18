import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import {
  getAllBerandaBerita,
  getKategoriBerandaBerita,
  getTagBerandaBerita,
} from "../../redux/actions/beranda/berita.actions";
import { getAllAkademi } from "../../redux/actions/beranda/beranda.actions";

const Berita = dynamic(() =>
  import("../../user-component/content/beranda/berita")
);

const Layout = dynamic(() =>
  import("../../components/wrapper/beranda.wrapper")
);

export default function BerandaBerita(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <>
      <Layout title="Berita" session={session}>
        <Berita session={session}></Berita>
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(
        getAllBerandaBerita(
          query.page,
          query.keyword,
          query.limit,
          query.filterPublish,
          query.sort,
          query.category_id,
          query.category_name,
          query.category_akademi,
          query.tag
        )
      );

      await store.dispatch(getKategoriBerandaBerita());

      await store.dispatch(getAllAkademi());

      await store.dispatch(getTagBerandaBerita());

      return {
        props: {
          title: "Berita",
          data: "auth",
          session,
        },
      };
    }
);
