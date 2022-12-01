import { Divider } from "@mui/material";
import { Button, Card, Dropdown, Modal, Table, Tabs } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawee from "./Drawee";
import DropdownBtn from "./DropdownBtn";

// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

type Product = {
	dlpcId: string;
	obligorOrgName: string;
	beneficiaryOrgName: string;
	signedByCommitter: boolean;
	signedByCommittee: boolean;
	amount: string;
	currency: string;
};

type VERIFY = {
	chain: string;
	verified: boolean;
};

type USER = {
	user: {
		email: string;
		orgLei: string;
		name: string;
	};
};

// type MYNAME = {
// 	MyName: string;
// };

const Dashboard = () => {
	var converter = require("number-to-words");
	const [visible, setVisible] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);
	const [data, setData] = useState<Product[]>([]);
	const [orgli, setOrgli] = useState<string | null>();
	const [verify, setVerify] = useState<VERIFY[]>([]);
	const [hide, setHide] = useState(false);
	const [select, setSelect] = useState("xinfin");
	const [name, setName] = useState("");
	console.log(verify);
	useEffect(() => {
		const authStr = localStorage.getItem("user");

		if (!authStr) return;
		const auth: USER = JSON.parse(authStr);

		const myOrgli = auth.user.orgLei;
		console.log("orgli", myOrgli);
		setOrgli(myOrgli);
		setName(auth.user.name);
		const url = `http://credore.eastus.cloudapp.azure.com/dlpc/pnotebylei/drawer/${myOrgli}`;
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const result = await response.json();
				console.log("Result is >>>>", result.length);
				if (result.length > 0) {
					setData(result);
				} else {
					return;
				}

				console.log("🔥🔥🔥", auth.user);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [orgli]);

	useEffect(() => {
		console.log(select);
		const url = `http://credore.eastus.cloudapp.azure.com/dlpc/verifyproof/seller@sigmafoods.com/d0aa9863-029a-4c91-be7d-b9f804a2bd43/${select}`;

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const result = await response.json();
				console.log(result);
				setVerify(result);
				console.log("🔥🔥", url);
			} catch (error) {
				console.log(error);
			}
		};
		select && fetchData();
	}, [select]);

	const handleShow = () => {
		setHide(!hide);
	};

	return (
		<div className="px-10 py-10">
			<Card>
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Welcome {name} ,
				</h5>
				<Tabs.Group
					className="flex justify-start"
					aria-label="Default tabs"
					style="default"
				>
					<Tabs.Item active={true} title="Promissory Note">
						<div className="py-5">
							<h1 className="font-bold text-xl pb-2">As a drawer</h1>
							<Divider />
						</div>
						{data.length === 0 ? (
							<p>No data avl</p>
						) : (
							<div className="grid grid-cols-4">
								<div className="flex flex-col justify-center items-center w-56">
									<p className="text-lg font-bold underline">dlpcId</p>
									{/* <p>e4303e52-4a83</p> */}

									{!data ? (
										<p className="text-lg font-bold underline">No data avl</p>
									) : (
										data.map((item, index) => (
											<p key={index}>{item.dlpcId.slice(0, 8)}...</p>
										))
									)}
								</div>

								{/* View */}
								<div>
									<Button onClick={() => setVisible(true)}>View</Button>
									<Modal size="5xl" show={visible} popup={true}>
										<div className="px-5 pt-8 pb-3 flex justify-between">
											<p className="text-2xl font-bold">pNote</p>
										</div>
										<Divider className="bg-gray-300" />
										<div className="w-full bg-white"></div>
										<Modal.Body>
											<Table className="my-7">
												<Table.Head>
													<Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] ">
														The Makers of this promissory note
													</Table.HeadCell>
													<Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] ">
														Makes commitment to pay the order of
													</Table.HeadCell>
													<Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] ">
														On Due Date
													</Table.HeadCell>
													<Table.HeadCell className=" border-y-2 border-gray-400 text-base text-[#f15928] "></Table.HeadCell>
												</Table.Head>
												<Table.Body className="divide-y">
													<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
														{data.map((item, index) => (
															<>
																<Table.Cell
																	key={index}
																	className="  text-gray-900 dark:text-white font-medium "
																>
																	{item.obligorOrgName}
																</Table.Cell>
																<Table.Cell className="  text-gray-900 dark:text-white font-medium ">
																	{item.beneficiaryOrgName}
																</Table.Cell>
																<Table.Cell className="  text-gray-900 dark:text-white font-medium ">
																	24/11/2022
																</Table.Cell>
																<Table.Cell className="  text-gray-900 dark:text-white font-medium ">
																	<p className="font-semibold text-blue-600 underline cursor-pointer">
																		Download PDF
																	</p>
																</Table.Cell>
															</>
														))}
													</Table.Row>
												</Table.Body>
											</Table>
											<div className="pt-3">
												<p className="text-xl font-bold text-[#f36e28]">
													The sum of
												</p>

												{data.map((item, index) => (
													<p key={index} className="text-3xl font-medium">
														${item.amount}
													</p>
												))}

												{data.map((item, index) => (
													<p key={index} className="w-1/2 font-medium">
														{converter
															.toWords(item.amount)
															.replace(/^(.)|\s+(.)/g, (c: any) =>
																c.toUpperCase()
															)}{" "}
														{item.currency}
													</p>
												))}

												<p className="text-xs text-gray-700 py-3">
													This note and any contractual obligations arising out
													of or in connection with it will be governed by and
													construed in accordance with the laws of the State of
													Delaware without regard to conflict of laws principles
													.
												</p>
											</div>
											<div className="flex justify-between items-center">
												<div className="mt-8 flex justify-start gap-10">
													<div className="flex flex-col justify-center items-center">
														<p className="text-md text-center font-bold text-[#f36e28]">
															Digitally Signed by obligor
														</p>
														<p className="text-md font-normal">
															{data.map((item, index) => (
																<p key={index}>{item.obligorOrgName}</p>
															))}
														</p>
													</div>

													<div className="flex flex-col justify-center items-center">
														<p className="text-md text-center font-bold text-[#f36e28]">
															Date of signature
														</p>
														{data.map((item, index) => (
															<p
																className="text-sm font-bold text-gray-500"
																key={index}
															>
																{item.signedByCommittee && "26/11/2022"}
															</p>
														))}
													</div>
												</div>
												<div className="mt-10 w-0.5 h-10 bg-slate-700"></div>
												<div className="mt-8 flex justify-start gap-10">
													<div className="flex flex-col justify-center items-center">
														<p className="text-md text-center font-bold text-[#f36e28]">
															Digitally Signed by beneficiary
														</p>
														<p className="text-md font-normal">
															{data.map((item, index) => (
																<p key={index}>{item.beneficiaryOrgName}</p>
															))}
														</p>
													</div>

													<div className="flex flex-col justify-center items-center">
														<p className="text-md text-center font-bold text-[#f36e28]">
															Date of signature
														</p>
														<p className="text-sm font-bold text-gray-500">
															{data.map((item, index) => (
																<p key={index}>
																	{item.signedByCommitter && "26/11/2022"}
																</p>
															))}
														</p>
													</div>
												</div>
											</div>

											<Button
												className="mt-10"
												onClick={() => setVisible(false)}
												color="failure"
											>
												Close
											</Button>
										</Modal.Body>
									</Modal>
								</div>

								{/* Verify */}
								<div>
									<Button onClick={() => setShow(true)}>Verify</Button>
									<Modal show={show} popup={true}>
										<Modal.Body className="">
											<div className="flex justify-between">
												<h3 className="py-5 text-2xl font-semibold">
													Blockchain
												</h3>
												<div className="py-5 justify-self-end">
													{/* <Dropdown
													 label="Dropdown button"
													 dismissOnClick={false}
												 >
													 <Dropdown.Item onClick={handleSelect}>
														 ethereum
													 </Dropdown.Item>
													 <Dropdown.Item onClick={handleSelect}>
														 xinfin
													 </Dropdown.Item>
													 <Dropdown.Item onClick={handleSelect}>
														 polygon
													 </Dropdown.Item>
												 </Dropdown> */}
													<select
														value={select}
														onChange={(e) => setSelect(e.target.value)}
													>
														<option>ethereum</option>
														<option>xinfin</option>
														<option>polygon</option>
													</select>

													{/* <DropdownBtn /> */}
												</div>
											</div>
											<Divider className="mb-5" />
											<Card className="my-10">
												<div className="flex gap-16">
													<Button
														className="w-20"
														onClick={handleShow}
														color="success"
													>
														Verify
													</Button>
													<div className="font-bold">
														<div>
															<p>Initiated</p>
														</div>
														<p>Effective</p>

														<p>Discharged</p>
													</div>
													<div className={hide ? "hidden" : "block"}>
														{verify?.map(
															(item, index) =>
																item.verified && (
																	<p className="font-medium">{`Verified`}</p>
																)
														)}
														<p>Yet to Verify</p>
													</div>
												</div>
											</Card>

											<Button onClick={() => setShow(false)} color="failure">
												Close
											</Button>
										</Modal.Body>
									</Modal>
								</div>

								{/* newpNote */}
								<div className="justify-self-end">
									<Link href={"/new_pNote"}>
										<Button>New pNote</Button>
									</Link>
								</div>
							</div>
						)}

						<div className="mt-10">
							<Divider />
						</div>
						<div className="py-2">
							<h1 className="font-bold text-xl pb-2">As a drawee</h1>
							<Divider />
						</div>

						<Drawee />
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
