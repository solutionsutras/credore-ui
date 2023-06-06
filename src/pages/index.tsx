import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Login2 from "../components/Login2";
// Sahoo
import RegisterAccount from "../components/RegisterAccount";
import Dashboard from "../components/Dashboard";
import SignIn from "./signin";
import SignUp from "./signup";

const Home: NextPage = () => {
	return (
		<>
			<SignUp/>;
			{/* <SignUp/>; */}
			{/* <Dashboard/>; */}
		</>
	);
};

export default Home;
