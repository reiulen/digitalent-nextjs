import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import {
  getAllFaq,
  getKategoriBerandaFaq,
} from "../../redux/actions/beranda/faq-content.actions";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";

const FaqPage = dynamic(() =>
  import("../../user-component-new/content/home/faq/faq")
);

const Layout = dynamic(
  () => import("../../user-component-new/components/template/Layout.component"),
  { ssr: false }
);

export default function FaqDetail(props) {
  // let session = null;
  // if (props.session) {
  //     session = props.session.user.user.data.Token
  // }

  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <div className="bg-white">
      <Layout title="FAQ" session={session}>
        <FaqPage session={session} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(
        getAllFaq(
          query.pinned,
          query.category_name,
          query.keyword,
          sessionToken
        )
      );

      await store.dispatch(getKategoriBerandaFaq());

      return {
        props: {
          session,
          data: "auth",
          title: "FAQ",
        },
      };
    }
);
