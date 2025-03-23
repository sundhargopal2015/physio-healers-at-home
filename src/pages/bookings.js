"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";
import { Footer, Header } from "@/app/utility";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/");
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("bookingsData", bookingsData);
        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center flex-grow p-6">
        <h2 className="text-2xl font-bold text-green-600">Bookings</h2>

        {loading ? (
          <p className="mt-4 text-gray-600">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="mt-4 text-red-500">No bookings found.</p>
        ) : (
          <div className="mt-4 w-full max-w-2xl">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-gray-100 rounded shadow-md mb-4"
              >
                <p>
                  <strong>Name:</strong> {booking.name}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Service:</strong> {booking.service}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Time:</strong> {booking.time}
                </p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleBackHome}
          className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 cursor-pointer"
        >
          Home
        </button>
      </div>
      <Footer />
    </div>
  );
}
