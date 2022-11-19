import React from "react";
import { useFormik } from "formik";
import * as Yup from "Yup";
import CountrySelector from "./CountrySelector";
import { motion } from "framer-motion";
import LocationSelector from "./LocationSelector";

const buttonVariants = {
	hover: {
		scale: 1.05,
		// textShadow: "0px 0px 8px rgb(255, 255, 255)",
		boxShadow: "0px 0px 8px rgb(255, 255, 255)",
		transition: {
			// yoyo: 10,
			// yoyo: Infinity,
			duration: 0.5,
		},
	},
};

const WarrantyForm = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			model: "",
			country: "44",
			message: "",
			location: "",
			checked: false,
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("Name Required.")
				.min(3, "Minimum 3 letter")
				.max(100, "Maximum 100 letter"),
			email: Yup.string()
				.required("Email Required.")
				.email("Enter valid email"),
			country: Yup.string().required("Country Code Required."),
			phone: Yup.number()
				.test("minlength", "phone number at list 10 digits", (val) =>
					Boolean(val && val.toString().length >= 6)
				)
				.test("len", "phone number can not be more then 16 digits", (val) =>
					Boolean(val && val.toString().length <= 16)
				)
				.required("Phone number is required"),
			subject: Yup.string()
				.required("Subject Required.")
				.min(4, "Minimum 4 letter")
				.max(50, "Maximum 50 letter"),
			message: Yup.string()
				.required("Message Required.")
				.min(15, "Minimum 15 letter")
				.max(100, "Maximum 100 letter"),
			location: Yup.string().required("Location Required."),
			// .min(15, "Minimum 15 letter")
			// .max(100, "Maximum 100 letter"),
		}),
		onSubmit: (values) => {
			console.log(values);
			formik.resetForm();
		},
	});

	return (
		<div className="w-full p-3">
			<form onSubmit={formik.handleSubmit}>
				<div className=" flex w-full flex-col gap-3 justify-center items-center">
					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Full Name
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
								formik.touched.name && Boolean(formik.errors.name)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="text"
							name="name"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
							placeholder="Jane Doe"
						/>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.name && formik.errors.name}
						</span>
					</div>

					<div className=" w-full">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							E-mail
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40  ${
								formik.touched.email && Boolean(formik.errors.email)
									? "dark:border-red-600"
									: "border-gray-300"
							}`}
							type="email"
							name="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							placeholder="jane.doe@example.com"
						/>
						<span className="text-xs font-light text-red-600">
							{formik.touched.email && formik.errors.email}
						</span>
					</div>

					<div className=" mt-4 w-full pt-2 md:mt-0">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Phone Number
						</label>
						<div className="flex w-full flex-col gap-3 md:flex-row">
							<div className=" w-full md:w-1/4 lg:w-32">
								<CountrySelector
									className="bg-gray-100 border-gray-300"
									defaultValue="44"
									name="country"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.country}
								/>
							</div>

							<input
								className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 md:w-3/4 lg:w-full  ${
									formik.touched.phone && Boolean(formik.errors.phone)
										? "dark:border-red-600"
										: "border-gray-300"
								}`}
								type="number"
								name="phone"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.phone}
								placeholder="Enter phone number"
							/>
						</div>
						<span className="text-xs font-extralight text-red-600">
							{formik.touched.phone && formik.errors.phone}
						</span>
					</div>

					<div className="mt-4 w-full">
						<label className="mb-2 block text-sm font-semibold text-gray-700">
							Make/Model
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
								formik.touched.model && Boolean(formik.errors.model)
									? "dark:border-red-600"
									: "border-gray-300"
							}`}
							type="text"
							name="model"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.model}
							placeholder="Make/Model"
						/>
						<span className="text-xs font-light text-red-600">
							{formik.touched.model && formik.errors.model}
						</span>
					</div>

					<div className="mt-4 w-full">
						<label className="mb-2 block text-sm font-semibold text-gray-700">
							Store Visited
						</label>
						<LocationSelector
							className="bg-gray-100 border-gray-300"
							defaultValue="91"
							name="location"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.country}
						/>
						<span className="text-xs font-light text-red-600">
							{formik.touched.location && formik.errors.location}
						</span>
					</div>

					<div className="mt-4 w-full">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Claim Information
						</label>

						<textarea
							className={`block h-32 w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
								formik.touched.message && Boolean(formik.errors.message)
									? "dark:border-red-600"
									: "border-gray-300"
							}`}
							name="message"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.message}
							placeholder="Claim Information"
						></textarea>
						<span className="text-xs font-light text-red-600">
							{formik.touched.message && formik.errors.message}
						</span>
					</div>
					<div className="mt-4 w-full pt-2 md:mt-0">
						<input
							type="checkbox"
							name="checked"
							id="check"
							checked={formik?.values?.checked}
							onChange={() => {
								formik?.setFieldValue("checked", !formik.values?.checked);
							}}
							className="w-4 h-4 rounded-[4px]"
						/>
						<label
							htmlFor="check"
							className="text-black font-medium text-sm mx-3 tracking-tight"
						>
							I’m happy to receive email newsletters from tSmart about great
							special offers and promotions, competitions and useful guides :)
						</label>
						<p className="text-gray-500 pt-3 text-sm ">
							PS. We will use your above information only to contact you about
							your inquiry unless you opt into marketing. For further
							information about how we handle your data, you can view our
							privacy policy
						</p>
					</div>

					<motion.button
						variants={buttonVariants}
						whileHover="hover"
						className="primary-inset rounded-lg px-5 w-11/12 py-3 font-medium text-white bg-[#d9117b]"
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

export default WarrantyForm;
