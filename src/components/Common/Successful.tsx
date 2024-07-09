// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useSearchParams } from "next/navigation";

// const Successful = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const formData = JSON.parse(searchParams.get('formData') || '{}');

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push("/");
//     }, 15000); // 15 seconds

//     return () => clearTimeout(timer);
//   }, [router]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
//         <div className="container">
//           <div className="-mx-4 flex flex-wrap">
//             <div className="w-full px-4">
//               <div className="shadow-three mx-auto max-w-[700px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
//                 <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
//                   Booking Successful
//                 </h3>
//                 <div className="text-center">
//                   <p>Full Name: {formData.fullName}</p>
//                   <p>Email: {formData.email}</p>
//                   <p>Mobile Number: {formData.mobileNumber}</p>
//                   <p>Travel Date: {formData.travelDate}</p>
//                   <p>Number of Days: {formData.numberOfDays}</p>
//                   <p>Number of Adults: {formData.numberOfAdults}</p>
//                   <p>Number of Children: {formData.numberOfChildren}</p>
//                   <p>Number of Infants: {formData.numberOfInfants}</p>
//                   <p>Meals: {formData.meals && Object.entries(formData.meals).map(([meal, included]) => included && meal).filter(Boolean).join(', ')}</p>
//                 </div>
//                 <p className="mt-4 text-center text-lg">Redirecting to Home Page...</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Successful;
