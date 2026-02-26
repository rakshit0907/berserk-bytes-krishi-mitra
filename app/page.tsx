import Link from 'next/link';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-slate-50 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-float mb-6">
              <span className="text-8xl">🌾</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900">
              Welcome to <span className="gradient-text">Krishi Mitra</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 mb-4">
              Your AI Farming Companion
            </p>
            
            <p className="text-xl text-slate-500 mb-12">
              कृषि मित्र - आपका AI खेती साथी
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/crop-doctor"
                className="group bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  🩺 Crop Doctor
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link
                href="/advisory"
                className="group bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  💡 Get Advisory
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powered by AI, Rooted in Tradition
            </h2>
            <p className="text-xl text-slate-600">
              Modern technology meets traditional agricultural wisdom
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Crop Doctor Card */}
            <Link href="/crop-doctor" className="group">
              <div className="relative bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-primary-100">
                <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                  🩺
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🩺</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    AI Crop Doctor
                  </h3>
                  
                  <p className="text-slate-600 mb-6">
                    Upload photos of your crops and get instant AI-powered disease detection with treatment recommendations in English and Hindi.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      Image Analysis
                    </span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      Disease Detection
                    </span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      Bilingual
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Advisory Card */}
            <Link href="/advisory" className="group">
              <div className="relative bg-gradient-to-br from-secondary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-secondary-100">
                <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                  💡
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">💡</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Smart Advisory
                  </h3>
                  
                  <p className="text-slate-600 mb-6">
                    Get personalized farming recommendations based on your location, crop type, and soil data. Ask questions and receive expert advice.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      Expert Advice
                    </span>
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      Soil Analysis
                    </span>
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      Action Plans
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Three simple steps to smarter farming
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">📸</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Upload or Ask</h3>
              <p className="text-slate-600">
                Upload crop photos or ask farming questions through our simple interface
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. AI Analyzes</h3>
              <p className="text-slate-600">
                Our AI instantly analyzes your input using advanced machine learning models
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Get Solutions</h3>
              <p className="text-slate-600">
                Receive actionable recommendations with treatments and preventive measures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl mb-8 text-primary-50">
              Join thousands of farmers using Krishi Mitra for better harvests
            </p>
            <Link
              href="/crop-doctor"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Start Now - It's Free! 🚀
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
