"use client";

import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Meals {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
}

interface FormData {
    fullName: string;
    email: string;
    mobileNumber: string;
    travelDate: Date | null;
    numberOfDays: number;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    meals: Meals;
}

const initialFormData: FormData = {
    fullName: "",
    email: "",
    mobileNumber: "",
    travelDate: null,
    numberOfDays: 1,
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfInfants: 0,
    meals: {
        breakfast: false,
        lunch: false,
        dinner: false,
    },
};

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobileNumber: Yup.number().required("Mobile Number is required"),
    travelDate: Yup.date().nullable().required("Travel Date is required"),
    numberOfDays: Yup.number().min(1, "At least 1 day is required").required("Number of Days is required"),
    numberOfAdults: Yup.number().min(1, "At least 1 adult is required").required("Number of Adults is required"),
    numberOfChildren: Yup.number().min(0, "Cannot be negative").required("Number of Children is required"),
    numberOfInfants: Yup.number().min(0, "Cannot be negative").required("Number of Infants is required"),
});

const PopupForm = React.memo(({ onClose }: { onClose: () => void }) => {
    const formik = useFormik({
        initialValues: initialFormData,
        validationSchema,
        onSubmit: (values) => {
            console.log("Form Data:", values);
        },
    });

    const handleMealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        formik.setFieldValue(`meals.${name}`, checked);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px] MbView">
                <div className="container mx-auto px-4">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="shadow-three mx-auto max-w-[650px] rounded-3xl bg-white px-6 py-10 dark:bg-dark sm:p-[50px]">
                                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                    Travel Enquiry Form
                                </h3>
                                <form onSubmit={formik.handleSubmit} className="space-y-5">
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
                                                value={formik.values.fullName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.fullName && formik.errors.fullName ? (
                                                <div className="text-red-600">{formik.errors.fullName}</div>
                                            ) : null}
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
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="text-red-600">{formik.errors.email}</div>
                                            ) : null}
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
                                                value={formik.values.mobileNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                                                <div className="text-red-600">{formik.errors.mobileNumber}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="travelDate" className="mb-3 block text-sm text-dark dark:text-white">
                                                Travel Date
                                            </label>                                            
                                            <DatePicker placeholderText="01/01/1999"
                                                selected={formik.values.travelDate}
                                                onChange={(date: [Date, Date]) => formik.setFieldValue("travelDate", date)}
                                                selectsRange 
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            />
                                            {formik.touched.travelDate && formik.errors.travelDate ? (                                                
                                            <div className="text-red-600">{formik.errors.travelDate as string}</div>) : null}
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
                                                    onClick={() => formik.setFieldValue("numberOfDays", formik.values.numberOfDays - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={formik.values.numberOfDays <= 1}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={formik.values.numberOfDays}
                                                    readOnly
                                                    className="mx-2 w-14 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => formik.setFieldValue("numberOfDays", formik.values.numberOfDays + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {formik.touched.numberOfDays && formik.errors.numberOfDays ? (
                                                <div className="text-red-600">{formik.errors.numberOfDays}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="numberOfAdults" className="mb-3 block text-sm text-dark dark:text-white">
                                                Number of Adults
                                            </label>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => formik.setFieldValue("numberOfAdults", formik.values.numberOfAdults - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={formik.values.numberOfAdults <= 1}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={formik.values.numberOfAdults}
                                                    readOnly
                                                    className="mx-2 w-14 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => formik.setFieldValue("numberOfAdults", formik.values.numberOfAdults + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {formik.touched.numberOfAdults && formik.errors.numberOfAdults ? (
                                                <div className="text-red-600">{formik.errors.numberOfAdults}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="numberOfChildren" className="mb-3 block text-sm text-dark dark:text-white">
                                                Number of Children
                                            </label>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => formik.setFieldValue("numberOfChildren", formik.values.numberOfChildren - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={formik.values.numberOfChildren <= 0}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={formik.values.numberOfChildren}
                                                    readOnly
                                                    className="mx-2 w-14 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => formik.setFieldValue("numberOfChildren", formik.values.numberOfChildren + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {formik.touched.numberOfChildren && formik.errors.numberOfChildren ? (
                                                <div className="text-red-600">{formik.errors.numberOfChildren}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="numberOfInfants" className="mb-3 block text-sm text-dark dark:text-white">
                                                Number of Infants
                                            </label>
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => formik.setFieldValue("numberOfInfants", formik.values.numberOfInfants - 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    disabled={formik.values.numberOfInfants <= 0}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={formik.values.numberOfInfants}
                                                    readOnly
                                                    className="mx-2 w-14 text-center border-stroke dark:text-body-color-dark dark:shadow-two rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => formik.setFieldValue("numberOfInfants", formik.values.numberOfInfants + 1)}
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two px-3 py-1 rounded bg-[#f8f8f8] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {formik.touched.numberOfInfants && formik.errors.numberOfInfants ? (
                                                <div className="text-red-600">{formik.errors.numberOfInfants}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="mb-8 grid grid-flow-row md:grid-cols-1 gap-4">
                                    <div>
                                        <label className="mb-3 block text-sm text-dark dark:text-white">
                                            Meals
                                        </label>
                                        <div className="flex flex-row space-x-3">
                                            {["breakfast", "lunch", "dinner"].map((meal) => (
                                                <label key={meal} className="flex items-center">
                                                    <input type="checkbox" name={meal}
                                                    checked={formik.values.meals[meal as keyof Meals]} 
                                                    onChange={handleMealChange} className="mr-2"/>
                                                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            type="button"
                                            className="rounded-full bg-red-500 px-8 py-3 text-white"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-full bg-green-500 px-8 py-3 text-white"
                                        >
                                            Submit
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
});

PopupForm.displayName = "PopupForm";

const BookNowButton = () => {
    const [isFormOpen, setFormOpen] = useState(false);

    const handleButtonClick = useCallback(() => {
        setFormOpen(true);
    }, []);

    const handleCloseForm = useCallback(() => {
        setFormOpen(false);
    }, []);

    return (
        <div className="flex items-center justify-center m-4">            
            <button onClick={handleButtonClick}
               className="rounded-full bg-primary mt-10 px-8 py-3 text-white hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
                Book Now
            </button>
            {isFormOpen && <PopupForm onClose={handleCloseForm} />}
        </div>
    );
};

export default BookNowButton;
