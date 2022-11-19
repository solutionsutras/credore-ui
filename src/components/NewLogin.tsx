import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "Yup";
import Lottie from "lottie-react";
import login from "../assets/animation/login.json";
import { motion } from "framer-motion";
import CountrySelector from "./CountrySelector";

const buttonVariants = {
	hover: {
		scale: 1.1,
		boxShadow: "0px 0px 8px rgb(255, 255, 255)",
		transition: {
			duration: 0.5,
		},
	},
};

const NewLogin = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			subject: "",
			country: "44",
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
		<div className="flex flex-col justify-center items-center w-full flex-1 md:px-20 px-3 text-center mt-10 md:mt-32">
			<div className="bg-white rounded-2xl shadow-2xl flex-col md:flex-row flex lg:w-8/12 shadow-slate-500">
				<div className="w-full order-2 bg-[#d9117b] md:order-1 md:w-1/2 md:rounded-tr-none md:rounded-br-none rounded-2xl text-white md:px-12 flex flex-col justify-center items-center">
					<Lottie className="w-full" animationData={login} loop={true} />
				</div>
				<div className="w-full md:w-1/2 p-5 order-1 md:order-2">
					<div className="text-left inline-block">
						<img
							src="https://www.tsmartuk.co.uk/img/tsmart.webp"
							alt="logo"
							className="w-36"
						/>
					</div>
					<div className="py-5">
						<h2 className="text-3xl font-bold text-[#d9117b] mb-2">
							Welcome To tSmarts
						</h2>
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							whileInView={{ width: 270, opacity: 1 }}
							transition={{
								delay: 0.5,
								duration: 2,
								type: "spring",
								stiffness: 100,
							}}
							className="hidden md:inline-block border-2 border-[#d9117b] bg-[#d9117b] m-1 rounded-full"
						></motion.div>

						<form onSubmit={formik.handleSubmit}>
							<div className="w-full pt-2 md:mt-0">
								<div className=" mt-4 w-full pt-2 md:mt-0">
									<label className="mb-2 block text-sm font-semibold text-gray-700 ">
										Enter Your Mobile Number
									</label>
									<div className="flex w-full flex-col gap-3 md:flex-row">
										<div className=" w-full md:w-1/4 lg:w-32">
											<CountrySelector
												className="bg-gray-100"
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
													: "dark:border-gray-400"
											}`}
											type="number"
											name="phone"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.phone}
											placeholder="123 *** ****"
										/>
									</div>
									<span className="text-xs font-extralight text-red-600">
										{formik.touched.phone && formik.errors.phone}
									</span>
								</div>
							</div>
							<div className="my-6 w-full flex justify-center">
								<motion.button
									variants={buttonVariants}
									whileHover="hover"
									className="flex justify-center items-center gap-3 primary-inset w-4/5 rounded-lg px-5 py-3 font-medium text-white bg-[#d9117b]"
									type="submit"
									disabled={formik.isSubmitting}
								>
									<p>Next</p>
									<FaArrowRight />
								</motion.button>
							</div>
							<small>
								By proceeding, I agree to <span className="underline">T&C</span>{" "}
								and <span className="underline">Privacy Policy</span>{" "}
							</small>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewLogin;
