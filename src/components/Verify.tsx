import React from "react";
import Lottie from "lottie-react";
import verify from "../assets/animation/verify.json";

const Verify = () => {
	return (
		<div>
			<div className="flex flex-col items-center justify-center h-screen">
				<Lottie
					animationData={verify}
					loop={true}
					style={{ width: "10rem", height: "9.07rem" }}
				/>
				<p className="text-xl md:text-2xl lg:text-3xl">
					Mail Verified Successfully
				</p>
				<p className="py-2 transition duration-350 ease-out hover:underline">
					Go to Home
				</p>
			</div>
		</div>
	);
};

export default Verify;
