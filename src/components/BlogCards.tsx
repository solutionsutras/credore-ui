import React from "react";
import { motion } from "framer-motion";
import {
	FaFacebookF,
	FaInstagram,
	FaLongArrowAltRight,
	FaTwitter,
} from "react-icons/fa";

const BlogCards = () => {
	const cardArr = [
		{
			id: 1,
			title: "Tech Tips For A Longer Lasting Battery",
			subtitle:
				"Over time, the capacity of iPhone batteries deteriorates leaving you in a constant state of charging your phone. The lifespan of smartphone battery normally last around 2 years. Although naturally with age, devices do get slower and batteries die a lot quicker, there are ways for you to try and...",
			image:
				"https://cdn.shopify.com/s/files/1/1180/1832/articles/cover_battery_tips_1024x1024.jpg?v=1605526802",
		},
		{
			id: 2,
			title: "Securing your Smartphones",
			subtitle:
				"Over time, the capacity of iPhone batteries deteriorates leaving you in a constant state of charging your phone. The lifespan of smartphone battery normally last around 2 years. Although naturally with age, quicker, there are ysfor you to try and...",
			image:
				"https://cdn.shopify.com/s/files/1/1180/1832/articles/secure-your-smartphone_1024x1024.jpg?v=1545409179 ",
		},
		{
			id: 3,
			title: "How to Restore iPhone from iCloud, iTunes",
			subtitle:
				"Occasionally, the one thing you depend on fails which can leave you in a difficult situation. While technology isn't flawless, it carries our digital existence, so you will want to know how to restore your device and bring it back to life when things go wrong. What does restore iPhone...",
			image:
				"https://cdn.shopify.com/s/files/1/1180/1832/articles/how-to-restore-iphone_1024x1024.jpg?v=1545407514",
		},
		{
			id: 4,
			title: "How to Restart iPhone",
			subtitle:
				"Is your iPhone being slow and unresponsive? Or perhaps you're staring at a blank screen and you don't know what to do? If the answer is yes, you may need to restart your iPhone and reset all functions! This can be a frustrating situation but don't panic. This is a...",
			image:
				"https://cdn.shopify.com/s/files/1/1180/1832/articles/how-to-restart-iphone_b2b8edbe-bd18-42d5-b491-2414d4be434c_1024x1024.jpg?v=1545407497",
		},
		{
			id: 5,
			title: "5 Common Ways Customers Broke their Phone",
			subtitle:
				"Most Common Smartphone Accidents to watch out for As the leading phone repair and customization service, we hear a lot of interesting stories on phone breakages. We have listed 5 most common ways customers have broken their mobile phones.  1) In the toilet No one likes to flush money down the toilet, but it...",
			image:
				"https://cdn.shopify.com/s/files/1/1180/1832/articles/5-Common-Ways-Customers-Broke-their-Phone_1024x1024.jpg?v=1545407359",
		},
		{
			id: 6,
			title: "How to remove iCloud account?",
			subtitle:
				"Are you thinking of upgrading your device and selling your device? Or maybe your device is lost/stolen and you need to remove the data off you’re device as quickly as possible. iCloud is useful if you’re an Apple user as it allows you to back up and store your device's...",
			image:
				"https://cdn.shopify.com/s/files/1/1180/1832/articles/blog_image_icloud_1024x1024.jpg?v=1561457547",
		},
	];

	return (
		<>
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
						className="hidden md:inline-block border-2 border-[#d9117b] bg-[#d9117b]  m-1 rounded-full"
					></motion.div>
				</h1>
			</div>
			<div className="bg-white/25 p-[1em] bg-blend-overlay flex justify-center items-center">
				<div className="w-full grid md:grid-cols-2 grid-cols-1 justify-items-center gap-x-10 gap-y-5 lg:px-56 ">
					{cardArr.map((item, index) => {
						return (
							<div
								key={index}
								className="rounded-lg flex flex-col justify-center items-center border-2 lg:w-[32rem] w-full border-gray-100 transition duration-500 ease-out gap-4 shadow-lg shadow-gray-200"
							>
								<div className="overflow-hidden">
									<motion.img
										whileHover={{
											scale: 1.1,
											transition: {
												delay: 0.1,
												type: "spring",
												stiffness: 100,
											},
										}}
										src={item.image}
										alt=""
										className="w-full rounded-t-md transition duration-500 ease-out"
									/>
								</div>
								<div className="px-4 flex flex-col gap-2">
									<h1 className="text-xl text-gray-500 font-bold subpixel-antialiased hover:text-[#ff2995] transition duration-500 ease-out">
										{item.title}
									</h1>
									<p className="text-sm text-gray-400 leading-7 text-left font-semibold">
										{item.subtitle}
									</p>
									<div className="flex justify-start py-1 gap-2 items-center hover:text-[#ff2995]">
										<button className="link1 underline-left-right text-gray-500">
											Read More
										</button>
										<FaLongArrowAltRight className="pt-1" />
									</div>
									<div className="flex justify-between ">
										<div className="flex gap-2 justify-start text-gray-500 items-center py-2">
											<FaFacebookF className="hover:text-[#ff2995] transition duration-500 ease-out" />
											<FaInstagram className="hover:text-[#ff2995] transition duration-500 ease-out" />
											<FaTwitter className="hover:text-[#ff2995] transition duration-500 ease-out" />
										</div>
										<div className="text-sm text-gray-400 font-semibold mb-2">
											Dec 20, 2018
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default BlogCards;
