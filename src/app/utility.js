export function Header() {
  return (
    <header className="w-full flex items-center justify-center p-4 bg-orange-500 shadow-md">
      <h1 className="text-white text-2xl font-extrabold tracking-wide uppercase">
        Physio Healers At Home
      </h1>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white text-center p-4 mt-10">
      <p>© 2025 Physio Healers At Home. All rights reserved.</p>
    </footer>
  );
}

export function BookNowButton({ handleClick }) {
  return (
    <button
      className="mt-2 bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600"
      onClick={handleClick}
    >
      Book Now
    </button>
  );
}
