import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-12 border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    {/* Copyright */}
                    <div className="text-gray-300 text-sm">
                        Copyright © 2025 SarmLeaks.com
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center md:justify-end items-center space-x-8 text-sm">
                        <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            SarmLeaks.com
                        </Link>
                        <Link href="/affiliate-disclosure" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            Affiliate Disclosure
                        </Link>
                        <Link href="/medical-disclaimer" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            Medical Disclaimer
                        </Link>
                        <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            Contact Me
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 mt-8 pt-8">
                    <div className="text-center text-gray-400 text-xs space-y-3">
                        <p className="leading-relaxed">
                            This website is for informational purposes only. Always consult with a healthcare professional before using any supplements.
                        </p>
                        <p className="leading-relaxed">
                            The statements on this website have not been evaluated by the Food and Drug Administration.
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-30"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-30"></div>
            </div>
        </footer>
    );
} 