import React from "react";
import { useFormik } from "formik";
import * as Yup from "Yup";
import { motion } from "framer-motion";
import CountrySelector from "./CountrySelector";
import { FaArrowRight } from "react-icons/fa";

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

const RegisterAccount = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			subject: "",
			country: "91",
			message: "",
			location: "",
			file: "",
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
			file: Yup.string().required("Upload Image"),
			// .min(15, "Minimum 15 letter")
			// .max(100, "Maximum 100 letter"),
		}),
		onSubmit: (values) => {
			console.log(values);
			formik.resetForm();
		},
	});

	return (
		<div className="w-full h-[100vh] flex justify-center items-center bg-black/5 p-[1em] bg-blend-overlay relative">
			<img
				src="https://tsmartuk.co.uk/img/tsmart.webp"
				alt=""
				className="lg:w-24 w-16 m-4 absolute top-0 left-0"
			/>
			<div className="bg-white rounded-2xl lg:w-[50%] w-[90%] shadow-lg shadow-gray-400">
				<div className="lg:px-16 px-3 ">
					<h2 className="flex mt-5 mb-8 flex-col justify-center items-center text-center text-black font-semibold text-2xl">
						Register Account
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							whileInView={{ width: 180, opacity: 1 }}
							transition={{
								delay: 0.5,
								duration: 2,
								type: "spring",
								stiffness: 100,
							}}
							className="hidden md:inline-block border-2 border-[#d9117b] bg-[#d9117b] m-1 rounded-full"
						></motion.div>
					</h2>
					<div className="flex justify-center items-center ">
						<div className="relative flex justify-center items-center">
							<img src="/user3.png" alt="" className="z-10" />
							<button className="relative">
								<input
									type="file"
									name="file"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.file}
									id=""
									className={`w-10 absolute -bottom-16 -right-0 opacity-0 cursor-pointer z-30 ${
										formik.touched.file && Boolean(formik.errors.file)
											? "dark:border-red-600"
											: "border-gray-300"
									} `}
								/>
							</button>
							<img
								src="/pencil3.png"
								alt=""
								className="w-8 absolute -bottom-0.5 -right-1 z-20"
							/>
						</div>
					</div>
					<span className="flex justify-center items-center text-xs font-extralight text-red-600">
						{formik.touched.file && formik.errors.file}
					</span>
					<form onSubmit={formik.handleSubmit}>
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
								placeholder="Full Name"
							/>
							<span className="text-xs font-extralight text-red-600">
								{formik.touched.name && formik.errors.name}
							</span>
						</div>

						<div className=" w-full">
							<label className="mb-2 block text-sm font-semibold text-gray-700 mt-2">
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
								placeholder="Email Address"
							/>
							<span className="text-xs font-light text-red-600">
								{formik.touched.email && formik.errors.email}
							</span>
						</div>
						<div className="my-6 ">
							<motion.button
								variants={buttonVariants}
								whileHover="hover"
								className="flex justify-center items-center gap-3 primary-inset w-full rounded-lg px-5 py-3 font-medium text-white bg-[#d9117b]"
								type="submit"
								disabled={formik.isSubmitting}
							>
								<p>Register</p>
								<FaArrowRight />
							</motion.button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterAccount;
