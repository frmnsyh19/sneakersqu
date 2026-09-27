// "use client";

// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// // import { Biling } from "./Biling";
// // import DetailsCheckout from "./DetailsCheckout";
// // import { useGetKeranjang } from "@/libs/ServiceApi/useGetKeranjang";
// // import { useGetProfileUser } from "@/libs/ServiceApi/useGetProfileUser";
// // import { useServiceProductCart } from "@/libs/hooks/useServiceProductCart";

// import {
//   addDeliveryCart,
//   addUtilsBilingProps,
// } from "@/features/DeliveryPropsData";

// export const WrapperCheckout = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { data: userData, isLoading: loadingUser } = useGetProfileUser();
//   const { data: productData, isLoading: loadingCart } = useGetKeranjang();

//   const totalPrice = useServiceProductCart(productData || []);

//   // Redirect if user not found
//   useEffect(() => {
//     if (!loadingUser && !userData) {
//       router.push("/profile");
//     }
//   }, [loadingUser, userData, router]);

//   // Redirect if cart is empty
//   useEffect(() => {
//     if (!loadingCart && (!productData || productData.length === 0)) {
//       router.push("/cart");
//     }
//   }, [loadingCart, productData, router]);

//   // Simpan data cart ke redux
//   useEffect(() => {
//     if (productData) {
//       dispatch(addDeliveryCart(productData));
//     }
//   }, [productData, dispatch]);

//   // Simpan data utils untuk billing
//   useEffect(() => {
//     if (userData?.user?.id && totalPrice) {
//       dispatch(
//         addUtilsBilingProps({
//           userid: userData.user.id,
//           total: totalPrice,
//         }),
//       );
//     }
//   }, [userData, totalPrice, dispatch]);

//   if (loadingUser || loadingCart) {
//     return (
//       <div className="w-full absolute flex justify-center items-center top-0 h-screen left-0 bg-slate-100">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col-reverse lg:flex-row w-full">
//       <div className="w-full lg:w-2/4">
//         <Biling user={userData} />
//       </div>
//       <div className="w-full lg:w-[45%]">
//         <DetailsCheckout />
//       </div>
//     </div>
//   );
// };
