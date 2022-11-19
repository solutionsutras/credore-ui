import React from "react";
import { motion } from "framer-motion";
import RecentlyPublished from "./RecentlyPublished";
import BlogNews from "./BlogNews";

const BlogDetail = () => {
	return (
		<div className="py-3">
			<h1 className="heading text-[#ff2995] flex flex-col justify-center items-center text-center tracking-wide text-xl md:text-4xl py-1 font-bold w-full">
				News & Reviews
				<motion.div
					initial={{ width: 0, opacity: 0 }}
					whileInView={{ width: 280, opacity: 1 }}
					transition={{
						delay: 0.5,
						duration: 2,
						type: "spring",
						stiffness: 100,
					}}
					className="hidden md:inline-block border-2 border-[#d9117b] bg-[#d9117b] m-1 rounded-full"
				></motion.div>
			</h1>
			<div className="flex justify-center lg:flex-row flex-col lg:px-40 px-5 gap-5 py-5">
				<div className="border-2 border-gray-100 shadow-lg shadow-gray-300 lg:w-[30%] w-full space-y-2 lg:order-1 order-2">
					<RecentlyPublished />
				</div>

				<div className="border-2 border-gray-100 shadow-lg shadow-gray-300 lg:w-[70%] w-full lg:order-2 order-1 flex flex-col gap-4 p-8">
					<BlogNews />
				</div>
			</div>
		</div>
	);
};

export default BlogDetail;
