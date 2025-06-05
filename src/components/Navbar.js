import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white shadow-2xl border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-18">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            SARMLEAKS.COM
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <div className="relative group">
                                <button className="text-gray-200 hover:text-yellow-400 px-4 py-3 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:bg-slate-700">
                                    SARMs
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <Link href="/products" className="text-gray-200 hover:text-yellow-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-700">
                                Products
                            </Link>
                            <Link href="/mk-677" className="text-gray-200 hover:text-yellow-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-700">
                                MK-677
                            </Link>
                            <Link href="/cardarine" className="text-gray-200 hover:text-yellow-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-700">
                                Cardarine
                            </Link>
                            <Link href="/stenabolic" className="text-gray-200 hover:text-yellow-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-700">
                                Stenabolic
                            </Link>
                            <Link href="/buy-sarms" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                Buy SARMs
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-gray-200 hover:text-yellow-400 inline-flex items-center justify-center p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400 transition-colors duration-200"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden" id="mobile-menu">
                <div className="px-4 pt-4 pb-6 space-y-2 bg-slate-900 border-t border-slate-700">
                    <Link href="/sarms" className="text-gray-200 hover:text-yellow-400 hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                        SARMs
                    </Link>
                    <Link href="/products" className="text-gray-200 hover:text-yellow-400 hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                        Products
                    </Link>
                    <Link href="/mk-677" className="text-gray-200 hover:text-yellow-400 hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                        MK-677
                    </Link>
                    <Link href="/cardarine" className="text-gray-200 hover:text-yellow-400 hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                        Cardarine
                    </Link>
                    <Link href="/stenabolic" className="text-gray-200 hover:text-yellow-400 hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                        Stenabolic
                    </Link>
                    <Link href="/buy-sarms" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white block px-4 py-3 rounded-lg text-base font-bold transition-all duration-300 mt-4">
                        Buy SARMs
                    </Link>
                </div>
            </div>
        </nav>
    );
} 