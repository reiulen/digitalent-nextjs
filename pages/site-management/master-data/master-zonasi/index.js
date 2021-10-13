import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { dropdownProvinsi } from "../../../../redux/actions/pelatihan/function.actions";

const ListRole = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/master-data/master-zonasi/list-master-zonasi"
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

      // await store.dispatch(
      //   getAllRoles(
      //     query.page,
      //     query.keyword,
      //     query.limit,
      //     session.user.user.data.token
      //   )
      // );

      await store.dispatch(dropdownProvinsi(session.user.user.data.token));

      return {
        props: { session, title: "Master Zonasi - Site Management" },
      };
    }
);
