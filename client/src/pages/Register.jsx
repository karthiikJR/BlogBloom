import React from "react";
import Form from "../components/Form/Form";

function Register() {
	return (
		<>
			<div className="mt-28 font-secondary grid grid-flow-col sm:grid-cols-2 justify-center">
				<div className="m-auto">
					<Form formType={"Register"} />
				</div>
				<div className="hidden sm:block relative">
					<img
						className="object-cover h-full absolute filter hue-rotate-180 brightness-50 -z-10"
						src="https://images.unsplash.com/photo-1696193846016-f0a30c035e70?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
					/>
					<h2 className="font-primary w-[80%] absolute left-[50%] -translate-x-[55%] top-10 font-bold text-white text-center text-xl lg:text-3xl">
						Welcome to BlogBloom
					</h2>
					<p className="w-[80%] absolute left-[50%] -translate-x-[55%] top-24 text-white text-center text-xs lg:text-sm">
						A blossoming ecosystem for bloggers to nurture their creative
						talents, providing a fertile ground for the growth and development
						of their writing skills, while cultivating a vibrant and supportive
						community.
					</p>
				</div>
			</div>
		</>
	);
}

export default Register;
