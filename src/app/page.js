import Image from "next/image";
import { ProductCard } from "../components";

export default function Home() {
  return (
    <div>
      {/* Hero Section with Search Bar */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-yellow-900/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-400/5 rounded-full blur-lg"></div>

        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Search Container */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Find Your Perfect
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent"> SARMs</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Search through trusted sources and verified products
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for SARMs, companies, or products..."
                    className="w-full h-16 pl-6 pr-20 text-lg bg-white rounded-2xl shadow-xl border-2 border-transparent focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 placeholder-gray-500"
                  />
                  <button className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Popular searches */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <span className="text-gray-400 text-sm">Popular:</span>
                  {['MK-677', 'RAD140', 'Cardarine', 'Science.bio', 'Ostarine'].map((term) => (
                    <button
                      key={term}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-full text-sm font-medium transition-all duration-200 border border-white/20 hover:border-white/40"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Verified Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-2">10+</div>
                  <div className="text-gray-300 text-sm">Trusted Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">99%+</div>
                  <div className="text-gray-300 text-sm">Purity Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
