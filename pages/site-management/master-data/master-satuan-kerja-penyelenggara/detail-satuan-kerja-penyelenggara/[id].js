import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "../../../../../components/LoadingPage";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import { getDetailUnitWork } from "../../../../../redux/actions/site-management/unit-work.actions";

const ListRole = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/master-data/master-satuan-kerja-penyelenggara/detail"
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

      await store.dispatch(
        getDetailUnitWork(params.id, session.user.user.data.token, req.cookies.token_permission)
      );

      return {
        props: {
          session,
          title: "Detail Satuan Kerja Penyelenggara - Site Management",
        },
      };
    }
);
