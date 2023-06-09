import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline, MdLogin } from "react-icons/md";
import * as Yup from "Yup";
import study from "../assets/animation/study.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const buttonVariants = {
	hover: {
		scale: 1.1,
		boxShadow: "0px 0px 8px rgb(255, 255, 255)",
		transition: {
			duration: 0.5,
		},
	},
};

const Login2 = () => {
	const [passwordType, setPasswordType] = useState("password");

	const togglePassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};

	// Formic and Yup setup
	const formik = useFormik({
		initialValues: {
			password: "",
			email: "",
			checked: false,
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.required("Password is required")
				.min(6, "Password must be at least 6 characters"),
			email: Yup.string()
				.required("Email is required")
				.email("Email is not valid"),
		}),
		onSubmit: async (values) => {
			console.log(values);
			try {
				const result = await fetch(
					"http://credore.eastus.cloudapp.azure.com/auth/signin",
					{
						method: "POST",
						body: JSON.stringify({
							email: values.email,
							password: values.password,
						}),
						headers: {
							"Content-type": "application/json; charset=UTF-8",
						},
					}
				);
				const response = await result.json();
				console.log(response);
				localStorage.setItem("user", JSON.stringify(response));
				location.href = "/dashboard";
				formik.resetForm();
			} catch (error) {
				console.log(error);
			}
			// await fetch("http://credore.eastus.cloudapp.azure.com/auth/signin", {
			// 	method: "POST",
			// 	body: JSON.stringify({
			// 		email: "seller@sigmafoods.com",
			// 		password: "test123",
			// 	}),
			// 	headers: {
			// 		"Content-type": "application/json; charset=UTF-8",
			// 	},
			// })
			// 	.then((response) => response.json())
			// 	.then((response) => console.log(response));
			// window.location.href = "/dashboard";
		},
	});

	return (
		<>
			{/* <TopHeader /> */}
			<div className="flex flex-col justify-center items-center w-full flex-1 px-20 text-center mt-10 md:mt-32">
				<div className="bg-white rounded-2xl shadow-2xl flex-col md:flex-row flex lg:w-7/12">
					<div className="w-full md:w-3/5 p-5">
						<div className="text-left inline-block">
							<img
								src={"https://www.credore.xyz/assets/images/Logo.png"}
								alt="logo"
								className="w-36"
							/>
						</div>
						<div className="py-5">
							<h2 className="text-3xl font-bold text-[#f15a29] mb-2">
								Login to Account
							</h2>
							<motion.div
								initial={{ width: 0, opacity: 0 }}
								whileInView={{ width: 150, opacity: 1 }}
								transition={{
									delay: 0.5,
									duration: 2,
									type: "spring",
									stiffness: 100,
								}}
								className="hidden md:inline-block border-2 border-[#29564b] bg-[#29564b] m-1 rounded-full"
							></motion.div>
							{/* <div className="border-2 w-32 border-[#29564b] bg-[#29564b] inline-block mb-2 rounded-full"></div> */}

							<form
								className="flex flex-col items-center mt-5"
								onSubmit={formik.handleSubmit}
							>
								<div className="bg-gray-100 md:w-10/12 w-64 p-4 flex items-center rounded-xl">
									<FaRegEnvelope className="text-gray-400 m-2" />
									<input
										type="email"
										name="email"
										placeholder="Email"
										className={`${
											formik?.touched?.email && formik?.errors?.email
												? " border-red-400 text-red-500"
												: "border-gray-100"
										} bg-gray-100 outline-none md:text-base text-sm flex-1`}
										value={formik?.values?.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</div>
								<div className="flex justify-start w-10/12 mb-3">
									{formik?.touched?.email && formik?.errors?.email && (
										<small className="text-red-600 text-sm">
											{formik?.errors?.email}
										</small>
									)}
								</div>

								<div className="bg-gray-100 md:w-10/12 w-64 p-4 flex items-center  rounded-xl">
									<MdLockOutline className="text-gray-400 m-2 text-lg" />
									<input
										type={passwordType}
										name="password"
										placeholder="Password"
										className={`${
											formik?.touched?.password && formik?.errors?.password
												? "border-red-400 text-red-500"
												: "border-gray-100"
										} bg-gray-100 outline-none md:text-base text-sm flex-1`}
										value={formik?.values?.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									<span role={`button`} onClick={togglePassword}>
										{passwordType === "password" ? (
											<FaEyeSlash className="text-gray-400 m-2 text-lg" />
										) : (
											<FaEye className="m-2 text-lg" />
										)}
									</span>
								</div>
								<div className="flex justify-start w-10/12 mb-3">
									{formik?.touched?.password && formik?.errors?.password && (
										<small className="text-red-600 text-sm">
											{formik?.errors?.password}
										</small>
									)}
								</div>
								<div className="flex justify-end md:w-10/12 w-64 mb-5">
									{/* <label htmlFor="" className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-1" />
                    Remember Me
                  </label> */}
									<Link href="/forgot-password" className="text-sm">
										Forgot Password?
									</Link>
								</div>
								<motion.button
									variants={buttonVariants}
									whileHover="hover"
									type="submit"
									className={`flex items-center justify-between border-2 gap-3 border-[#29564b] text-[#29564b] rounded-full px-5 py-2 font-semibold hover:bg-[#29564b] hover:text-white transition duration-300 ease-out`}
									disabled={!formik?.values?.email || !formik?.values?.password}
								>
									Login
									<MdLogin className="text-lg" />
								</motion.button>
							</form>
						</div>
					</div>
					<div className="w-full md:w-2/5 bg-[#29564b] md:rounded-tr-2xl md:rounded-br-2xl rounded-2xl text-white  flex flex-col justify-center items-center">
						<Lottie className="w-full" animationData={study} loop={true} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Login2;
