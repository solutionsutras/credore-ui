import React from "react";
import ViewInvoice from "../components/ViewInvoice";
import JoinOurTeam from "../components/JoinOurTeam";
import Login from "../components/Login";
import WarrantyForm from "../components/WarrantyForm";
import Header from "../components/Header";

const view_invoice = () => {
	return (
		<div>
			<Header />
			<ViewInvoice />
		</div>
	);
};

export default view_invoice;
