"use client";
import Link from "next/link";
import useWallet from "../hooks/useWallet";
import { FaWallet, FaHeart, FaExchangeAlt } from "react-icons/fa";

export default function Navbar() {
  const { account, connectWallet, balance } = useWallet();

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300"
          >
            NFT Marketplace
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/favorites"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <FaHeart className="text-pink-400 group-hover:text-pink-300 transition-colors duration-200" />
              <span className="font-medium">Favorites</span>
            </Link>
            <Link
              href="/transactions"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <FaExchangeAlt className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
              <span className="font-medium">Transactions</span>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {account ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-300 font-medium text-sm">
                    {Number(balance).toFixed(2)} ETH
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm">
                  <FaWallet className="text-green-400" />
                  <span className="text-green-300 font-medium text-sm">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                </div>
              </div>
            ) : (
              <button
              onClick={connectWallet}
              className="flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <FaWallet className="text-base" />
              <span>Connect Wallet</span>
            </button>
            )}
          </div>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="md:hidden border-t border-purple-500/20 py-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/favorites"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 py-2"
            >
              <FaHeart className="text-pink-400" />
              <span className="font-medium">Favorites</span>
            </Link>
            <Link
              href="/transactions"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 py-2"
            >
              <FaExchangeAlt className="text-blue-400" />
              <span className="font-medium">Transactions</span>
            </Link>
            {account && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 backdrop-blur-sm mt-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-medium text-sm">
                  Balance: {balance} ETH
                </span>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
