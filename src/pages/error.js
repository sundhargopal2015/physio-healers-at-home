"use client";
import { useRouter } from "next/navigation";
import { useBooking } from "../app/BookingContext";
import { Footer, Header } from "@/app/utility";

export default function ErrorPage() {
  const router = useRouter();
  const { clearBookingInfo } = useBooking();
  const handleBackHome = () => {
    clearBookingInfo();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="mt-2 text-gray-700">
          Please contact us at +91 98765 43210 for assistance.
        </p>
        <button
          onClick={handleBackHome}
          className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 cursor-pointer"
        >
          Back to Home
        </button>
      </div>
      <Footer />
    </div>
  );
}
