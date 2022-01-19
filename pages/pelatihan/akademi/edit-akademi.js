import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import EditAcademy from "../../../components/content/pelatihan/academy/edit-academy";
import { getDetailAcademy } from "../../../redux/actions/pelatihan/academy.actions";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const EditAcademy = dynamic(
	() => import("../../../components/content/pelatihan/academy/edit-academy"),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

export default function EditAcademyPage(props) {
	const session = props.session.user.user.data;
	return (
		<>
			<div className="d-flex flex-column flex-root">
				<EditAcademy token={session.token} />
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
			const token_permission = req.cookies.token_permission;

			await store.dispatch(
				getDetailAcademy(
					query.id,
					session.user.user.data.token,
					token_permission
				)
			);

			return {
				props: { session, title: "Edit Akademi - Pelatihan" },
			};
		}
);
