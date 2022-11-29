import React from "react";
import { useFormik } from "formik";
import * as Yup from "Yup";
import CountrySelector from "./CountrySelector";
import { motion } from "framer-motion";
import LocationSelector from "./LocationSelector";

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

const ContactForm = () => {
	const formik = useFormik({
		initialValues: {
			obligor: "",
			beneficiary: "",
			currency: "",
			amount: "",
			date: "",
			// country: "91",
			// message: "",
			// location: "",
		},
		validationSchema: Yup.object({
			obligor: Yup.string()
				.required("obligor Name Required.")
				.min(3, "Minimum 3 letter")
				.max(100, "Maximum 100 letter"),
			beneficiary: Yup.string()
				.required("beneficiary Name Required.")
				.min(3, "Minimum 3 letter")
				.max(100, "Maximum 100 letter"),
			currency: Yup.string()
				.required("currency Required.")
				.min(3, "Minimum 3 letter")
				.max(10, "Maximum 100 letter"),

			amount: Yup.number()
				.min(1, "Must be more than 1 characters")
				.required("This field is requried"),

			date: Yup.date().required("Date is required"),
		}),
		onSubmit: (values) => {
			console.log(values);
			formik.resetForm();
		},
	});

	return (
		<div className="p-3">
			<form onSubmit={formik.handleSubmit}>
				<div className=" flex w-full flex-col gap-3 md:flex-row">
					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Obligor
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
								formik.touched.obligor && Boolean(formik.errors.obligor)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="text"
							name="obligor"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.obligor}
							placeholder="Jane Doe"
						/>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.obligor && formik.errors.obligor}
						</span>
					</div>

					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Beneficiary
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
								formik.touched.beneficiary && Boolean(formik.errors.beneficiary)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="text"
							name="beneficiary"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.beneficiary}
							placeholder="Jane Doe"
						/>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.beneficiary && formik.errors.beneficiary}
						</span>
					</div>
				</div>
				<div className="flex w-full flex-col gap-3 md:flex-row">
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
							placeholder="Jane Doe"
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
								type="number"
								name="amount"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.amount}
								placeholder="Enter phone number"
							/>
						</div>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.amount && formik.errors.amount}
						</span>
					</div>
				</div>
				<div className="mt-4 w-1/4">
					<label className="mb-2 block text-sm font-semibold text-gray-700 ">
						Due Date
					</label>

					<input
						className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
							formik.touched.date && Boolean(formik.errors.date)
								? "dark:border-red-600"
								: "border-gray-300"
						}`}
						type="date"
						name="date"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.date}
						placeholder="Subject"
					/>
					<span className="text-xs font-light text-red-600">
						{formik.touched.date && formik.errors.date}
					</span>
				</div>

				<div className="mt-6">
					<motion.button
						variants={buttonVariants}
						whileHover="hover"
						className="primary-inset rounded-lg px-5 py-3 font-medium text-white bg-[#d9117b]"
						type="submit"
						disabled={formik.isSubmitting}
					>
						<p>Submit</p>
					</motion.button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
