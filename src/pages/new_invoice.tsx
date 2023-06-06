import React from "react";
import NewInvoice from "../components/NewInvoice";
import JoinOurTeam from "../components/JoinOurTeam";
import Login from "../components/Login";
import WarrantyForm from "../components/WarrantyForm";
import Header from "../components/Header";

const new_invoice = () => {
	return (
		<div>
			<Header />
			<NewInvoice />
		</div>
	);
};

export default new_invoice;
