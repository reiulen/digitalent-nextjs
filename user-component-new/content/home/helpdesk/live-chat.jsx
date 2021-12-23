import React from "react";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Script from "next/script";
import Sidebar from "../../../components/template/helpdesk/index";

export default function FormPengaduan() {
	const router = useRouter();

	return (
		<Container fluid className="px-md-17 px-10 py-10 bg-white">
			<SubHeaderComponent data={[{ link: router.asPath, name: "Bantuan" }]} />
			<Sidebar>
				<h1 className={`font-weight-boldest text-blue-primary mb-15 `}>
					Live Chat
				</h1>
				<div className="h-700px d-flex justify-content-start">
					<iframe
						src="https://chat.sociomile.com/livechat/61b28d9773bedb57087fe462"
						width="700px"
						// height="100%"
						className=" mt-n10 p-0 border-0 ml-n29"
					/>
				</div>
			</Sidebar>
		</Container>
	);
}
