import React from "react";
import RequestFinance from "../components/RequestFinance";
import JoinOurTeam from "../components/JoinOurTeam";
import Login from "../components/Login";
import WarrantyForm from "../components/WarrantyForm";
import Header from "../components/Header";

const view_invoice = () => {
	return (
		<div>
			<Header />
			<RequestFinance />
		</div>
	);
};

export default view_invoice;
