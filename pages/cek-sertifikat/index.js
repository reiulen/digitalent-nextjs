import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import { getTagBerandaBerita } from "../../redux/actions/beranda/berita.actions";
import { getAllAkademi } from "../../redux/actions/beranda/beranda.actions";
import { getCheckStatusSertifikat } from "../../redux/actions/beranda/check-sertifikat.actions";
import LoadingDetailAkademi from "../../user-component-new/components/loader/LoadingDetailAkademi";

const CekStatus = dynamic(
	() => import("../../user-component-new/content/home/cek_status/index"),
	{
		loading: function loadingNow() {
			return <LoadingDetailAkademi />;
		},
		ssr: false,
	}
);

const Layout = dynamic(
	() => import("../../user-component-new/components/template/Layout.component"),
	{ ssr: false }
);

export default function BerandaKontak(props) {
	let session = null;

	if (props.session) {
		session = props.session.user.user.data.user;
	}

	return (
		<>
			<div style={{ backgroundColor: "white" }}>
				<Layout title="Cek Sertifikat" session={session}>
					<CekStatus session={session}></CekStatus>
				</Layout>
			</div>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query, req }) => {
			const session = await getSession({ req });

			let sessionToken = session?.user.user.data.user.token;

			await store.dispatch(getDataPribadi(sessionToken));

			await store.dispatch(getAllAkademi());

			// console.log(query, "ini query");
			// }
			if (query.registrasi) {
				await store.dispatch(getCheckStatusSertifikat(query.registrasi));
			}

			return {
				props: {
					title: "Cek Sertifikat",
					data: "auth",
					session,
				},
			};
		}
);
