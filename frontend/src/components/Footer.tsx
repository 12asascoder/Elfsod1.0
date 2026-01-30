// ===================== ASSET IMPORTS =====================
import xLogo from "../assets/FooterIcons/X_logo.png";
import githubLogo from "../assets/FooterIcons/githubLogo.png";
import linkedInLogo from "../assets/FooterIcons/linkedIn.png";
import mailIcon from "../assets/FooterIcons/Mail.png";
import phoneIcon from "../assets/FooterIcons/phone.png";
import locationIcon from "../assets/FooterIcons/Location.png";
import footerLogo from "../assets/FooterIcons/LogoFooter.png";

// ===================== COMPONENT =====================
export default function Footer() {
  return (
    <footer className="relative w-full bg-white text-black px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-14 overflow-hidden border-t border-gray-200 mb-16 lg:mb-0">

      {/* ===================== TOP CONTENT GRID ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">

        {/* ---------- LEFT DESCRIPTION ---------- */}
        <div className="space-y-4 sm:space-y-6 max-w-sm">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Your autonomous advertising operating system.
            <br />
            Build smarter campaigns AI-Powered Insights.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
            >
              <img src={xLogo} alt="X" className="w-[18px] h-[18px] brightness-0" />
            </a>

            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
            >
              <img src={githubLogo} alt="GitHub" className="w-[18px] h-[18px] brightness-0" />
            </a>

            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
            >
              <img src={linkedInLogo} alt="LinkedIn" className="w-[18px] h-[18px] brightness-0" />
            </a>
          </div>

          {/* Newsletter */}
          <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6">
            <h4 className="font-semibold text-sm sm:text-base text-black">
              Newsletter
            </h4>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full sm:min-w-[200px] md:min-w-[300px] lg:min-w-[400px] sm:flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-md outline-none text-black focus:border-purple-500 placeholder:text-gray-400"
              />

              <button className="px-4 sm:px-5 py-2 bg-black text-white text-sm sm:text-base font-semibold rounded-md hover:bg-gray-900 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ---------- PRODUCT ---------- */}
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-black">
            Product
          </h4>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
            <li className="hover:text-black transition-colors cursor-pointer">Features</li>
            <li className="hover:text-black transition-colors cursor-pointer">Pricing</li>
            <li className="hover:text-black transition-colors cursor-pointer">Integrations</li>
            <li className="hover:text-black transition-colors cursor-pointer">API Docs</li>
            <li className="hover:text-black transition-colors cursor-pointer">Changelog</li>
          </ul>
        </div>

        {/* ---------- COMPANY ---------- */}
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-black">
            Company
          </h4>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
            <li className="hover:text-black transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-black transition-colors cursor-pointer">Careers</li>
            <li className="hover:text-black transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-black transition-colors cursor-pointer">Press Kit</li>
            <li className="hover:text-black transition-colors cursor-pointer">Partners</li>
          </ul>
        </div>

        {/* ---------- GET IN TOUCH ---------- */}
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-black">
            Get In Touch
          </h4>
          <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">

            <li className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <img src={mailIcon} alt="Mail" className="w-[14px] h-[14px] brightness-0" />
              </div>
              <span className="break-all">hello@ados.com</span>
            </li>

            <li className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <img src={phoneIcon} alt="Phone" className="w-[14px] h-[14px] brightness-0" />
              </div>
              <span>+1 (234) 567-890</span>
            </li>

            <li className="flex items-start gap-2 sm:gap-3">
              <div className="bg-gray-100 p-1.5 rounded-full mt-0.5">
                <img src={locationIcon} alt="Location" className="w-[14px] h-[14px] brightness-0" />
              </div>
              <span>
                123 Marketing St.
                <br />
                San Francisco, CA 94105
              </span>
            </li>

          </ul>
        </div>
      </div>

{/* ===================== ABSOLUTE LOGO ===================== */}
<div className="absolute right-[80px] bottom-[-70px] z-20 hidden sm:block">
  <img
    src={footerLogo}
    alt="Elfsod Footer Logo"
    className="
      object-contain
      brightness-0
      w-[280px]
      sm:w-[360px]
      md:w-[460px]
      lg:w-[560px]
      xl:w-[680px]
    "
  />
</div>


      {/* ===================== DIVIDER ===================== */}
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 border-t border-gray-700" />

      {/* ===================== BOTTOM BAR ===================== */}
      <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 gap-3 sm:gap-4">
        <span>© 2025 Elfsod. All Rights Reserved.</span>

        <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-6">
          <span className="hover:text-black cursor-pointer">Privacy Policy</span>
          <span className="hover:text-black cursor-pointer">Terms Of Service</span>
          <span className="hover:text-black cursor-pointer">Cookie Policy</span>
          <span className="hover:text-black cursor-pointer">Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
