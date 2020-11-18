import React from 'react';
import { Switch } from 'components';

// @ts-ignore
const Slide = ({ setIsOpen2, isOpen2 }) => {
	return (
		<>
			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					<section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
						<div className="relative w-screen max-w-md">
							<div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
								<button
									type="button"
									onClick={() => setIsOpen2(!isOpen2)}
									aria-label="Close panel"
									className="text-gray-300 hover:text-white transition ease-in-out duration-150"
								>
									<svg
										className="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<div className="h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll">
								<header className="px-4 sm:px-6">
									<h2 className="text-lg leading-7 font-medium text-gray-900">Panel title</h2>
								</header>
								<div className="relative flex-1 px-4 sm:px-6">
									<Switch label={'Enable Notifications'} />
									<Switch label={'Enable Dark Mode'} />
									<Switch label={'Enable Statistics'} />
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default Slide;
