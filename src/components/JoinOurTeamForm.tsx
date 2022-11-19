import React from "react";
import { useFormik } from "formik";
import * as Yup from "Yup";
import { motion } from "framer-motion";

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
			name: "",
			email: "",
			phone: "",
			address: "",
			country: "91",
			city: "",
			postcode: "",
			resume: "",
			radio1: "",
			radio2: "",
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
			address: Yup.string().required("Address Required"),
			city: Yup.string().required("City Required"),
			postcode: Yup.string().required("Postcode"),
			resume: Yup.string().required("Select File"),
			radio1: Yup.string().required("Please Select One Option"),
			radio2: Yup.string().required("Please Select One Option"),
		}),
		onSubmit: (values) => {
			console.log(values);
			formik.resetForm();
		},
	});

	return (
		<div className="p-3">
			<form className="" onSubmit={formik.handleSubmit}>
				<div className=" flex w-full flex-col gap-3 md:flex-row">
					<div className=" w-full ">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Name
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
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
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
				</div>
				<div className=" flex w-full flex-col gap-3 md:flex-row">
					<div className="w-full mt-4">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Phone Number
						</label>
						<div className="flex w-full flex-col gap-3 md:flex-row">
							<input
								className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 md:w-3/4 lg:w-full ${
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

					<div className="w-full mt-4">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Address
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
								formik.touched.address && Boolean(formik.errors.address)
									? "dark:border-red-600"
									: "border-gray-300"
							}`}
							type="text"
							name="address"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address}
							placeholder="Enter your address"
						/>
						<span className="text-xs font-light text-red-600">
							{formik.touched.address && formik.errors.address}
						</span>
					</div>
				</div>

				<div className=" flex w-full flex-col gap-3 md:flex-row">
					<div className="w-full mt-4">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							City
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
								formik.touched.city && Boolean(formik.errors.city)
									? "dark:border-red-600"
									: "border-gray-300"
							}`}
							type="text"
							name="city"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address}
							placeholder="Enter your City"
						/>
						<span className="text-xs font-light text-red-600">
							{formik.touched.city && formik.errors.city}
						</span>
					</div>

					<div className="w-full mt-4">
						<label className="mb-2 block text-sm font-semibold text-gray-700 ">
							Postcode
						</label>

						<input
							className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
								formik.touched.postcode && Boolean(formik.errors.postcode)
									? "dark:border-red-600"
									: "border-gray-300"
							}`}
							type="text"
							name="city"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.postcode}
							placeholder="Enter your City"
						/>
						<span className="text-xs font-light text-red-600">
							{formik.touched.postcode && formik.errors.postcode}
						</span>
					</div>
				</div>

				<div className="mt-4 w-64">
					<label className="mb-1 block text-sm font-semibold text-gray-700 ">
						Resume
					</label>
					<input
						className={`block w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 lg:w-full ${
							formik.touched.resume && Boolean(formik.errors.resume)
								? "dark:border-red-600"
								: "border-gray-300"
						} `}
						type="file"
						name="resume"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.resume}
						placeholder="Jane Doe"
					/>
					<span className="text-xs font-extralight text-red-600">
						{formik.touched.resume && formik.errors.resume}
					</span>
				</div>
				<div className="mt-4">
					<label className="mb-2 block text-sm font-semibold text-gray-700">
						Do you currently have the right to work in the UK?
					</label>
					<label className="flex items-center gap-2">
						<input
							className={`block bg-gray-100 text-gray-700 focus:border-blue-400 ${
								formik.touched.radio1 && Boolean(formik.errors.radio1)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="radio"
							name="radio1"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.radio1}
						/>
						Yes
					</label>
					<label className="flex items-center gap-2">
						<input
							className={`block bg-gray-100 text-gray-700 focus:border-blue-400 ${
								formik.touched.radio1 && Boolean(formik.errors.radio1)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="radio"
							name="radio1"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.radio1}
						/>
						No
					</label>
				</div>

				<div className="mt-4">
					<label className="mb-2 block text-sm font-semibold text-gray-700 ">
						Can you commute into Central London?
					</label>
					<label className="flex items-center gap-2">
						<input
							className={`block bg-gray-100 text-gray-700 focus:border-blue-400 ${
								formik.touched.name && Boolean(formik.errors.name)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="radio"
							name="radio2"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
							placeholder="Jane Doe"
						/>
						Yes
					</label>
					<label className="flex items-center gap-2">
						<input
							className={`block bg-gray-100 text-gray-700 focus:border-blue-400 ${
								formik.touched.name && Boolean(formik.errors.name)
									? "dark:border-red-600"
									: "border-gray-300"
							} `}
							type="radio"
							name="radio2"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
							placeholder="Jane Doe"
						/>
						No
					</label>
				</div>
				<hr className="mt-8 mb-4" />
				<div className="w-full h-[0.1rem] bg-[#ff3d9b]"></div>

				<div className="mt-6 w-full flex justify-center items-center">
					<motion.button
						variants={buttonVariants}
						whileHover="hover"
						className=" rounded-lg px-5 py-3 w-1/5 font-medium text-white bg-[#d9117b]"
						type="submit"
						disabled={formik.isSubmitting}
					>
						Send Message
					</motion.button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
