import React from "react";
import { Link } from "react-router-dom";
import {
  FiClock,
  FiCheckCircle,
  FiCreditCard,
  FiLifeBuoy,
} from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-gradient text-white relative overflow-hidden">
      <div className="container-responsive max-w-7xl mx-auto py-6 sm:py-8 md:py-10 relative z-10">
        <div className="absolute -right-4 sm:-right-8 -top-4 sm:-top-8 w-20 h-20 sm:w-32 sm:h-32 bg-white opacity-5 rounded-full"></div>
        <div className="absolute left-1/4 -bottom-3 sm:-bottom-6 w-14 h-14 sm:w-20 sm:h-20 bg-purple-400 opacity-10 rounded-full"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
          {[
            // Features list simplified
            {
              Icon: FiClock,
              title: "10 Minute Delivery",
              short: "Fast Delivery",
              desc: "Get your groceries in minutes",
              shortDesc: "Quick delivery",
            },
            {
              Icon: FiCheckCircle,
              title: "Best Prices & Offers",
              short: "Best Prices",
              desc: "Cheaper than your local store",
              shortDesc: "Great deals",
            },
            {
              Icon: FiCreditCard,
              title: "Easy Returns",
              desc: "Hassle-free returns policy",
              shortDesc: "Easy returns",
            },
            {
              Icon: FiLifeBuoy,
              title: "24/7 Support",
              desc: "Customer support all day",
              shortDesc: "Always here",
            },
          ].map(({ Icon, title, short, desc, shortDesc }, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="bg-gradient-to-br from-white/20 to-white/10 p-2 xs:p-3 sm:p-4 rounded-full mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md backdrop-blur-sm">
                <Icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#9BF00B]" />
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-[#9BF00B] transition-colors text-xs xs:text-sm sm:text-base">
                <span className="hidden xs:inline">{title}</span>
                {short && <span className="xs:hidden">{short}</span>}
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 leading-tight">
                <span className="hidden sm:inline">{desc}</span>
                <span className="sm:hidden">{shortDesc}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 pb-6 sm:pb-8 md:pb-10 border-b border-white/20">
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[#9BF00B] font-black text-base sm:text-lg md:text-xl mb-3 sm:mb-4 cursor-pointer brandname">
              SAVE RUSH
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/careers", label: "Careers" },
                { href: "/blog", label: "Blog" },
                { href: "/partner", label: "Partner with Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/offers"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Offers & Deals</span>
                  <span className="sm:hidden">Offers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Coupons
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Help & Support
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-purple-100 hover:text-[#9BF00B] text-xs sm:text-sm transition-all hover:translate-x-1"
                >
                  <span className="hidden sm:inline">Terms & Conditions</span>
                  <span className="sm:hidden">Terms</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Download App
            </h4>
            <p className="text-xs sm:text-sm text-purple-100 mb-3 sm:mb-4">
              <span className="hidden sm:inline">
                Get the SaveRush app for faster ordering and tracking
              </span>
              <span className="sm:hidden">Get our mobile app</span>
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-center border border-white/30 rounded-lg px-2 sm:px-3 py-2 hover:bg-white/10 hover:border-[#9BF00B] transition-all hover:scale-105 shadow-sm backdrop-blur-sm btn-touch"
              >
                <FaGooglePlay className="text-white mr-2 sm:mr-3" size={20} />
                <div className="flex flex-col">
                  <span className="text-xs text-purple-100">GET IT ON</span>
                  <span className="font-medium text-white text-xs sm:text-sm">
                    Google Play
                  </span>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-center border border-white/30 rounded-lg px-2 sm:px-3 py-2 hover:bg-white/10 hover:border-[#9BF00B] transition-all hover:scale-105 shadow-sm backdrop-blur-sm btn-touch"
              >
                <FaApple className="text-white mr-2 sm:mr-3" size={20} />
                <div className="flex flex-col">
                  <span className="text-xs text-purple-100">
                    DOWNLOAD ON THE
                  </span>
                  <span className="font-medium text-white text-xs sm:text-sm">
                    App Store
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-purple-100 hover:text-[#9BF00B] transition-all hover:scale-110 btn-touch"
                >
                  <Icon size={20} />
                </a>
              )
            )}
          </div>
          <div className="text-xs sm:text-sm text-purple-100 text-center sm:text-left">
            &copy; {currentYear} SaveRush. All rights reserved.
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-4">
            <div className="text-xs sm:text-sm text-purple-100">Powered by</div>
            <div className="h-6 sm:h-8 bg-white/90 rounded-md shadow-sm hover:shadow-md transition-all hover:scale-105 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4">
              <span className="text-blue-600 font-bold text-sm sm:text-base tracking-wider">
                razorpay
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
