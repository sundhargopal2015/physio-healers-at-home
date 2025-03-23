"use client";
import { useRouter } from "next/navigation";
import { useBooking } from "../app/BookingContext";
import { Footer, Header } from "@/app/utility";

export default function ThankYouPage() {
  const router = useRouter();
  const { bookingInfo, clearBookingInfo } = useBooking();

  const handleBackHome = () => {
    clearBookingInfo();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
        <h2 className="text-2xl font-bold text-green-600">Thank You!</h2>
        <p className="mt-2 text-gray-700">Your booking has been confirmed.</p>

        {bookingInfo ? (
          <div className="mt-4 w-full max-w-2xl">
            <div className="flex flex-col items-start p-4 bg-gray-100 rounded shadow-md mb-4">
              <p>
                <strong>Name:</strong> {bookingInfo.name}
              </p>
              <p>
                <strong>Phone:</strong> {bookingInfo.phone}
              </p>
              <p>
                <strong>Service:</strong> {bookingInfo.service}
              </p>
              <p>
                <strong>Date:</strong> {bookingInfo.date}
              </p>
              <p>
                <strong>Time:</strong> {bookingInfo.time}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow-md text-center">
            <p className="text-red-500">Booking details not available.</p>
            <p className="mt-2 text-gray-700">
              For assistance, please contact us at:
            </p>
            <p className="text-gray-700 font-semibold">+91 98765 43210</p>
          </div>
        )}

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
