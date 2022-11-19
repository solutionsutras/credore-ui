import React from "react";
import { locations } from "../configs";

const LocationSelector = ({
	name,
	onChange,
	onBlur,
	value,
	defaultValue,
	className,
}: any) => {
	return (
		<div>
			<select
				defaultValue={defaultValue}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				id=""
				className={`flex w-full gap-3 rounded-lg border  p-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${className}`}
			>
				{locations.map((item: any, index: any) => (
					<option key={index} value={item.location}>
						{item.location}
					</option>
				))}
			</select>
		</div>
	);
};

export default LocationSelector;
