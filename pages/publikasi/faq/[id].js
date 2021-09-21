import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import EditFaq from "../../../components/content/publikasi/faq/edit";

import { getDetailFaq } from "../../../redux/actions/publikasi/faq.actions";
import { getAllKategoriInput } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";

const EditFaq = dynamic(
    () => import("../../../components/content/publikasi/faq/edit"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
);

export default function EditFaqPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <EditFaq token={session.token}/>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
      async ({ params, req }) => {
        const session = await getSession({ req });
        if (!session) {
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
        }
        await store.dispatch(getDetailFaq(params.id,  session.user.user.data.token));
        await store.dispatch(getAllKategoriInput("Faq",session.user.user.data.token))
  
        return {
          props: { session, title: "Edit Faq - Publikasi" },
      };
    }
);

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
//     await store.dispatch(getDetailFaq(params.id));
//     await store.dispatch(getAllKategoriInput("Faq"));
// });
