import React from "react";
import { motion } from "framer-motion";

const Cards = () => {
	const cardArr = [
		{
			id: 1,
			title: "Address",
			subtitle:
				"tSmart Head Office 186 Earls Court Road,SW5 9QG London, UnitedKingdom",
			image: "/location-pin.png",
		},
		{
			id: 2,
			title: "Call center",
			subtitle: "020 38 597302",
			image: "/phone-call.png",
		},
		{
			id: 3,
			title: "Electronic support",
			subtitle: "info@tsmartuk.co.uk",
			image: "/email.png",
		},
	];

	return (
		<div className="bg-white/25 p-[1em] bg-blend-overlay">
			<div className="w-full flex md:flex-row flex-col justify-center gap-5 items-center px-5 md:px-10">
				{cardArr.map((item, index) => {
					return (
						<motion.div
							key={index}
							initial={{ scale: 0, opacity: 0, y: 20 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							exit={{ scale: 0, opacity: 0, y: 20 }}
							className="px-2 rounded-lg rounded-bl-[3rem] flex flex-col justify-center items-center border-2 w-full md:w-[30%] h-52 border-[#ffb8cb] hover:bg-[#ffb8cb] transition duration-500 ease-out gap-4"
						>
							<img src={item.image} alt="" className="w-10" />
							<h1 className="text-xl font-bold subpixel-antialiased">
								{item.title}
							</h1>
							<p className="text-base text-center font-semibold">
								{item.subtitle}
							</p>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default Cards;
