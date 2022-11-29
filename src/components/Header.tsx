import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";

const TopHeader = () => {
	return (
		<>
			<section
				className="gap-2 flex lg:flex-row flex-col py-2 justify-between items-center lg:px-10"
				id="topHeader"
			>
				<div className="flex gap-3 justify-between items-center">
					<Link href="/">
						<img
							src={"https://www.credore.xyz/assets/images/Logo.png"}
							alt="logo"
							className="w-48"
						/>
					</Link>
				</div>
				<div className="flex gap-4 items-center justify-center">
					<Button className="border-2 border-[#f3754c]" color="light">
						About
					</Button>
					<Button className="border-2 border-[#325d53]" color="light">
						Docs
					</Button>
					<Dropdown color="success" label="Profile">
						<Dropdown.Item className="font-bold">Settings</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item className="font-bold">Sign out</Dropdown.Item>
					</Dropdown>
				</div>
			</section>
			<div className="">
				<hr className="mb-3 w-full h-0.5 opacity-20  bg-black" />
			</div>
		</>
	);
};

export default TopHeader;
