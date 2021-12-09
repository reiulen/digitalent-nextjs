import Layout from "/components/templates/layout.component";
import StepOne from "/components/content/subvit/substansi/tambah/step-1";
import { getSession } from "next-auth/client";
import {
  dropdownAkademi,
  dropdownPelatihan,
  dropdownPelatihanbyTema,
  dropdownTema,
  dropdownTemabyAkademi,
} from "../../../redux/actions/pelatihan/function.actions";
import { wrapper } from "../../../redux/store";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

export default function TambahBankSoalTesSubstansiStep1(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepOne token={session.token} />
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

      const permission = req.cookies.token_permission;

      await store.dispatch(
        dropdownAkademi(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "Tambah Bank Soal Test Substansi - Subvit" },
      };
    }
);
