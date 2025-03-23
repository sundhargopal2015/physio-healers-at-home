import "../styles/globals.css";
import { BookingProvider } from "@/app/BookingContext";

function MyApp({ Component, pageProps }) {
  return (
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>
  );
}

export default MyApp;
