import React, { Suspense } from "react";

import dynamic from "next/dynamic";
// import Layout from "../../../components/templates/layout.component";
// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListSubstansi from "../../../components/content/subvit/substansi/list-substansi";
const Layout = dynamic(() =>
  import("../../../components/templates/layout.component")
);
// const ListSubstansi = dynamic(
//   () => import("../../../components/content/subvit/substansi/list-substansi"),
//   { loading: () => <LoadingSkeleton />, ssr: false }
// );

import { getAllSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../redux/store";

export default function Substansi() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="List Test Substansi">
          <ListSubstansi />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(
        getAllSubtanceQuestionBanks(query.page, query.keyword, query.limit)
      );
    }
);
