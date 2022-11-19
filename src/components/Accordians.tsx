import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { Accordion } from "flowbite-react";

const Accordians = () => {
	return (
		<Accordion alwaysOpen={true} arrowIcon={FaArrowCircleUp}>
			<Accordion.Panel>
				<Accordion.Title>Why should I use tSmart for a repair?</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Your smartphone or device is precious to you. tSmart technicians
						undergo strict training and regular testing to ensure they have the
						experience and qualifications to repair all leading devices. With
						nearly 500,000 repairs to date, we are the trusted repair chain.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>How long does a repair take?</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						We pride ourselves on an express repair service. Our most popular
						repairs can be completed in any of our Service Centres within 30
						minutes, whilst some tablet, laptop and postal repairs could take
						between 48-72 hours.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>
					What should I do before handing over my device?
				</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						The good thing is, we don't need you to wipe your data before your
						repair with us unless you've chosen to have a Genuine Apple repair
						or you're having your Google Pixel 6 repaired under warranty. We
						always recommend that you back-up your device before visiting us
						though because in the worst case scenario we would contact you for
						your approval if a repair requires your data to be wiped.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>
					Why does tSmart ask for my PIN or ID before repair?
				</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Providing your pin/passcode before the repair is completely up to
						you! We advise everyone to provide this information as our
						technicians need to verify that the device is in full working order
						before you collect it! They undergo a series of tests that include
						touch sensitivity and camera. At no time they would access your
						personal information or intrude on your privacy. You can view our
						privacy policy.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>
					Will my device be liquid resistant after a repair?
				</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Although we use the same seals as your devices manufacturer when
						putting everything back together, we cannot guarantee water proofing
						or resistance. This is the same wherever you go as the IP rating
						cannot be re-instated once a device has been opened up.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>
					Are tSmart screens original Apple / Samsung parts?
				</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						The main difference is that the core components from Flowbite are At
						tSmart we aim to offer our customers the broadest range of repair
						options to suit all budgets. In the case of Android devices (e.g.
						Samsung, Google, Huawei, Oppo and OnePlus), all our screens are
						manufacturer originals. In the case of Apple devices, we are able to
						offer customers the option of either manufacturer original or high
						quality compatible screens.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>
					I only have a small crack on my screen do I need a full-screen
					replacement?
				</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Yes, we do a full-screen replacement regardless of the size of the
						crack in your screen and all our screen replacements come with a
						lifetime warranty!
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>
					Is tsmart an Apple authorized supplier?
				</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Yes. Under Apple's Independent Repair Provider Program, tSmart is
						authorized to conduct out-of-warranty repair services on Apple
						devices using genuine Apple parts. In addition, tSmart is able to
						offer alternative repair options using compatible Apple parts which
						have been rigorously tested to meet our strict quality standards,
						and which are all backed up with our tSmart Warranty.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>How does the walk-in service work?</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Our walk-in service allows you to have your phone repaired straight
						away! You can see the time required for each repair when you book on
						our website.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
		</Accordion>
	);
};

export default Accordians;
