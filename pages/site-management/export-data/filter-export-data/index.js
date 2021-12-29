import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { dropdownAkademi, dropdownPenyelenggara, dropdownProvinsi, getDropdownYear } from '../../../../redux/actions/pelatihan/function.actions'
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

const UbahRole = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/export-data/filter-export-data"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function UbahRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UbahRole token={session.token} name={session.user.name} />
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

      // await store.dispatch(
      //   getAllArtikel(
      //     query.page,
      //     query.keyword,
      //     query.limit,
      //     query.publish,
      //     query.startdate,
      //     query.enddate,
      //     session.user.user.data.token
      //   )
      // );

      await store.dispatch(getDropdownYear(session.user.user.data.token))
      await store.dispatch(dropdownAkademi(session.user.user.data.token))
      await store.dispatch(dropdownPenyelenggara(session.user.user.data.token))
      await store.dispatch(dropdownProvinsi(session.user.user.data.token))
      

      return {
        props: {
          session,
          title: "Filter Data - Site Management",
        },
      };
    }
);
