import React from "react";
import { Link } from "react-router-dom";
import LottieAnimation from "../components/ui/LottieAnimation";
import animation404 from "../assets/animations/Error 404.json";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-5 bg-[var(--bg-body)] text-[var(--text-body)]">
      <div className="w-80 max-w-[90%]">
        <LottieAnimation animationData={animation404} loop={true} autoplay={true} />
      </div>
      <h1 className="mt-6 heading-hero text-[var(--text-heading)]">404 - Page Not Found</h1>
      <p className="mt-3 text-body-lg text-[var(--text-muted)] max-w-md mx-auto">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-5 btn-primary"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;