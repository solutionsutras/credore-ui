import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function BasicTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Item One" {...a11yProps(0)} />
					<Tab label="Item Two" {...a11yProps(1)} />
					<Tab label="Item Three" {...a11yProps(2)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
		</Box>
	);
}

{
	/* <div className="py-20 grid grid-cols-4 gap-5 justify-items-center">
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
		<Dropdown.Item className="font-bold">
			PDF
		</Dropdown.Item>
		<Dropdown.Item className="font-bold">
			CSV
		</Dropdown.Item>
	</Dropdown>
</div>
</div> */
}
