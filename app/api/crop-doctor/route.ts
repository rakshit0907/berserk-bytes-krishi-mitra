import { NextRequest, NextResponse } from 'next/server';

const HUGGINGFACE_SPACE_URL = 'https://rakshitpandey24-plantdiseasedetection.hf.space/api/predict';

const treatments: Record<string, any> = {
  'Late_blight': {
    english: 'Remove infected leaves immediately. Spray copper-based fungicide (Bordeaux mixture) or Mancozeb every 7-10 days. Improve air circulation between plants.',
    hindi: 'संक्रमित पत्तियों को तुरंत हटाएं। हर 7-10 दिनों में तांबा आधारित फफूंदनाशक (बोर्डो मिश्रण) या मैंकोजेब का छिड़काव करें।',
    traditional: 'Neem leaf extract spray (500g neem leaves in 10L water, ferment 24hrs)',
    prevention: 'Ensure good air circulation. Avoid overhead watering. Remove crop debris.'
  },
  'Early_blight': {
    english: 'Apply Mancozeb or Chlorothalonil fungicide. Remove and destroy infected plant parts.',
    hindi: 'मैंकोजेब या क्लोरोथैलोनिल फफूंदनाशक लगाएं। संक्रमित पौधे के हिस्सों को हटाकर नष्ट करें।',
    traditional: 'Garlic-chili extract spray for pest control',
    prevention: 'Maintain proper plant spacing. Practice crop rotation.'
  },
  'Healthy': {
    english: 'Plant is healthy! Continue regular care and monitoring.',
    hindi: 'पौधा स्वस्थ है! नियमित देखभाल जारी रखें।',
    traditional: 'Continue using organic compost and natural fertilizers',
    prevention: 'Regular monitoring. Maintain soil health.'
  }
};

function base64ToBlob(base64: string): Blob {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'image/jpeg' });
}

function getTreatment(diseaseLabel: string) {
  for (const key in treatments) {
    if (diseaseLabel.includes(key)) {
      return treatments[key];
    }
  }
  
  return {
    english: 'Consult local agricultural expert for specific treatment.',
    hindi: 'विशिष्ट उपचार के लिए स्थानीय कृषि विशेषज्ञ से परामर्श करें।',
    traditional: 'Neem-based organic treatment',
    prevention: 'Regular field inspection and crop rotation'
  };
}

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      );
    }

    const imageBlob = base64ToBlob(image);
    const formData = new FormData();
    formData.append('data', imageBlob, 'crop.jpg');

    const response = await fetch(HUGGINGFACE_SPACE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('HuggingFace Space API error');
    }

    const result = await response.json();
    
    let prediction, confidence;
    
    if (result.data && Array.isArray(result.data)) {
      prediction = result.data[0];
      confidence = (prediction.confidence || prediction.score || 0) * 100;
    } else if (result.label) {
      prediction = result;
      confidence = (result.confidence || result.score || 0) * 100;
    } else if (Array.isArray(result)) {
      prediction = result[0];
      confidence = (prediction.confidence || prediction.score || 0) * 100;
    } else {
      throw new Error('Unexpected response format');
    }

    const label = prediction.label || prediction.class_name || 'Unknown';
    const isHealthy = label.toLowerCase().includes('healthy');
    
    const parts = label.split('___');
    const disease = parts[1] || label;
    const diseaseDisplay = disease.replace(/_/g, ' ');
    
    const healthScore = isHealthy ? 90 : Math.max(20, 100 - confidence);
    const severity = confidence > 80 ? 'high' : confidence > 50 ? 'medium' : 'low';
    const urgency = isHealthy ? 'routine' : (confidence > 80 ? 'immediate' : confidence > 50 ? 'soon' : 'routine');
    
    const treatment = getTreatment(disease);

    return NextResponse.json({
      success: true,
      diagnosis: {
        disease: diseaseDisplay,
        confidence: Math.round(confidence),
        healthScore: Math.round(healthScore),
        severity,
        urgency,
        treatment: {
          english: treatment.english,
          hindi: treatment.hindi
        },
        traditional: treatment.traditional,
        prevention: treatment.prevention
      }
    });

  } catch (error: any) {
    console.error('Crop Doctor API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Analysis failed' },
      { status: 500 }
    );
  }
}
