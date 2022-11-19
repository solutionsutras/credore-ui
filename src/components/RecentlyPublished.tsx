import React from "react";
import PublishCard from "./PublishCard";

const RecentlyPublished = () => {
	return (
		<>
			<div className="border-b-2 border-[#efefef] p-7">
				<h2 className="text-base font-bold">Recently Published</h2>
			</div>
			<PublishCard />
			<div className="flex justify-center border-b-2 border-[#efefef] p-3">
				<img
					src="https://cdn.shopify.com/s/files/1/1180/1832/articles/samsung-galaxy-wont-turn-on_99f854d0-3332-4f0f-b50a-dac5fbcd1ee3_300x300.jpg?v=1657725018"
					alt=""
					className="w-24 h-16"
				/>
				<div className="px-3 text-sm font-medium w-full">
					<h2 className="mb-3">
						SAMSUNG GALAXY WON’T TURN ON? HERE'S THE FIX!
					</h2>

					<p>Jul 19, 2022 / 0 comment</p>
				</div>
			</div>
			<div className="flex justify-center border-b-2 border-[#efefef] p-3">
				<img
					src="https://cdn.shopify.com/s/files/1/1180/1832/articles/unnamed_300x300.jpg?v=1658847816"
					alt=""
					className="w-24 h-16"
				/>
				<div className="px-3 text-sm font-medium w-full">
					<h2 className="mb-3">HOW TO FIX A WATER DAMAGED IPHONE?</h2>

					<p>Jul 19, 2022 / 0 comment</p>
				</div>
			</div>
			<div className="flex justify-center border-b-2 border-[#efefef] p-3">
				<img
					src="https://cdn.shopify.com/s/files/1/1180/1832/articles/iphone_won_t_turn_on_cover_300x300.jpg?v=1658908551"
					alt=""
					className="w-24 h-16"
				/>
				<div className="px-3 text-sm font-medium w-full">
					<h2 className="mb-3">IPHONE WON'T TURN ON. HOW TO FIX?</h2>

					<p>Jul 19, 2022 / 0 comment</p>
				</div>
			</div>
		</>
	);
};

export default RecentlyPublished;
