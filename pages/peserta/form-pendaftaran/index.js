import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { useDispatch, useSelector } from "react-redux";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import {
  getFormBuilder,
  getPelatihan,
  getFormRegister,
  storeFormRegister,
} from "../../../redux/actions/pelatihan/register-training.actions";

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

const IndexForm = dynamic(
  () =>
    import(
      "../../../user-component/content/peserta/form-pendaftaran/index-form"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function FormPendaftaran(props) {
  const dispatch = useDispatch();
  const session = props.session.user.user.data.user;
  const { error: errorFormBuilder, formBuilder: dataForm } = useSelector(
    (state) => state.getFormBuilder
  );

  useEffect(() => {
    let data = {
      komitmen: false,
      form_pendaftaran: [],
    };
    dataForm &&
      dataForm.FormBuilder.map((row, i) => {
        data.form_pendaftaran.push({
          key: row.key,
          name: row.name,
          type: row.element,
          size: row.size,
          option: row.option,
          dataOption: row.dataOption,
          required: row.required,
          fileName: "",
          value: "",
        });
      });
    dispatch(storeFormRegister(data));
  }, [dataForm]);
  return (
    <>
      <Layout title="Form Pendaftaran Peserta - Pelatihan" session={session}>
        <IndexForm token={session.token} />
      </Layout>
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
            destination: "/login",
            permanent: false,
          },
        };
      }
      const data = session.user.user.data;
      if (data.user.roles[0] !== "user") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(getDataPribadi(session.user.user.data.user.token));
      await store.dispatch(
        getFormBuilder(session.user.user.data.user.token, query.id)
      );
      await store.dispatch(
        getPelatihan(session.user.user.data.user.token, query.id)
      );

      return {
        props: {
          data: "auth",
          session,
          title: "Form Pendaftaran Peserta - Pelatihan",
        },
      };
    }
);