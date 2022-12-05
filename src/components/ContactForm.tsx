import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "Yup";
import CountrySelector from "./CountrySelector";
import { motion } from "framer-motion";
import LocationSelector from "./LocationSelector";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import note from "../assets/animation/note.json";
import Lottie from "lottie-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
let dlpcId = uuidv4();
let refId = uuidv4();
const buttonVariants = {
	hover: {
		scale: 1.1,
		// textShadow: "0px 0px 8px rgb(255, 255, 255)",
		boxShadow: "0px 0px 8px rgb(255, 255, 255)",
		transition: {
			// yoyo: 10,
			// yoyo: Infinity,
			duration: 0.5,
		},
	},
};

type USER = {
	user: {
		email: string;
		orgLei: string;
		name: string;
	};
};

// const [orgli, setOrgli] = useState<string | null>();

const ContactForm = () => {
	const [open, setOpen] = React.useState(false);
	const [amount, setAmount] = useState("");
	const [currency, setCurrency] = useState("");
	const [date, setDate] = useState("");
	const [commiter, setCommiter] = useState("");
	const [commite, setCommite] = useState("");
	const [chain, setChain] = useState("");
	const [id, setId] = useState("");
	const [tx, setTx] = useState("");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	//  useEffect(() => {
	// const authStr = localStorage.getItem("user");

	// if (!authStr) return;
	// const auth: USER = JSON.parse(authStr);

	// const myEmail = auth.user.email;
	// console.log("Email", myEmail);
	// 	// setOrgli(myOrgli);
	// }, []);
	const formik = useFormik({
		initialValues: {
			committee: "",
			currency: "",
			amount: "",
			dueDate: "",
			chain: "",
			invoiceNumber: "",
			poNumber: "",
		},
		validationSchema: Yup.object({
			committee: Yup.string()
				.required("obligor Name Required.")
				.min(3, "Minimum 3 letter")
				.max(100, "Maximum 100 letter"),

			currency: Yup.string()
				.required("currency Required.")
				.min(3, "Minimum 3 letter")
				.max(10, "Maximum 100 letter"),
			chain: Yup.string().required("Select Field."),
			amount: Yup.string()
				.min(1, "Must be more than 1 characters")
				.required("This field is requried"),

			dueDate: Yup.date().required("Date is required"),
			invoiceNumber: Yup.string().required("Invoice Number required"),
			poNumber: Yup.string().required("Po Number required"),
		}),

		onSubmit: async (values) => {
			const authStr = localStorage.getItem("user");

			if (!authStr) return;
			const auth: USER = JSON.parse(authStr);

			const myOrgli = auth.user.orgLei;
			console.log("orgli", myOrgli);
			const myEmail = auth.user.email;
			console.log("Email", myEmail);

			console.log(values);
			try {
				const result = await fetch(
					`http://credore.eastus.cloudapp.azure.com/dlpc/${myEmail}/${values.chain}`,
					{
						method: "POST",
						body: JSON.stringify({
							dlpcId: dlpcId,
							originatorId: `LEI=${myOrgli}|SYSTIME=2022-11-19T02:00:58.900Z`,
							refID: refId,
							committer: `LEI=${myOrgli}`,
							committee: `LEI=${values.committee}`,
							currency: values.currency,
							amount: values.amount,
							commitmentDate: new Date().toISOString(), //toISOString()
							dueDate: moment(values.dueDate).toISOString(), //"2022-11-19T02:00:58.900Z",
							commitmentState: "INITIATED",
							dischargeState: "OPEN",
							dischargeDate: new Date().toISOString(),
							applicableRules:
								"Name=BAFT_BEST_PRACTICES|Version=VERSION_2.1_DATED_APRIL_2020|URL=https://www.baft.com/dlpc/1234567890",
							invoiceNumber: values.invoiceNumber,
							poNumber: values.poNumber,
							// plan: values.plan,
							chain: values.chain,
						}),
						headers: {
							"Content-type": "application/json; charset=UTF-8",
						},
					}
				);
				const response = await result.json();
				console.log(response);
				setAmount(response.dlpc.amount);
				setCurrency(response.dlpc.currency);
				setDate(response.dlpc.dueDate);
				setCommiter(response.dlpc.committer);
				setCommite(response.dlpc.committee);
				setId(response.dlpc.dlpcId);
				setChain(response.chain);
				setTx(response.txHash);
				localStorage.setItem("pNote", response);
				const pnote = localStorage.getItem("pNote");
				// console.log(pnote);
				// location.href = "/dashboard";
				// confirm("sure");
				formik.resetForm();
				handleClickOpen();
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<div className=" w-[60vw] flex  m-auto border-2 border-orange-500 rounded-lg bg-[#29564b]">
			<div className="w-1/2 p-3 bg-white">
				<form onSubmit={formik.handleSubmit}>
					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Drawee
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
								formik.touched.committee && Boolean(formik.errors.committee)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="text"
							name="committee"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.committee}
							placeholder="Drawee"
						/>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.committee && formik.errors.committee}
						</span>
					</div>
					<div className=" w-full">
						<label className="mb-2 block text-sm font-bold text-black ">
							Chain *
						</label>

						<select
							className={`block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
								formik.touched.chain && Boolean(formik.errors.chain)
									? "dark:border-red-600"
									: "dark:border-gray-400"
							}`}
							name="chain"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.chain}
						>
							<option value="" disabled selected>
								Chain
							</option>
							<option value="ethereum">ethereum</option>
							<option value="xinfin">xinfin</option>
							<option value="polygon">polygon</option>
							<option value="hedera">hedera</option>
						</select>
						<span className="text-base font-bold text-red-600">
							{formik.touched.chain && formik.errors.chain}
						</span>
					</div>

					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Invoice Number
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
								formik.touched.invoiceNumber &&
								Boolean(formik.errors.invoiceNumber)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="text"
							name="invoiceNumber"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.invoiceNumber}
							placeholder="Invoice Number"
						/>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.invoiceNumber && formik.errors.invoiceNumber}
						</span>
					</div>

					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							PO Number
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
								formik.touched.poNumber && Boolean(formik.errors.poNumber)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="text"
							name="poNumber"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.poNumber}
							placeholder="PO Number"
						/>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.poNumber && formik.errors.poNumber}
						</span>
					</div>

					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Currency
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
								formik.touched.currency && Boolean(formik.errors.currency)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="text"
							name="currency"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.currency}
							placeholder="Enter currency"
						/>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.currency && formik.errors.currency}
						</span>
					</div>
					<div className=" mt-4 w-full pt-2 md:mt-0">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Amount
						</label>
						<div className="flex w-full flex-col gap-3 md:flex-row">
							<input
								className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 md:w-3/4 lg:w-full  ${
									formik.touched.amount && Boolean(formik.errors.amount)
										? "dark:border-red-600"
										: "border-gray-300"
								}`}
								type="text"
								name="amount"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.amount}
								placeholder="Enter amount"
							/>
						</div>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.amount && formik.errors.amount}
						</span>
					</div>
					<div className="mt-4 w-full">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Due Date
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
								formik.touched.dueDate && Boolean(formik.errors.dueDate)
									? "dark:border-red-600"
									: "border-gray-300"
							}`}
							type="date"
							name="dueDate"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.dueDate}
							placeholder="Date"
						/>
						<span className="text-xs font-light text-red-600">
							{formik.touched.dueDate && formik.errors.dueDate}
						</span>
					</div>

					<div className="mt-6">
						<motion.button
							variants={buttonVariants}
							whileHover="hover"
							className="primary-inset rounded-lg px-5 py-3 font-medium text-white bg-[#3e1f92]"
							type="submit"
							disabled={formik.isSubmitting}
						>
							<p>Submit</p>
						</motion.button>
					</div>
				</form>
			</div>
			<div className="w-1/2 flex flex-col justify-center items-center">
				<div className="flex justify-center items-center">
					<h1 className="text-white text-3xl font-bold ">New pNote</h1>
				</div>
				{/* <Lottie className="w-96" animationData={note} loop={true} /> */}
			</div>
			<div>
				{/* <Button variant="outlined" onClick={handleClickOpen}>
					Open alert dialog
				</Button> */}
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Promissory note details
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<h1>Promissory Note Initiated {id.slice(0, 8)}...</h1>
							<p>By LEI - {commiter}</p>
							<p>Amount- {amount}</p>
							<p>Currency- {currency}</p>
							<p>Due date- {date}</p>
							<p>Drawee- {commite}</p>
							<p>Blockchain- {chain}</p>
							<p>
								TX details-
								<a
									className="underline decoration-blue-500"
									target="_blank"
									href={tx}
								>
									{tx}
								</a>
							</p>
							{/* <p>TX details- {tx}</p> */}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default ContactForm;
