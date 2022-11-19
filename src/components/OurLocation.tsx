import React from "react";
import { motion } from "framer-motion";

const OurLocation = () => {
	return (
		<div>
			<div className=" w-full my-3">
				<h1 className="text-gray-700 flex flex-col justify-center items-center text-center tracking-wide text-xl md:text-3xl font-bold w-full">
					Our Location
					<motion.div
						initial={{ width: 0, opacity: 0 }}
						whileInView={{ width: 280, opacity: 1 }}
						transition={{
							delay: 0.5,
							duration: 2,
							type: "spring",
							stiffness: 100,
						}}
						className="hidden md:inline-block border-2 border-[#d9117b] bg-[#d9117b]  m-1 rounded-full"
					></motion.div>
				</h1>
			</div>
		 x</div>
	);
};

export default OurLocation;
