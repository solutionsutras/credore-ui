import React from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Invoices from "../components/Invoices";
import Sidebar from "../components/Sidebar"

const dashboard = () => {
	return (
		<div>
			<Header />
			<Invoices />
		</div>
	);
};

export default dashboard;
