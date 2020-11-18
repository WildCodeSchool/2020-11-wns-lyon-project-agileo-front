import React from 'react';
import { HeaderMyProfile } from 'components';

const Edit = () => {
	return (
		<>
			<HeaderMyProfile />
			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="#" method="POST">
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first_name"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												First name
											</label>
											<input
												id="first_name"
												className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="last_name"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												Last name
											</label>
											<input
												id="last_name"
												className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											/>
										</div>

										<div className="col-span-6 sm:col-span-4">
											<label
												htmlFor="email_address"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												Email address
											</label>
											<input
												id="email_address"
												className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="country"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												Country / Region
											</label>
											<select
												id="country"
												className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											>
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
										</div>

										<div className="col-span-6">
											<label
												htmlFor="street_address"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												Street address
											</label>
											<input
												id="street_address"
												className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="city"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												City
											</label>
											<input
												id="city"
												className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="state"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												State / Province
											</label>
											<input
												id="state"
												className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="postal_code"
												className="block text-sm font-medium leading-5 text-gray-700"
											>
												ZIP / Postal
											</label>
											<input
												id="postal_code"
												className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											/>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
