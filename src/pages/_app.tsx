import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { AppContextProvider } from "../contexts/mycontext";
import Loader from "../components/core/Loader";
import nProgress from "nprogress";
import Router from "next/router";
import "../styles/globals.css";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(true);
	const { isUser } = useUsers();
	console.log(isUser);
	useEffect(() => {
		const timeOutFunc = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			clearTimeout(timeOutFunc);
		};
	}, []);

	return (
		<AppContextProvider>
			<Loader visible={loading} />
			<Component {...pageProps} />
		</AppContextProvider>
	);
}

export default MyApp;
