import React from "react";

import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { getReviewStep2Revisi } from "../../../redux/actions/pelatihan/review.actions";
import { wrapper } from "../../../redux/store";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getDetailMasterPelatihan } from "../../../redux/actions/pelatihan/master-pendaftaran.action";

const ViewTraining = dynamic(
	() =>
		import(
			"../../../components/content/pelatihan/master-pendaftaran/view-master-pelatihan-id"
		),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

export default function ViewTrainingPage(props) {
	const session = props.session.user.user.data;
	return (
		<>
			<div className="d-flex flex-column flex-root">
				<ViewTraining token={session.token} />
			</div>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query, req, params }) => {
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
				getDetailMasterPelatihan(
					query.id,
					session.user.user.data.token,
					token_permission
				)
			);

			return {
				props: { session, title: "View Form Master Pendaftaran - Pelatihan" },
			};
		}
);
