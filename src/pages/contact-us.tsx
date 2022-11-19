import React from "react";
// import Link from "next/link";
import ContactForm from "../components/ContactForm";
import Cards from "../components/Cards";
import Hero from "../components/Hero";
import Lottie from "lottie-react";
import contact from "../assets/animation/contact.json";
import { motion } from "framer-motion";
import OurLocation from "../components/OurLocation";

const Contact = () => {
	return (
		<section>
			{/* hero section */}
			<Hero />

			{/* form section */}
			<div className="flex lg:flex-row flex-col justify-between items-center lg:px-10 px-3 py-5 p-3 bg-[#f4f4f5] ">
				<motion.div
					className=" lg:w-[70%] w-full"
					initial={{ x: -200, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
					exit="exit"
				>
					<h1 className="text-gray-700 tracking-wide text-xl md:text-3xl font-bold w-full">
						We would love to hear from you.
					</h1>
					<p className="text-gray-500 tracking-wide text-base font-bold w-full my-2">
						If you’ve got great products your making or looking to work with us
						then drop us a line.
					</p>
					<ContactForm />
				</motion.div>
				<Lottie
					className="lg:w-[30%] w-full"
					animationData={contact}
					loop={true}
					// style={{ width: "40rem", height: "39.07rem" }}
				/>
			</div>

			{/* Our Locations */}
			{/* <OurLocation /> */}

			{/* card section */}
			<Cards />
		</section>
	);
};

export default Contact;
