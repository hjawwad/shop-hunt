import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-8 border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Copyright */}
                    <div className="text-gray-300 text-sm">
                        Copyright © 2025 Shop Hunt
                    </div>

                    {/* Contact Link */}
                    <div className="flex items-center">
                        <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
} 