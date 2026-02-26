'use client';

import { useState } from 'react';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  healthScore: number;
  severity: string;
  treatment: {
    english: string;
    hindi: string;
  };
  traditional: string;
  prevention: string;
  urgency: string;
}

export default function CropDoctor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/crop-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.diagnosis);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            🩺 AI Crop Doctor
          </h1>
          <p className="text-xl text-slate-600">
            Upload crop images for instant disease detection
          </p>
          <p className="text-lg text-slate-500 mt-2">
            फसल की तस्वीर अपलोड करें और तुरंत बीमारी का पता लगाएं
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload Image</h2>

            {!selectedImage ? (
              <label className="block cursor-pointer">
                <div className="border-4 border-dashed border-primary-300 rounded-xl p-12 text-center hover:border-primary-500 hover:bg-primary-50 transition-all">
                  <svg className="w-20 h-20 mx-auto text-primary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-lg font-semibold text-slate-700 mb-2">
                    Click to upload crop image
                  </p>
                  <p className="text-sm text-slate-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden border-4 border-primary-200">
                  <img
                    src={selectedImage}
                    alt="Selected crop"
                    className="w-full h-auto"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      '🔍 Analyze with AI'
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                      setError(null);
                    }}
                    className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Diagnosis Results</h2>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            {!result && !error && (
              <div className="text-center py-12 text-slate-400">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg">Upload an image to see results</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Disease Name */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Detected Condition
                  </h3>
                  <p className="text-2xl font-bold text-slate-900">{result.disease}</p>
                </div>

                {/* Confidence & Health Score */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary-50 to-white p-4 rounded-xl border border-primary-200">
                    <p className="text-sm font-semibold text-slate-600 mb-1">Confidence</p>
                    <p className="text-3xl font-bold text-primary-600">{result.confidence}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-secondary-50 to-white p-4 rounded-xl border border-secondary-200">
                    <p className="text-sm font-semibold text-slate-600 mb-1">Health Score</p>
                    <p className="text-3xl font-bold text-secondary-600">{result.healthScore}/100</p>
                  </div>
                </div>

                {/* Severity & Urgency */}
                <div className="flex gap-3">
                  <span className={`px-4 py-2 rounded-full font-semibold border-2 ${getSeverityColor(result.severity)}`}>
                    {result.severity} Severity
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold border-2 bg-orange-100 text-orange-800 border-orange-300">
                    {result.urgency} action
                  </span>
                </div>

                {/* Treatment */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">💊 Treatment</h4>
                  <p className="text-blue-800 mb-3">{result.treatment.english}</p>
                  <p className="text-blue-800 font-medium">{result.treatment.hindi}</p>
                </div>

                {/* Traditional Remedy */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-2">🌿 Traditional Remedy</h4>
                  <p className="text-green-800">{result.traditional}</p>
                </div>

                {/* Prevention */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-amber-800">{result.prevention}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
