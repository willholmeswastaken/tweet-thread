import type { NextPage } from "next";
import { requireAuth } from "../utils/requireAuth";

export const getServerSideProps = requireAuth(async (_) => {
    return { props: {} };
}, 'dashboard');

const Dashboard: NextPage = () => {
    return (
        <div>
            Hello world
        </div>
    )
}

export default Dashboard;
