import { Button, Card, Dropdown, Modal, Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";

type Product = {
	dlpcId: string;
	obligorOrgName: string;
	beneficiaryOrgName: string;
};

type USER = {
	user: {
		email: string;
	};
};

// type MYNAME = {
// 	MyName: string;
// };

const Dashboard = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);
	const [data, setData] = useState<Product[]>([]);
	const [email, setEmail] = useState<string | null>();

	useEffect(() => {
		// const url = "https://jsonplaceholder.typicode.com/users";
		const url =
			"http://credore.eastus.cloudapp.azure.com/dlpc/pnotebylei/84UKLVMY23DS";
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const result = await response.json();
				console.log("Result", result);
				setData(result);
				const authStr = localStorage.getItem("user");

				if (!authStr) return;
				const auth: USER = JSON.parse(authStr);

				const myEmail = auth.user.email;
				console.log(myEmail);
				setEmail(myEmail);

				console.log("user", auth.user.email);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="px-10 py-10">
			<Card>
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{/* Welcome Mr.Kumar , */}
				</h5>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of 2021 so
					far, in reverse chronological order.
				</p>
				<p>Email : {email}</p>

				<Tabs.Group
					className="flex justify-start"
					aria-label="Default tabs"
					style="default"
				>
					<Tabs.Item active={true} title="Promissory Note">
						<div className="grid grid-cols-3">
							<div className="flex flex-col justify-center items-center w-56">
								<p className="text-lg font-bold underline">dlpcId</p>
								{/* <p>e4303e52-4a83</p> */}
								{data.map((item, index) => (
									<p key={index}>{item.dlpcId.slice(0, 8)}...</p>
								))}
							</div>

							{/* View */}
							<div>
								<Button onClick={() => setVisible(true)}>View</Button>
								<Modal size="7xl" show={visible} popup={true}>
									<div className="px-5 pt-8 pb-3 flex justify-between">
										<p className="text-2xl font-bold">pNote</p>
										{/* <img
											src={"https://www.credore.xyz/assets/images/Logo.png"}
											alt="logo"
											className="w-48"
										/> */}
									</div>
									<div className="w-full h-[0.5px] bg-gray-400"></div>
									<Modal.Body>
										<div className="py-4 grid grid-cols-4 gap-5 justify-items-center">
											<div>
												<p className="text-md font-bold text-[#294adc]">
													The Makers of this promissory note
												</p>
												{data.map((item, index) => (
													<p key={index}>{item.obligorOrgName}...</p>
												))}
												<p>Sample CompanyLLC</p>
											</div>
											<div>
												<p className="text-md font-bold text-[#294adc]">
													Makes commitment to pay the order of
												</p>
												{data.map((item, index) => (
													<p key={index}>{item.beneficiaryOrgName}...</p>
												))}
											</div>
											<div>
												<p className="text-md font-bold text-[#294adc]">
													On Due Date
												</p>
												<p>{Date()}</p>
											</div>
											<div className="">
												<Dropdown label="Download" dismissOnClick={false}>
													<Dropdown.Item>PDF</Dropdown.Item>
													<Dropdown.Item>CSV</Dropdown.Item>
												</Dropdown>
											</div>
										</div>
										<Button onClick={() => setVisible(false)} color="failure">
											Yes, I'm sure
										</Button>
									</Modal.Body>
								</Modal>
							</div>

							{/* Verify */}
							<div>
								<Button onClick={() => setShow(true)}>Verify</Button>
								<Modal show={show} popup={true}>
									<Modal.Body className="">
										<div className="space-y-10">
											<h3 className="mb-5  text-lg font-normal text-gray-500 dark:text-gray-400">
												Are you sure you want to delete this product?
											</h3>
											<div className="flex justify-center gap-4">
												<Button onClick={() => setShow(false)} color="failure">
													Yes, I'm sure
												</Button>
												<Button onClick={() => setShow(false)} color="gray">
													No, cancel
												</Button>
											</div>
										</div>
									</Modal.Body>
								</Modal>
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Bill Of Exchange">
						Bill Of Exchange content
					</Tabs.Item>
				</Tabs.Group>
			</Card>
		</div>
	);
};

export default Dashboard;
