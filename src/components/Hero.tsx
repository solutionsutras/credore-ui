import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
	return (
		<div className="bg-fixed flex bg-[url('/backgroud.png')] w-full h-[calc(50vh-55px)] bg-cover bg-bottom bg-no-repeat bg-black/25 p-[1em] bg-blend-overlay">
			<div className="lg:px-10 main-container flex flex-col justify-center items-center md:gap-1 gap-5">
				<div className="w-full flex flex-col overflow-hidden">
					<h1 className="text-gray-300 tracking-wide text-3xl md:text-5xl lg:text-7xl font-bold w-full">
						Contact Us
					</h1>
					<motion.div
						initial={{ width: 0, opacity: 0 }}
						whileInView={{ width: 380, opacity: 1 }}
						transition={{
							delay: 0.5,
							duration: 2,
							type: "spring",
							stiffness: 100,
						}}
						className="hidden md:inline-block border-2 border-[#d9117b] bg-[#d9117b]  m-1 rounded-full"
					></motion.div>
					<motion.div
						initial={{ width: 0, opacity: 0 }}
						whileInView={{ width: 170, opacity: 1 }}
						transition={{
							delay: 0.5,
							duration: 2,
							type: "spring",
							stiffness: 100,
						}}
						className="md:hidden inline-block border-2 border-[#ffb8cb] bg-[#ffb8cb] mt-1 rounded-full"
					></motion.div>
				</div>
				<p className="text-gray-400 tracking-wide text-lg md:text-xl font-semibold w-full px-3">
					We would be happy to assist you.
				</p>
			</div>
		</div>
	);
};

export default Hero;
