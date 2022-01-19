import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

import {
	getListRevisi,
	getReviewStep3Revisi,
} from "../../../../../redux/actions/pelatihan/review.actions";

const ViewReviewCommitment = dynamic(
	() =>
		import(
			"../../../../../components/content/pelatihan/review/view/view-form-commitment"
		),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

export default function ViewReviewCommitmentPage(props) {
	const session = props.session.user.user.data;
	return (
		<>
			<div className="d-flex flex-column flex-root">
				<ViewReviewCommitment token={session.token} />
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
				getListRevisi(session.user.user.data.token, params.id, token_permission)
			);
			await store.dispatch(
				getReviewStep3Revisi(
					session.user.user.data.token,
					params.id,
					token_permission
				)
			);

			return {
				props: { session, title: "View Form Komitmen - Pelatihan" },
			};
		}
);
