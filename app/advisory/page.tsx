'use client';

import { useState } from 'react';

interface AdvisoryResult {
  answer?: string;
  fertilizer: string[];
  watering: string;
  pestControl: string[];
  actionPlan: string[];
}

const districts = [
  'Lucknow', 'Varanasi', 'Meerut', 'Ludhiana', 'Amritsar', 
  'Nagpur', 'Nashik', 'Coimbatore', 'Madurai', 'Bengaluru',
  'Mysuru', 'Ahmedabad', 'Jaipur', 'Indore', 'Bhopal'
];

const crops = [
  'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize',
  'Bajra', 'Jowar', 'Potato', 'Tomato', 'Onion',
  'Soybean', 'Groundnut'
];

export default function Advisory() {
  const [district, setDistrict] = useState('');
  const [crop, setCrop] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!district || !crop) {
      setError('Please select district and crop');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ district, crop, question }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.advisory);
      } else {
        setError(data.error || 'Failed to get advisory');
      }
    } catch (err) {
      setError('Failed to get advisory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            💡 Smart Advisory
          </h1>
          <p className="text-xl text-slate-600">
            Get personalized farming recommendations
          </p>
          <p className="text-lg text-slate-500 mt-2">
            व्यक्तिगत खेती की सलाह प्राप्त करें
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tell Us About Your Farm</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* District Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  District / जिला
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-secondary-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Crop Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Crop / फसल
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-secondary-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select Crop</option>
                  {crops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Question (Optional) / आपका प्रश्न
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., What fertilizer should I use? / मुझे कौन सा उर्वरक उपयोग करना चाहिए?"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-secondary-500 focus:outline-none transition-colors resize-none"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting Advisory...
                  </span>
                ) : (
                  '🚀 Get Advisory'
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Recommendations</h2>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            {!result && !error && (
              <div className="text-center py-12 text-slate-400">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-lg">Fill the form to get recommendations</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Answer to specific question */}
                {result.answer && (
                  <div className="bg-gradient-to-br from-secondary-50 to-white p-6 rounded-xl border-2 border-secondary-200">
                    <h3 className="font-bold text-secondary-900 mb-3 text-lg">📝 Answer</h3>
                    <p className="text-slate-800 leading-relaxed">{result.answer}</p>
                  </div>
                )}

                {/* Fertilizer */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <span>🌱</span> Fertilizer Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {result.fertilizer.map((item, index) => (
                      <li key={index} className="text-green-800 flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Watering */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <span>💧</span> Watering Schedule
                  </h4>
                  <p className="text-blue-800">{result.watering}</p>
                </div>

                {/* Pest Control */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <span>🐛</span> Pest Management
                  </h4>
                  <ul className="space-y-2">
                    {result.pestControl.map((item, index) => (
                      <li key={index} className="text-orange-800 flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Plan */}
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <span>📋</span> Action Plan
                  </h4>
                  <ol className="space-y-3">
                    {result.actionPlan.map((item, index) => (
                      <li key={index} className="text-purple-800 flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-200 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
