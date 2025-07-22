"use client";
// import Image from "next/image";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { useLocation } from "@/context/LocationContext";
// import { useSearch } from "@/context/SearchContext";
// import LocationModal from "./LocationModal";
// import ScheduleOrderModal from "./ScheduleOrderModal";
import toast from "react-hot-toast";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../context/CartContext";

import {
  FiClock,
  FiMapPin,
  FiChevronDown,
  FiSearch,
  FiChevronRight,
  FiMenu,
  FiX,
  FiShoppingCart,
} from "react-icons/fi";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef(null);
  const { cartItems } = useCart();

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // const { totalItems, totalPrice } = useCart();
  // const { user, logout } = useAuth();
  // const { currentLocation, openLocationModal } = useLocation();
  // const { performSearch } = useSearch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSearch = () => {
    // if (!searchQuery.trim()) {
    //   toast.error("Please enter a search term");
    //   return;
    // }
    // if (searchQuery.trim().length < 2) {
    //   toast.error("Search term must be at least 2 characters");
    //   return;
    // }
    // performSearch(searchQuery);
  };

  // const handleScheduleOrder = (date: string, time: string) => {
  //   setScheduledOrder({ date, time });
  //   toast.success(`Order scheduled for ${new Date(date).toLocaleDateString()} at ${time}`);
  // };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100 safe-area-inset">
      <div className="container-responsive max-w-7xl mx-auto">
        {/* Top bar with delivery info - Enhanced responsive design */}
        <div className="theme-gradient text-white px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-xs sm:text-sm">
          <Link href="/" className="flex items-center group flex-shrink-0">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black font-[lilita] brandname stroke group-hover:scale-105 transition-transform duration-200">
              SAVE RUSH
            </h1>
          </Link>

          <button
            // onClick={openLocationModal}
            className="flex items-center gap-1 hover:bg-white/10 px-1 sm:px-2 py-1 rounded-full transition-colors btn-touch"
          >
            <FiMapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="max-w-[100px] sm:max-w-[150px] truncate text-xs sm:text-sm">
              {"Select Location"}
            </span>
            <FiChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Main header - Enhanced responsive layout */}
        <div className="px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo - Responsive sizing */}
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <FiClock className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse text-black" />
              <span className="hidden xs:inline text-xs sm:text-sm text-black">
                Delivery in
              </span>
              <span className="xs:hidden text-black">Delivery</span>
              <span className="font-bold text-xs sm:text-sm text-[#2e00b2]">
                {/* {calculateDeliveryTime(currentLocation)} */} 10 mins
              </span>
            </div>
          </div>

          {/* Desktop Search bar with Schedule Order */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden lg:flex items-center gap-2 xl:gap-3">
            <div className="relative flex-1">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search for top, jeans..."
                className={`w-full px-3 xl:px-4 py-2 xl:py-2.5 pl-10 xl:pl-12 rounded-xl bg-gray-50 text-black focus:outline-none border-2 transition-all duration-200 text-sm xl:text-base ${
                  searchFocused
                    ? "border-[#6B46C1] bg-white shadow-lg"
                    : "border-transparent hover:bg-gray-100"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <FiSearch className="h-4 w-4 xl:h-5 xl:w-5 text-gray-400 absolute left-3 xl:left-4 top-1/2 -translate-y-1/2" />
              <button
                className="absolute right-2 xl:right-3 top-1/2 -translate-y-1/2 p-1 xl:p-1.5 hover:bg-purple-100 rounded-full cursor-pointer transition-colors"
                onClick={handleSearch}
              >
                <FiChevronRight className="h-3 w-3 xl:h-4 xl:w-4 text-[#6B46C1]" />
              </button>
            </div>
          </div>

          {/* Tablet Search bar (md to lg) */}
          <div className="flex-1 max-w-md mx-2 hidden md:flex lg:hidden">
            <div className="relative w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 pl-10 rounded-xl bg-gray-50 text-black focus:outline-none border-2 border-transparent focus:border-[#6B46C1] focus:bg-white transition-all text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <FiSearch className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex justify-between">
            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              {/* Mobile menu toggle */}
              <button
                className="lg:hidden text-gray-700 p-1 btn-touch"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <FiMenu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>

              {/* Profile dropdown - Hidden on mobile */}
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 text-xs xl:text-sm text-black hover:text-[#6B46C1] transition-colors btn-touch"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <span className="hidden xl:inline">My Account</span>
                  <span className="xl:hidden">{"Account"}</span>
                  <FiChevronDown className="h-3 w-3 xl:h-4 xl:w-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 xl:w-64 bg-white text-gray-800 rounded-2xl shadow-lg z-50 py-4 xl:py-6 px-6 xl:px-8">
                    <>
                      <div className="font-bold text-lg xl:text-xl mb-3 xl:mb-4 text-black">
                        Welcome!
                      </div>
                      <div className="mb-3 xl:mb-4 text-xs xl:text-sm">
                        Login to save your cart and checkout faster
                      </div>
                      <Link
                        href="/login"
                        className="block w-full text-center bg-[#6B46C1] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm xl:text-base"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Login / Sign Up
                      </Link>
                    </>
                  </div>
                )}
              </div>
            </div>
            {/* Cart */}
            <div className="flex">
              <button
                onClick={() => setShowCart(true)}
                className="flex items-center bg-gradient-to-r from-[#9BF00B] to-[#8AE00A] px-4 py-2 rounded-lg text-black font-medium relative"
              >
                <FiShoppingCart className="mr-2 font-medium" />
                <span>Cart</span>
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Enhanced Mobile menu */}
        <div
          className={`px-2 sm:px-4 pb-3 transition-all duration-300 overflow-hidden  ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } lg:hidden`}
        >
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-xl bg-gray-50 text-black focus:outline-none border-2 border-transparent focus:border-purple-400 focus:bg-white transition-all text-sm sm:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  handleSearch();
                  setMobileMenuOpen(false);
                }
              }}
            />
            <FiSearch className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 btn-touch"
              onClick={() => {
                if (searchQuery.trim()) {
                  handleSearch();
                  setMobileMenuOpen(false);
                }
              }}
            >
              <FiChevronRight className="h-4 w-4 text-purple-600" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="space-y-2 sm:space-y-3">
            <li>
              <Link
                href="/login"
                className="block py-2 sm:py-3 px-2 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors text-sm sm:text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </header>
  );
}
