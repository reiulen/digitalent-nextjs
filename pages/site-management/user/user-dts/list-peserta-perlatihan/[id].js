import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import {getDetailPesertaManage} from '../../../../../redux/actions/site-management/user/peserta-dts'

const ListUser = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/peserta-dts/detail-list-peserta-pelatihan"
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

      // await store.dispatch(
      //   getAllRoles(
      //     session.user.user.data.token,
      //     query.id
      //   )
      // );

      await store.dispatch(
        getDetailPesertaManage(
          session.user.user.data.token,
          query.id
        )
      );

      return {
        props: {
          session,
          title: "Detail Peserta Pelatihan DTS - Site Management",
        },
      };
    }
);
