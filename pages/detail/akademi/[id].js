import DetailAkademi from "../../../user-component/content/detail/kategori/akademi/detail-akademi";

import { wrapper } from "../../../redux/store";
import { getDetailAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { getAllPelatihanByAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";

export default function DetailAkademiPelatihan () {
    return (
        <div>
            <DetailAkademi />
        </div>
    )
}

// export async function getServerSideProps(context) {
//     // const session = await getSession({ req: context.req });
//     // if (session) {
//     //   return {
//     //     redirect: {
//     //       destination: "/dashboard",
//     //       permanent: false,
//     //     },
//     //   };
//     // }
  
//     return {
//       props: {
//         title:"Detail Akademi", data: "auth",
//       },
//     };
// }

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ params, req }) => {
  await store.dispatch(
    getDetailAkademi(params.id)
  );

  await store.dispatch (
    getAllPelatihanByAkademi(
      params.id,
      params.tema_id,
      params.provinsi,
      params.tipe_pelatihan,
      params.penyelenggara,
      params.kategori_peserta,
      params.kata_kunci,
      params.tanggal_mulai,
      params.tanggal_akhir,
    )
  )

  return {
    props: {
      title:"Detail Akademi", data: "auth",
    },
  };
})