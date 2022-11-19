import { Table } from "flowbite-react";
import React from "react";

const DataTable = () => {
	return (
		<Table className="">
			<Table.Head className="">
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-left">
					Screens
				</Table.HeadCell>
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-right">
					Warranty Term
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						iPhone Premium Screen
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						Lifetime Warranty
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						Iphone Standard Screen
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						3 Months Warranty
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium">
						Other branded phones
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						Lifetime Warranty
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium">
						Tanlets/iPad
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						Lifetime Warranty
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium">
						Macbook & iMac
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						12 Months Warranty
					</Table.Cell>
				</Table.Row>
			</Table.Body>
			<Table.Head className="">
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-left">
					Other Repairs
				</Table.HeadCell>
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-right">
					Warranty Term
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						Batteries
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						12 Months Warranty
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						Iphone Standard Screen
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						3 Months Warranty
					</Table.Cell>
				</Table.Row>
			</Table.Body>
			<Table.Head className="">
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-left">
					Tech Services
				</Table.HeadCell>
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-right">
					Warranty Term
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						Liquid damage
					</Table.Cell>
					<Table.Cell className="text-right font-medium">N/A</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						Logic board repair
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						3 Months Warranty
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium">
						Data recovery
					</Table.Cell>
					<Table.Cell className="text-right font-medium">N/A</Table.Cell>
				</Table.Row>
			</Table.Body>
			<Table.Head className="">
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-left">
					Retail Accessories
				</Table.HeadCell>
				<Table.HeadCell className="border-y-2 border-gray-400 text-base text-[#ef3b78] text-right">
					Warranty Term
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						Cases/Power/Audio Products
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						12 Months Warranty
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-left font-medium ">
						Other accessories
					</Table.Cell>
					<Table.Cell className="text-right font-medium">
						12 Months Warranty
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};

export default DataTable;
