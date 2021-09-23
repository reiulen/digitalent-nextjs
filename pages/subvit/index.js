import DashbardSubvit from "../../components/content/subvit/dashboard/dashboard-subvit";
// import Layout from "../../components/templates/layout.component";
import { getSession } from "next-auth/client";

export default function Dashboard() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <DashbardSubvit />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session, title: "Dashboard - Subvit" },
    };
}
