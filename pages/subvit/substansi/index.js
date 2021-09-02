import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Layout from "../../../components/templates/layout.component";
import LoadingPage from "../../../components/LoadingPage";
// import ListSubstansi from '../../../components/content/subvit/substansi/list-substansi'
const ListSubstansi = dynamic(
  () => import("../../../components/content/subvit/substansi/list-substansi"),
  { loading: () => <LoadingPage /> }
);

import { getAllSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../redux/store";

export default function Substansi() {
  //   const [loader, setLoader] = useState(true);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoader(false);
  //     }, 2000);
  //   }, [setLoader]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="List Test Substansi">
          {/* {loader ? <LoadingPage loading={true} /> : <ListSubstansi />} */}
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
