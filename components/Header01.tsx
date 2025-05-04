// components/Header.js
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="max-w-xl mx-auto bg-black text-white p-4 shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-black px-4 py-2 rounded transition">
          <img src="/Furia.png" alt="ícone furia" width={70} className="mr-2 hover:animate-pulse" />
        </Link>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none cursor-pointer hover:animate-pulse"
          aria-label="Abrir Menu"
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.707 5.293a1 1 0 0 0-1.414 1.414L13.414 12l3.879 3.879a1 1 0 1 0 1.414-1.414L14.828 12l3.879-3.879a1 1 0 0 0 0-1.414zM5.293 5.293a1 1 0 0 1 1.414 1.414L10.586 12l-3.879 3.879a1 1 0 1 1-1.414-1.414L9.172 12 5.293 8.121a1 1 0 0 1 0-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black shadow-md mt-2 py-2">
          <Link
            href="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            Página Inicial
          </Link>
          <Link
            href="/ranking"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            Ranking
          </Link>
        </div>
      )}
    </header>
  );
}
