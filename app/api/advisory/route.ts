import { NextRequest, NextResponse } from 'next/server';

const cropAdvice: Record<string, any> = {
  'Wheat': {
    fertilizer: [
      'Apply 50-60 kg nitrogen per hectare in split doses',
      'Use 25 kg urea at sowing + 25 kg after 30 days',
      'Apply 40-50 kg P2O5 and 30-40 kg K2O as basal dose',
      'Use farmyard manure (10-15 tons/ha) for better soil health'
    ],
    watering: 'Water at critical stages: Crown root initiation (20-25 days), tillering (40-45 days), jointing (60-65 days), flowering (85-90 days), and grain filling (100-105 days). Generally irrigate every 10-12 days.',
    pestControl: [
      'Monitor for aphids and apply neem-based pesticides early',
      'Control weeds with first weeding at 20-25 days',
      'Watch for rust and apply fungicide if detected',
      'Use resistant varieties when available'
    ]
  },
  'Rice': {
    fertilizer: [
      'Apply 60-80 kg nitrogen per hectare in 3 splits',
      'First dose at transplanting, second at tillering, third at panicle initiation',
      'Apply 30-40 kg P2O5 and 30-40 kg K2O as basal',
      'Zinc sulphate application (25 kg/ha) if deficiency observed'
    ],
    watering: 'Maintain 2-5 cm standing water in field for first 10 days after transplanting. Keep fields moist during tillering. Maintain water during flowering and grain filling. Drain 10 days before harvest.',
    pestControl: [
      'Control stem borer with pheromone traps',
      'Apply neem oil for leaf folder and whorl maggot',
      'Remove weeds within 20 days of transplanting',
      'Monitor for blast disease and bacterial leaf blight'
    ]
  },
  'Cotton': {
    fertilizer: [
      'Apply 60-80 kg nitrogen in 3-4 splits',
      'First dose at sowing, subsequent doses at square formation and flowering',
      'Apply 40-50 kg P2O5 as basal dose',
      'Foliar spray of micronutrients during peak growth'
    ],
    watering: 'First irrigation at 30-40 days after sowing. Subsequent irrigations at 20-25 day intervals. Critical stages: flowering and boll formation. Avoid waterlogging.',
    pestControl: [
      'Monitor for pink bollworm and use pheromone traps',
      'Control whitefly with systemic insecticides',
      'Spray neem oil for aphids and jassids',
      'Practice crop rotation to reduce pest buildup'
    ]
  },
  'Tomato': {
    fertilizer: [
      'Apply 100-120 kg nitrogen per hectare',
      'Split application: 50% at transplanting, 25% at flowering, 25% at fruiting',
      'Apply 60-80 kg P2O5 and 60-80 kg K2O',
      'Weekly foliar spray of micronutrients'
    ],
    watering: 'Light irrigation immediately after transplanting. Water every 4-5 days in summer, 7-10 days in winter. Avoid water stress during flowering and fruiting. Use drip irrigation for best results.',
    pestControl: [
      'Control fruit borer with Bt-based pesticides',
      'Spray neem oil for whitefly and aphids',
      'Remove diseased plants immediately to prevent spread',
      'Stake plants properly for better air circulation'
    ]
  },
  'Potato': {
    fertilizer: [
      'Apply 100-120 kg nitrogen in split doses',
      'Half dose at planting, remaining during earthing up',
      'Apply 60-80 kg P2O5 and 100-120 kg K2O',
      'Use well-decomposed farmyard manure (20-25 tons/ha)'
    ],
    watering: 'First irrigation 10-12 days after planting. Irrigate every 7-10 days. Critical stages: tuber initiation and tuber bulking. Stop irrigation 10 days before harvest.',
    pestControl: [
      'Control late blight with copper fungicides',
      'Monitor for aphids and apply insecticides if needed',
      'Earthing up helps control cutworms',
      'Use certified disease-free seed tubers'
    ]
  }
};

function getGeneralAdvice(crop: string) {
  return {
    fertilizer: [
      `Apply balanced NPK fertilizer as per soil test recommendations`,
      `Use organic compost (10-15 tons/ha) for soil health`,
      `Apply micronutrients if deficiency symptoms appear`,
      `Follow split application for better nutrient use efficiency`
    ],
    watering: `Water at critical growth stages. Maintain adequate soil moisture but avoid waterlogging. Use drip or sprinkler irrigation for water efficiency.`,
    pestControl: [
      `Monitor crops regularly for pest and disease symptoms`,
      `Use integrated pest management (IPM) practices`,
      `Apply neem-based organic pesticides as first line of defense`,
      `Maintain field sanitation and remove crop residues`
    ]
  };
}

function answerQuestion(question: string, crop: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('fertilizer') || q.includes('खाद')) {
    return `For ${crop}, apply balanced NPK fertilizer. Use 50-60 kg nitrogen per hectare in split doses. Apply organic manure (10-15 tons/ha) for better soil health. Get soil tested for precise recommendations.`;
  }
  
  if (q.includes('water') || q.includes('पानी') || q.includes('irrigation')) {
    return `${crop} needs regular watering, especially during flowering and grain filling stages. Water when top 2-3 cm soil becomes dry. Avoid waterlogging. Use drip irrigation for better water use efficiency.`;
  }
  
  if (q.includes('pest') || q.includes('insect') || q.includes('कीट')) {
    return `For ${crop} pest management: Monitor regularly for pests. Use neem-based organic pesticides as first defense. For severe infestations, consult local agricultural officer for appropriate chemical control.`;
  }
  
  if (q.includes('disease') || q.includes('रोग')) {
    return `Prevent ${crop} diseases by using disease-free seeds, maintaining proper spacing, and avoiding waterlogging. If disease appears, remove infected plants and apply appropriate fungicide based on the disease type.`;
  }
  
  if (q.includes('harvest') || q.includes('कटाई')) {
    return `Harvest ${crop} when it reaches physiological maturity. Look for color change, hardening of grains/fruits, and optimal moisture content. Harvest at right time to avoid losses and maintain quality.`;
  }
  
  return `For ${crop}: Follow proper land preparation, use quality seeds, apply balanced fertilizers, maintain optimal irrigation, monitor for pests and diseases, and harvest at right maturity stage.`;
}

export async function POST(request: NextRequest) {
  try {
    const { district, crop, question } = await request.json();

    if (!district || !crop) {
      return NextResponse.json(
        { success: false, error: 'District and crop are required' },
        { status: 400 }
      );
    }

    const advice = cropAdvice[crop] || getGeneralAdvice(crop);
    
    const response: any = {
      fertilizer: advice.fertilizer,
      watering: advice.watering,
      pestControl: advice.pestControl,
      actionPlan: [
        'Week 1-2: Prepare field with deep ploughing and leveling',
        'Week 2-3: Apply basal fertilizers and organic manure',
        'Week 3-4: Sowing/transplanting at optimal spacing',
        'Week 4-6: First irrigation and weed management',
        'Week 6-8: First top dressing of nitrogen',
        'Week 8-10: Second irrigation and pest monitoring',
        'Week 10-12: Second top dressing and disease watch',
        'Maturity stage: Regular monitoring and timely harvest'
      ]
    };

    if (question && question.trim()) {
      response.answer = answerQuestion(question, crop);
    }

    return NextResponse.json({
      success: true,
      advisory: response
    });

  } catch (error: any) {
    console.error('Advisory API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate advisory' },
      { status: 500 }
    );
  }
}
