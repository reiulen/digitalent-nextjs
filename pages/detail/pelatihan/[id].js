import DetailPelatihan from "../../../user-component/content/detail/kategori/pelatihan/detail-pelatihan"

import { wrapper } from "../../../redux/store";
import { getDetailPelatihan } from "../../../redux/actions/beranda/detail-pelatihan.actions";

export default function DetailKategori () {
    return (
        <div>
            <DetailPelatihan />
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ params, req }) => {

  await store.dispatch(
    getDetailPelatihan(params.id)
  );

  return {
    props: {
      title:"Detail Pelatihan", data: "auth",
    },
  };
})