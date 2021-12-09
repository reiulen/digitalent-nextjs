import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllExportData } from "../../../redux/actions/site-management/export-data.actions";

const ListRole = dynamic(
  () =>
    import(
      "../../../components/content/site-management/export-data/list-export-data"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function RoleList(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListRole token={session.token} />
      </div>
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
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(getAllExportData(session.user.user.data.token, req.cookies.token_permission));

      return {
        props: { session, title: "Export Data - Site Management" },
      };
    }
);
