import { Avatar } from "flowbite-react";
import React from "react";
import Accordians from "./Accordians";
import Link from "next/link";

const Faq = () => {
	return (
		<div className="px-3 md:px-36 py-10">
			<div className="w-full flex flex-col justify-center items-center gap-7 pb-10">
				<h1 className="md:text-4xl text-2xl text-gray-800 font-semibold subpixel-antialiased">
					Frequently Asked <span className="text-[#d9117b]">Questions</span>
				</h1>
				<p className="text-xl tracking-wide font-semibold text-black">
					Have questions? We're here to help
				</p>
			</div>

			<div>
				<Accordians />

				<div className="w-full flex flex-col justify-center items-center py-7">
					<Avatar.Group>
						<Avatar
							img="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
							rounded={true}
							stacked={true}
						/>
						<Avatar
							img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
							rounded={true}
							stacked={true}
						/>
						<Avatar
							img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
							rounded={true}
							stacked={true}
						/>
						<Avatar
							img="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
							rounded={true}
							stacked={true}
						/>
						<Avatar
							img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
							rounded={true}
							stacked={true}
						/>
					</Avatar.Group>
					<p className="text-base font-bold">still have some questions?</p>
					<p className="text-sm text-gray-600 hidden md:block">
						can't find the answer you are looking for? Please{" "}
						<Link href="/contact-us">
							<span className="text-[#d9117b] font-medium cursor-pointer">
								Contact Us
							</span>
						</Link>
					</p>
					<p className="text-sm text-gray-600 block md:hidden">
						Please{" "}
						<Link href="/contact-us">
							<span className="text-[#d9117b] font-medium cursor-pointer">
								Contact Us
							</span>
						</Link>
					</p>
					<p></p>
				</div>
			</div>
		</div>
	);
};

export default Faq;
