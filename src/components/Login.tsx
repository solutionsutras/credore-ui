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
			duration: 0.5,
		},
	},
};

const Login = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			subject: "",
			country: "91",
			message: "",
			location: "",
		},
		validationSchema: Yup.object({
			country: Yup.string().required("Country Code Required."),
			phone: Yup.number()
				.test("minlength", "phone number at list 10 digits", (val) =>
					Boolean(val && val.toString().length >= 6)
				)
				.test("len", "phone number can not be more then 16 digits", (val) =>
					Boolean(val && val.toString().length <= 16)
				),
		}),
		onSubmit: (values) => {
			console.log(values);
			formik.resetForm();
		},
	});

	return (
		<div className="w-full h-[100vh] flex justify-center items-center bgImg bg-black/5 p-[1em] bg-blend-overlay relative">
			<img
				src="https://tsmartuk.co.uk/img/tsmart.webp"
				alt=""
				className="lg:w-24 w-16 m-4 absolute top-0 left-0"
			/>
			<div className="bg-white rounded-2xl lg:w-[50%] w-[90%]">
				<div className="lg:px-16 px-3 ">
					<h2 className="flex mt-5 mb-8 flex-col justify-center items-center text-center text-black font-semibold text-2xl">
						Sign In
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							whileInView={{ width: 100, opacity: 1 }}
							transition={{
								delay: 0.5,
								duration: 2,
								type: "spring",
								stiffness: 100,
							}}
							className="hidden md:inline-block border-2 border-[#d9117b] bg-[#d9117b] m-1 rounded-full"
						></motion.div>
					</h2>
					<form onSubmit={formik.handleSubmit}>
						<div className="w-full pt-2 md:mt-0">
							<label className="mb-2 block text-sm font-semibold text-gray-700">
								Phone Number
							</label>
							<div className="flex w-full">
								<div className=" lg:w-2/12 w-4/12">
									<CountrySelector
										className="bg-gray-100 border-gray-300 border-r-0 rounded-tr-none rounded-br-none"
										defaultValue="91"
										name="country"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.country}
									/>
								</div>

								<input
									className={`lg:w-10/12 w-8/12 block border-l-0 rounded-tl-none rounded-bl-none rounded-md border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 md:w-3/4  ${
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
						<div className="my-6 ">
							<motion.button
								variants={buttonVariants}
								whileHover="hover"
								className="flex justify-center items-center gap-3 primary-inset w-full rounded-lg px-5 py-3 font-medium text-white bg-[#d9117b]"
								type="submit"
								disabled={formik.isSubmitting}
							>
								<p>Next</p>
								<FaArrowRight />
							</motion.button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
