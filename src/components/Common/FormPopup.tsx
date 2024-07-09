"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PopupForm = ({ onClose }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [Day, setDays] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [meals, setMeals] = useState({
        breakfast: false,
        lunch: false,
        dinner: false,
    });

    const handleMealChange = (e) => {
        const { name, checked } = e.target;
        setMeals({ ...meals, [name]: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            mobileNumber: e.target.mobileNumber.value,
            travelDate: startDate,
            numberOfDays: Day,
            numberOfAdults: adults,
            numberOfChildren: children,
            numberOfInfants: infants,
            meals: meals,
        };
        console.log("this is form data ", formData);
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap ">
                        <div className="w-full px-4">
                            <div className="shadow-three mx-auto max-w-[650px] rounded-3xl bg-white px-6 py-10 dark:bg-dark sm:p-[50px]">                                
                                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                    Travel Enquiry Form
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="fullName" className="mb-3 block text-sm text-dark dark:text-white">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Enter your full name"
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="mb-3 block text-sm text-dark dark:text-white">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="mobileNumber" className="mb-3 block text-sm text-dark dark:text-white">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="text"
                                                name="mobileNumber"
                                                placeholder="Enter your mobile number"
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="travelDate" className="mb-3 block text-sm text-dark dark:text-white">
                                                Travel Date
                                            </label>
                                            <DatePicker
                                                placeholderText="01/01/1999"
                                                selected={startDate}
                                                onChange={(date: Date) => setStartDate(date)}
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="numberOfDays" className="mb-3 block text-sm text-dark dark:text-white">
                                                Number of Days
                                            </label>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setDays(Day - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={Day <= 1}>
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={Day}
                                                    readOnly
                                                    className="mx-2 w-14 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setDays(Day + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="numberOfAdults" className="mb-3 block text-sm text-dark dark:text-white">
                                                Number of Adults (18+ years)
                                            </label>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setAdults(adults - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={adults <= 1}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={adults}
                                                    readOnly
                                                    className="mx-2 w-12 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setAdults(adults + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="numberOfChildren" className="mb-3 block text-sm text-dark dark:text-white">
                                                Number of Children (3-10 years)
                                            </label>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setChildren(children - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={children <= 0}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={children}
                                                    readOnly
                                                    className="mx-2 w-12 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setChildren(children + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="numberOfInfants" className="mb-3 block text-sm text-dark dark:text-white">
                                                Number of Infants (0-2 years)
                                            </label>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setInfants(infants - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={infants <= 0}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={infants}
                                                    readOnly
                                                    className="mx-2 w-12 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setInfants(infants + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-8">
                                        <label className="mb-3 block text-sm text-dark dark:text-white">Meals</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="breakfast"
                                                    checked={meals.breakfast}
                                                    onChange={handleMealChange}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two mr-2 rounded-sm border bg-[#f8f8f8] px-2 py-2 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <label htmlFor="breakfast" className="text-sm text-dark dark:text-white">
                                                    Breakfast
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="lunch"
                                                    checked={meals.lunch}
                                                    onChange={handleMealChange}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two mr-2 rounded-sm border bg-[#f8f8f8] px-2 py-2 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <label htmlFor="lunch" className="text-sm text-dark dark:text-white">
                                                    Lunch
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="dinner"
                                                    checked={meals.dinner}
                                                    onChange={handleMealChange}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two mr-2 rounded-sm border bg-[#f8f8f8] px-2 py-2 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <label htmlFor="dinner" className="text-sm text-dark dark:text-white">
                                                    Dinner
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="submit" className="rounded-xl hover:bg-[#14A44D]  bg-primary p-3 text-white">
                                            Book Now
                                        </button>
                                        <button type="button" onClick={onClose} className="rounded-xl hover:bg-red-700 bg-gray-500 p-3 text-white">
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookNowButton = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            <button
                onClick={handleOpenPopup}
                className="fixed bottom-20 right-10 bg-primary p-4 text-white rounded-full"
            >
                Book Now
            </button>
            {isPopupOpen && <PopupForm onClose={handleClosePopup} />}
        </div>
    );
};

export default BookNowButton;
