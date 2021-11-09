import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import { getDetailMitraSite } from "../../../../../redux/actions/site-management/user/mitra-site.actions";
const ListUser = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/mitra/edit-mitra"
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
        getDetailMitraSite(params.id, session.user.user.data.token)
      );

      return {
        props: {
          session,
          title: "Edit Mitra - Site Management",
        },
      };
    }
);
