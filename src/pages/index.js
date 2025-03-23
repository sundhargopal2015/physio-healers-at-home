"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../app/firebase";
import { useRouter } from "next/navigation";
import { useBooking } from "../app/BookingContext";
import { BookNowButton, Footer, Header } from "../app/utility";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const { setBookingInfo } = useBooking();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await addDoc(collection(db, "bookings"), formData);
        console.log("Document written with ID: ", formData);
        console.log(setBookingInfo);
        setBookingInfo(formData);
        router.push("/thank-you");
      } catch (error) {
        console.error("Error adding document: ", error);
        router.push("/error");
      } finally {
        setFormData({
          name: "",
          phone: "",
          service: "",
          date: "",
          time: "",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Header with Logo */}
      <Header />
      <section className="w-full flex flex-col md:flex-row items-center relative">
        {/* Left Side - Background Image */}
        <div className="w-full md:w-2/3 h-80 md:h-screen relative">
          <Image
            src="/images/home.png"
            alt="Physiotherapy"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right Side - Booking Form */}
        <motion.div
          className="w-full md:w-1/3 bg-white p-6 md:p-12 relative md:relative top-0 right-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-center text-2xl font-bold mb-6">
            Say Goodbye to Pain with Physio Healers
          </h2>
          <section className="bg-white p-4">
            <h3 className="text-center text-2xl font-bold mb-4">
              Schedule Your Session
            </h3>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">Select Service</option>
                <option value="Orthopedic Physiotherapy">
                  Orthopedic Physiotherapy
                </option>
                <option value="Sports Injury Physiotherapy">
                  Sports Injury Physiotherapy
                </option>
                <option value="Post-Operative Physiotherapy">
                  Post-Operative Physiotherapy
                </option>
                <option value="Neurological Physiotherapy">
                  Neurological Physiotherapy
                </option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
                required
              />

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">Select Time Slot</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
              </select>

              <motion.button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600"
                whileHover={{ scale: 1.05 }}
              >
                Book Now
              </motion.button>
            </form>
          </section>
        </motion.div>
      </section>
      {/* We Provide Physiotherapy For Section */}
      <section className="w-full py-10">
        <h2 className="text-center text-2xl font-bold mb-6">
          We Provide Physiotherapy
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Orthopedic Physiotherapy", image: "/images/ortho.jpg" },
            {
              title: "Sports Injury Physiotherapy",
              image: "/images/sports.png",
            },
            {
              title: "Post-Operative Physiotherapy",
              image: "/images/post-op.png",
            },
            { title: "Neurological Physiotherapy", image: "/images/nuero.jpg" },
            { title: "Neurological Physiotherapy", image: "/images/nuero.jpg" },
            { title: "Neurological Physiotherapy", image: "/images/nuero.jpg" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <BookNowButton handleClick={() => console.log("Book Now")} />
            </div>
          ))}
        </div>
      </section>
      {/* What Our Patients Think Of Us Section */}
      <section className="w-full py-10">
        <h2 className="text-center text-2xl font-bold mb-6">
          What Our Patients Think Of Us
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "https://www.youtube.com/embed/kJQP7kiw5Fk",
            "https://www.youtube.com/embed/tgbNymZ7vqY",
          ].map((video, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-48 rounded"
                  src={video}
                  title="Patient Testimonial"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center mt-2 text-gray-700">
                "Great experience with Physio Healers at Home!"
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
