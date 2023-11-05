import React from "react";

function Posts() {
	return (
		<div className="w-full flex flex-col lg:flex-row items-center p-1 border border-gray-300 my-5">
			<div className="h-full">
				<img
					className="object-contain h-full"
					src="https://images.yourstory.com/cs/2/628912e0d7f211eb8e8307e5b6451cf7/FlipkartFI-07-1698555030026.png?w=1152&fm=auto&ar=2:1&mode=crop&crop=faces"
					alt=""
				/>
			</div>
			<div className="p-4 flex flex-col gap-2 justify-between text-darkest_accent">
				<h2 className="font-bold md:text-3xl text-xl cursor-pointer">
					FLIPKART TAKES A STAB AT INSURANCE ONCE AGAIN
				</h2>
				<p className="text-xs flex gap-3 text-gray-500 font-bold items-center">
					<a className="p-1 border border-gray-500 cursor-pointer text-[#333]">
						Naina Sood
					</a>
					<time>22-Mar-2023</time>
				</p>
				<p className="text-xs sm:text-md">
					Flipkart has decided to revive its insurance game in a revamped
					avatar, with a new technology partner, Coverfox. As the ecommerce
					player ramps up its financial services portfolio, post separation from
					PhonePe, a new plug-and-play independent insurance model is in the
					making.
				</p>
			</div>
		</div>
	);
}

export default Posts;
