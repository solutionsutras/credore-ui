import React from "react";
import { motion } from "framer-motion";
import DataTable from "./DataTable";
import WarrantyForm from "./WarrantyForm";

const Warranty = () => {
	return (
		<section>
			<div className="flex flex-col w-full justify-center items-center md:px-36 px-3 gap-5 py-10">
				<h1 className="md:text-4xl text-2xl text-gray-800 font-semibold subpixel-antialiased -mb-4">
					Terms & <span className="text-[#ff3d9b]">Conditions</span>
				</h1>
				<motion.div
					initial={{ width: 0, opacity: 0 }}
					whileInView={{ width: 270, opacity: 1 }}
					transition={{
						delay: 0.5,
						duration: 2,
						type: "spring",
						stiffness: 100,
					}}
					className="hidden md:inline-block border-2 border-[#ff3d9b] bg-[#ff3d9b] m-1 rounded-full"
				></motion.div>

				<h3 className="text-[#ff3d9b] text-lg font-bold w-full flex justify-start -mb-2">
					tSmart Warranty
				</h3>

				<div className="flex flex-col justify-center gap-7 text-justify">
					<p className="text-sm text-black font-medium tracking-tighter">
						The warranty means that if there is a problem with the repair that
						we have performed, we are liable for the warranty period to inspect
						your device and repair it again free of charge to restore its
						functionality, that was the subject of the repair service.
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						The warranty covers those aspects of your devices that were the
						subject of our repair service only. For example, a replacement of a
						LCD display screen, we will only cover any issue related to that
						part of your device and the labour, not
						software/motherboard/battery/charging port or any other components
						of the phone which were not the subject of the repair service. Thus
						the reason we always go through a checklist to test the customer's
						device’s functionality both before and after each repair. ( It is
						the customer's responsibility after receiving it. If any new fault
						occurs rather than the subject of the repair service, the customer
						should inform us immediately. If a customer doesn't let us know
						within 3 days of the repair , we will only be responsible for the
						subject of the repair.)
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						The warranty is void if the malfunction has occurred by physical
						damage or there is any sign of physical damage to the replacement
						part or your actual device. For example, we cannot provide warranty
						services if the front glass , display penal , back glass of your
						device is broken, nor has deep scratches or dents, nor you say that
						the screen broke by itself.
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						Although the warranty does not cover any physical damage to the
						replacement part or the device that occurred after the repair. We
						may investigate if you report such a damage within 3 days from
						receiving your phone. Please get in touch in any case, we will
						contact the supplier, if they refuse replacing the part, we will
						offer you a repair at discounted price.
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						The owner of the phone is committed to inform us immediately once
						they notice any issues with the repaired device. If you notice the
						screen fitting issues or the back panel coming off, those should be
						reported and fixed by us immediately. Continue use may lead to
						further physical damage that voids the warranty.
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						We are not liable for any physical damages to the replacement parts
						caused by the user. For example, if the repaired ipad screen has
						lifted up slightly, the customer tried to push it into place or
						apply glue to the device,which has led to further damage to the
						device, it will not be covered by the warranty repair.
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						Refunds may only be offered if we have failed to fix your device 3
						times. If any replacement parts which are needed to repair the
						device have become unavailable for some reason , we will refund you
						the cost of the repair or any deposit paid.
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						We are not liable for customers' travel or postage costs of
						delivering the device for the warranty repair. If a customer is
						collecting in person, we always ask the customer to check and
						conform all the functionalities. Then both parties confirm that the
						device has been repaired. As For online.
					</p>
					<p className="text-sm text-black font-medium tracking-tighter">
						orders, customers cannot confirm the functionality before receiving
						it, thus, we will cover the cost of postage to get it back to us for
						the first 5 working days. After that, the owner needs to cover its
						shipping cost.
					</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-5 w-full">
					<h2 className="text-2xl text-[#ff3d9b] font-bold pt-5">
						How long is my warranty?
					</h2>
					<div className="lg:w-[30vw] shadow-lg shadow-gray-400 rounded-lg">
						<DataTable />
					</div>
					<h3 className="text-[#ef3b78] text-lg font-bold w-full flex justify-start -mb-2 pt-5">
						What is not covered by the warranty?
					</h3>
					<div className="flex flex-col justify-center gap-7 text-justify">
						<p className="text-sm text-black font-medium tracking-tighter">
							Any physical damage. We don’t cover physical damage of your
							phone’s screen, front / back glass. Any physical damage to the
							device after repair, will void the warranty.
						</p>
						<p className="text-sm text-black font-medium tracking-tighter">
							Accidental damage from user’s mishandling. Where the device has
							been damaged by the user in a manner that has resulted in not
							functioning properly to the device, this is not covered by
							warranty. Items that are accidentally damaged by water or any
							other liquid are not covered.
						</p>
						<p className="text-sm text-black font-medium tracking-tighter">
							Water damage repair services. This particular service stands for
							cleaning the motherboard from the damage of forms of fluid. We
							don’t guarantee functionality of water damaged phones unless we
							have to replace parts to get it to work.
						</p>
						<p className="text-sm text-black font-medium tracking-tighter">
							Data recovery service. Once we agree on the data recovery, we
							start the process. Then we will ask the customer to confirm
							receiving the content you he/she has asked for. After customers
							confirm and receive your files, there is no warranty as we never
							keep a copy of customer’s files.
						</p>
						<p className="text-sm text-black font-medium tracking-tighter">
							Software repair. After we solved issues with the software, we
							would ask customers to check and confirm that all problems are
							fixed. We will give you up to 1 week to confirm that the problem
							has been solved, after confirmation received, there is no warranty
							as further problems with the software can occur from the usage
							form the user.
						</p>
						<p className="text-sm text-black font-medium tracking-tighter">
							Your postage cost (for online orders). We are not liable for your
							cost of postage for the device to be sent back to us, unless you
							have found the problem within the first 7 days of receiving it.
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center">
					<h2 className="text-2xl text-[#ff3d9b] font-bold pt-5">
						Warranty Claim Form
					</h2>
					<small className="text-black font-medium">
						Fill in the form below if you wish to make a warranty claim.
					</small>
				</div>

				<div className="lg:w-[50vw] -mt-6 shadow-lg shadow-gray-400 rounded-lg">
					<WarrantyForm />
				</div>
			</div>
		</section>
	);
};

export default Warranty;
