import React from "react";
import { Link } from "react-router-dom";
import LottieAnimation from "../components/ui/LottieAnimation";
import animation404 from "../assets/animations/Error 404.json";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-5 bg-white text-slate-800">
      <div className="w-80 max-w-[90%]">
        <LottieAnimation animationData={animation404} loop={true} autoplay={true} />
      </div>
      <h1 className="mt-6 text-4xl font-extrabold text-slate-900">404 - Page Not Found</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-md mx-auto">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-5 px-[22px] py-3 bg-[#2563eb] text-white no-underline rounded-lg hover:bg-blue-700 transition-colors inline-block font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;