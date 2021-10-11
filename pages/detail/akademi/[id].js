import DetailAkademi from "../../../user-component/content/detail/kategori/akademi/detail-akademi";

export default function DetailAkademiPelatihan () {
    return (
        <div>
            <DetailAkademi />
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
        title:"Detail Akademi", data: "auth",
      },
    };
}