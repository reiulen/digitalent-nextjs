import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { dropdownAkademi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
// import AddTheme from "../../../components/content/pelatihan/theme/add-theme";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const AddTheme = dynamic(
  () => import("../../../components/content/pelatihan/theme/add-theme"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function AddThemePage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddTheme token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      const token_permission = req.cookies.token_permission;

      await store.dispatch(
        dropdownAkademi(session.user.user.data.token, token_permission)
      );

      return {
        props: { session, title: "Tambah Tema - Pelatihan" },
      };
    }
);
