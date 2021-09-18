import Layout from "../../../../components/templates/layout.component";
import Table from "../../../../components/content/partnership/user/table";

import { wrapper } from "../../../../redux/store";
import { reqCooperationUser } from "../../../../redux/actions/partnership/user/cooperation.actions";

export default function IndexPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <Table />
        </Layout>
      </div>
    </>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ query }) => {
//       await store.dispatch(
//         getMCooporationUserApi(query.page, query.keyword, query.limit)
//       );
//     }
// );

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(reqCooperationUser());
});
