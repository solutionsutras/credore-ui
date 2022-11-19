import React from "react";
import { motion } from "framer-motion";
import JoinOurTeamForm from "./JoinOurTeamForm";

const JoinOurTeam = () => {
	return (
		<section className="w-full flex flex-col justify-center items-center">
			<div className="w-full flex flex-col justify-center items-center">
				<h1 className="md:text-4xl text-2xl text-gray-800 font-semibold subpixel-antialiased">
					Join Our <span className="text-[#ff3d9b] ">Team</span>
				</h1>
				<motion.div
					initial={{ width: 0, opacity: 0 }}
					whileInView={{ width: 230, opacity: 1 }}
					transition={{
						delay: 0.5,
						duration: 2,
						type: "spring",
						stiffness: 100,
					}}
					className="hidden md:inline-block border-2 border-[#ff3d9b] bg-[#ff3d9b] m-1 rounded-full mb-5"
				></motion.div>
			</div>
			<div className="w-full flex flex-col justify-center items-center gap-5 my-10	">
				<div className="w-4/5 h-[0.1rem] bg-black"></div>
				<h2 className="text-lg font-bold text-black">Join With Us</h2>
				<h4 className="text-sm font-medium text-gray-700">
					we're are hiring great technician
				</h4>
				<div className="w-3/5 h-[0.1rem] bg-[#ff3d9b]"></div>
				<hr className="w-3/5" />
			</div>
			<div className="w-4/5 -mt-10">
				<JoinOurTeamForm />
			</div>
		</section>
	);
};

export default JoinOurTeam;
