import { Dropdown } from "flowbite-react";
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
				<div className="hidden md:flex gap-4 items-center justify-center">
					<Dropdown label="Dropdown button">
						<Dropdown.Header>
							<span className="block text-sm">Bonnie Green</span>
							<span className="block text-sm font-medium truncate">
								bonnie@flowbite.com
							</span>
						</Dropdown.Header>
						<Dropdown.Item>Dashboard</Dropdown.Item>
						<Dropdown.Item>Settings</Dropdown.Item>
						<Dropdown.Item>Earnings</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item>Sign out</Dropdown.Item>
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
