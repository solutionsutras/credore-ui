import { useFormik } from "formik";
import * as Yup from "Yup";
import {
	FaFacebookSquare,
	FaTwitterSquare,
	FaMailBulk,
	FaGithub,
} from "react-icons/fa";
import Lottie from "lottie-react";
import study from "../assets/animation/study.json";
import Link from "next/link";

// Lottie background setup
const SignIn = () => {
	// const animationOption = {
	// 	loop: true,
	// 	autoplay: true,
	// 	animationData: design,
	// 	rendererSettings: {
	// 		preserveAspectRatio: "xMidYMid slice",
	// 	},
	// };

	// Formic and Yup setup
	const formik = useFormik({
		initialValues: {
			userName: "",
			password: "",
			email: "",
			checked: false,
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.required("Password is required")
				.min(6, "Password must be at least 6 characters")
				.max(12, "Password should not exceed 12 characters"),
			email: Yup.string()
				.required("Email is required")
				.email("Email is not valid"),
			userName: Yup.string().required("UserName is required"),
		}),
		onSubmit: (values) => {
			console.log(values);
			formik.resetForm();
		},
	});

	// // console.log(formik.errors);
	// console.log(formik.values);
	// console.log(formik);

	return (
		<main className="w-full flex flex-col md:flex-row bg-slate-100 font-montserrat">
			{/* -------- left section------ */}
			<section className="w-full lg:w-[70%] md:w-1/2 text-3xl text-indigo-500 font-bold m-10 mb-5 hidden md:block cursor-auto">
				<img
					src="https://searchingyard.com/assets/img/logo.png"
					className="w-40 cursor-pointer"
					alt="logo"
				/>

				{/* Lottie background image */}

				{/* <Lottie
					options={animationOption}
					height={"39.07rem"}
					width={"40rem"}
					style={{ cursor: "default" }}
				/> */}
				<Lottie
					animationData={study}
					loop={true}
					style={{ width: "40rem", height: "39.07rem" }}
				/>
			</section>

			{/* -------- right section------ */}
			<section className="w-full lg:w-[30%] md:w-1/2 bg-white p-8 md:p-16 relative">
				<img
					src="https://lh6.googleusercontent.com/-_MnsVJxHpe0/AAAAAAAAAAI/AAAAAAAAAAA/mz37OTqVY1k/s55-p-k-no-ns-nd/photo.jpg"
					className="w-15 md:hidden absolute inset-y-1 inset-x-[8%]"
					alt="logo"
				/>

				<h2 className="text-gray-500 text-xl m-[-0.2rem] font-medium mt-6 mb-3">
					Adventure starts here 🚀
				</h2>
				<p className="text-gray-500 font-normal text-sm mb-4">
					Make your app management easy and fun!
				</p>

				{/* sign up box */}

				<div className="my-2 flex flex-col ">
					<label className="text-gray-600 text-sm block" htmlFor="email">
						Email:
					</label>
					<input
						className={` ${
							formik?.touched?.email && formik?.errors?.email
								? " border-red-400 text-red-500"
								: "border-gray-400"
						} w-full border-2 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70`}
						type="email"
						name="email"
						id="email"
						value={formik?.values?.email}
						placeholder="admin@demo.com"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik?.touched?.email && formik?.errors?.email && (
						<small className="text-red-600">{formik?.errors?.email}</small>
					)}
				</div>
				<div className="my-2 flex flex-col">
					<div className="flex justify-between items-">
						<label className="text-gray-600 text-sm block" htmlFor="password">
							Password:
						</label>
					</div>

					<input
						className={` ${
							formik?.touched?.password && formik?.errors?.password
								? "border-red-400 text-red-500"
								: "border-gray-400"
						} w-full border-2 border-solid rounded-md p-2 placeholder:text-slate-400 text-sm opacity-70`}
						type="password"
						name="password"
						id="password"
						value={formik?.values?.password}
						placeholder="******"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik?.touched?.password && formik?.errors?.password && (
						<small className="text-red-600">{formik?.errors?.password}</small>
					)}
				</div>
				<div className="flex justify-start items-start mb-4">
					<input
						type="checkbox"
						name="checked"
						id="check"
						checked={formik?.values?.checked}
						onChange={() => {
							formik?.setFieldValue("checked", !formik.values?.checked);
						}}
						className="p-5 default:ring-2 h-5 w-5"
					/>
					<label htmlFor="check" className="text-gray-400 text-sm mx-3">
						I agree to
						<Link href="/">
							<a className="text-center text-indigo-400 inline text-sm mx-1 cursor-pointer">
								privacy policy & terms
							</a>
						</Link>
					</label>
				</div>
				<button
					className=" text-white bg-violet-500 opacity-70 px-15 py-2 rounded-md shadow block w-full"
					onClick={(e: any) => formik.handleSubmit()}
				>
					Sign in
				</button>

				<div className="mt-3 text-center">
					<p className="text-gray-600 text-center mt-5 inline text-sm">
						New on our platform?
					</p>
					<Link href="/signup">
						<a className="text-center text-indigo-400 inline text-sm mx-1 cursor-pointer">
							Create an account
						</a>
					</Link>
				</div>

				{/* Separator section */}
				<div className="flex justify-center items-center space-x-4 mt-5">
					<hr className="border-1 border-gray-400 opacity-25 inline-block w-40" />
					<span className="text-gray-600 text-sm">or</span>
					<hr className="border-1 border-gray-400 opacity-25 inline-block w-40" />
				</div>

				{/* Footer section */}
				<footer className="space-x-4 text-center mt-5">
					<Link href="https://www.facebook.com">
						<a target="_blank">
							<FaFacebookSquare className="w-7 h-7 text-blue-900 inline" />
						</a>
					</Link>
					<Link href="https://twitter.com/i/flow/login">
						<a target="_blank">
							<FaTwitterSquare className="w-7 h-7 text-sky-500 inline" />
						</a>
					</Link>
					<Link href="/">
						<a>
							<FaMailBulk className="w-7 h-7 text-red-500 inline" />
						</a>
					</Link>
            
					<a href="/">
						<FaGithub className="w-7 h-7 text-black inline" />
					</a>
				</footer>
			</section>
		</main>
	);
};

export default SignIn;
