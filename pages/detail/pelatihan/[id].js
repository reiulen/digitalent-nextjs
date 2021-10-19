import DetailPelatihan from "../../../user-component/content/detail/kategori/pelatihan/detail-pelatihan"

export default function DetailKategori () {
    return (
        <div>
            <DetailPelatihan />
        </div>
    )
}

export async function getServerSideProps(context) {
    // const session = await getSession({ req: context.req });
    // if (session) {
    //   return {
    //     redirect: {
    //       destination: "/dashboard",
    //       permanent: false,
    //     },
    //   };
    // }
  
    return {
      props: {
        title:"Detail Pelatihan", data: "auth",
      },
    };
  }