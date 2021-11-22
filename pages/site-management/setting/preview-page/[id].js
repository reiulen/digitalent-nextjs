import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDetailPages } from "../../../../redux/actions/site-management/settings/page.actions";

const PreviewPage = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/settings/page/preview-page"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Pages(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root bg-white" style={{
        marginTop: "-25px",
      }}>
        <PreviewPage token={session.token} />
      </div>
    </>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params, req }) => {
//       const session = await getSession({ req });
//       if (!session) {
//         return {
//           redirect: {
//             destination:"/login/admin",
//             permanent: false,
//           },
//         };
//       }
//       return {
//         props: { session, title: "Preview Page - Site Management" },
//       };
//     }
// );

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDetailPages(params.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Preview Page - Site Management" },
      };
    }
);
