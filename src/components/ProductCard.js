import Image from 'next/image';

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
            <div className="mb-6 relative">
                <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="h-32 flex items-center justify-center relative">
                        <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg p-4 shadow-md">
                            <div className="text-white font-bold text-lg text-center">
                                {product.code}
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
                        <div className="absolute bottom-2 left-2 w-2 h-2 bg-teal-400 rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold mb-4 inline-block shadow-md">
                    {product.code}
                </div>

                {product.price && (
                    <div className="text-teal-600 font-bold text-xl mb-4">
                        ${product.price}
                    </div>
                )}

                <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    View Product
                </a>
            </div>

            {/* Card decorative border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
} 