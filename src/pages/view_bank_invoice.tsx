import React from "react";
import ViewBankInvoice from "../components/ViewBankInvoice";
import JoinOurTeam from "../components/JoinOurTeam";
import Login from "../components/Login";
import WarrantyForm from "../components/WarrantyForm";
import Header from "../components/Header";

const view_bank_invoice = () => {
	return (
		<div>
			<Header />
			<ViewBankInvoice />
		</div>
	);
};

export default view_bank_invoice;
