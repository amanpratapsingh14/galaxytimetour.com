"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const initialContactFormData: ContactFormData = {
    name: "",
    email: "",
    message: "",
};

const contactValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
    const formik = useFormik({
        initialValues: initialContactFormData,
        validationSchema: contactValidationSchema,
        onSubmit: (values) => {
            console.log("Contact Form Data:", values);
        },
    });
    const { theme } = useTheme();

    return (
        <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                        <div
                            className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                            data-wow-delay=".15s"
                        >
                            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                Need Help? Open a Ticket
                            </h2>
                            <p className="mb-12 text-base font-medium text-body-color">
                                Our support team will get back to you ASAP via email.
                            </p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="-mx-4 flex flex-wrap">
                                    <div className="w-full px-4 md:w-1/2">
                                        <div className="mb-8">
                                            <label
                                                htmlFor="name"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Enter your name"
                                                autoComplete="name"
                                                className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="text-red-600">{formik.errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full px-4 md:w-1/2">
                                        <div className="mb-8">
                                            <label
                                                htmlFor="email"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                                Your Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                autoComplete="email"
                                                className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="text-red-600">{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className="mb-8">
                                            <label
                                                htmlFor="message"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                                Your Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                placeholder="Enter your Query"
                                                autoComplete="off"
                                                className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                                                value={formik.values.message}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            ></textarea>
                                            {formik.touched.message && formik.errors.message ? (
                                                <div className="text-red-600">{formik.errors.message}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <button type="submit" 
                                            className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                                            Submit Ticket
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Include other components or content here */}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
