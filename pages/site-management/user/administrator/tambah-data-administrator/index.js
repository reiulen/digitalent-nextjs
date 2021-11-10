import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllUnitWork } from "../../../../../redux/actions/site-management/unit-work.actions";
import { getAllRoles } from "../../../../../redux/actions/site-management/role.actions";
const ListUser = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/administrator/tambah-data-administrator"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function UserList(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListUser token={session.token} />
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

      await store.dispatch(getAllUnitWork(session.user.user.data.token));

      await store.dispatch(getAllRoles(session.user.user.data.token));

      return {
        props: {
          session,
          title: "Tambah data administrator - Site Management",
        },
      };
    }
);
