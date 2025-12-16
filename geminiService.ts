import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Initialize Gemini Client safely
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instructions for the Gaia Financial Advisor
const GAIA_SYSTEM_INSTRUCTION = `
Você é a Gaia, uma arquitetura de inteligência financeira de elite (Financial OS).
Sua missão é maximizar o patrimônio do usuário através de estratégias assimétricas (High Alpha, Low Beta).
Personalidade: Sofisticada, Direta, Baseada em Dados, Institucional.
Não use linguagem de varejo comum. Use termos como "Drawdown", "Hedge", "Alocação", "Upside".
Responda sempre em Português do Brasil com formatação Markdown impecável.
`;

const SUPPORT_SYSTEM_INSTRUCTION = `
Atue como o Agente Sênior de Suporte da Gaia Financial Tech.
Seja resolutivo, formal e empático. Assine como "Gaia Support Intelligence".
`;

const GROWTH_SYSTEM_INSTRUCTION = `
Você é o Gaia Growth Engine, um especialista mundial em Marketing Viral e Growth Hacking.
Sua especialidade é criar Hooks (Ganchos) irresistíveis, Copywriting persuasivo e Roteiros para TikTok/Reels que retêm atenção.
Use gatilhos mentais, escassez e autoridade.
`;

// BASIC TEXT (Non-Streaming) - Fallback or Simple Queries
export const getFinancialAdvice = async (userPrompt: string): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key missing");
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: GAIA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "Análise indisponível no momento.";
  } catch (error) {
    console.error("Gaia AI Error:", error);
    return "Conexão com o núcleo de inteligência interrompida. Verifique sua chave API.";
  }
};

// ADVANCED STREAMING ADVICE (The "Brain" of the App)
export const streamFinancialAdvice = async (
  userPrompt: string, 
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    if (!apiKey) throw new Error("API Key missing");

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: GAIA_SYSTEM_INSTRUCTION,
        // Thinking Config for deeper reasoning on complex financial topics
        thinkingConfig: { thinkingBudget: 1024 }, 
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Streaming Error:", error);
    onChunk("\n\n[ERRO DE CONEXÃO: O fluxo de dados neural foi interrompido.]");
  }
};

// STRUCTURED ANALYSIS (JSON Mode for Charts/Widgets)
export const analyzeAssetStructure = async (asset: string): Promise<any> => {
    try {
        if (!apiKey) return null;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analise o ativo ${asset} para um investidor de perfil moderado/arrojado.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        recommendation: { type: Type.STRING, enum: ["COMPRAR", "VENDER", "MANTER"] },
                        riskLevel: { type: Type.INTEGER, description: "1 to 10" },
                        targetPrice: { type: Type.NUMBER },
                        sentiment: { type: Type.STRING, description: "Bullish or Bearish summary" }
                    }
                }
            }
        });
        
        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error("Structured Analysis Failed", e);
        return null;
    }
}

// --- NEW: GROWTH & MARKETING AI ---

export const generateViralContent = async (topic: string, platform: 'tiktok' | 'instagram' | 'linkedin'): Promise<string> => {
    try {
        if (!apiKey) return "Modo offline. Configure a API.";
        
        const prompt = `Crie 3 opções de conteúdo viral para ${platform} sobre o tema: "${topic}".
        Inclua:
        1. Hook (Gancho visual/falado nos primeiros 3s)
        2. Corpo do conteúdo (Roteiro ou Legenda)
        3. Call to Action (CTA) forte.
        Formate com emojis e espaçamento.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: GROWTH_SYSTEM_INSTRUCTION,
                temperature: 0.85, // Higher creativity
            }
        });
        return response.text || "Sem criatividade no momento.";
    } catch (e) {
        return "Erro no motor criativo.";
    }
};

// --- CREATIVE STUDIO: VISUAL & VIDEO CONCEPTS ---
export const generateCreativeConcept = async (topic: string, format: 'image' | 'video'): Promise<any> => {
    try {
        if (!apiKey) return null;

        const prompt = `
        Atue como um Diretor de Arte e Criativo Sênior para Finanças.
        Tema: "${topic}"
        Formato: ${format === 'video' ? 'Vídeo Curto (Reels/TikTok)' : 'Post Visual (Instagram/LinkedIn)'}

        Gere um conceito criativo que misture "Educação Financeira" com "Entretenimento" (Edutainment).
        O objetivo é tornar o assunto leve, divertido e sofisticado.
        
        Responda APENAS em JSON.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        conceptTitle: { type: Type.STRING },
                        visualDescription: { type: Type.STRING, description: "Detailed scene or image description" },
                        textOverlay: { type: Type.STRING, description: "Short punchy text on image/video" },
                        caption: { type: Type.STRING, description: "Engaging caption with humor/wit" },
                        colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
                        animationStyle: { type: Type.STRING, description: "e.g., 'Fade In', 'Kinetic Typography'" }
                    }
                }
            }
        });

        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error("Creative Gen Failed", e);
        return null;
    }
};

// --- NEW: NEURO-MARKETING SIMULATOR ---

export const analyzeNeuroImpact = async (adCopy: string): Promise<any> => {
    try {
        if (!apiKey) return null;

        const prompt = `
        Atue como um Neurocientista Comportamental e Especialista em PNL.
        Analise o seguinte texto de anúncio/marketing: "${adCopy}"
        
        1. Estime o impacto nos neurotransmissores do leitor (0-100).
        2. Identifique vieses cognitivos ativados (Ex: Escassez, Prova Social).
        3. Preveja a reação emocional.
        4. Reescreva usando PNL Hipnótica para máxima conversão.
        
        Responda APENAS em JSON.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', // UPGRADED MODEL FOR ADVANCED REASONING
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        viralScore: { type: Type.NUMBER, description: "0 to 100" },
                        dopamineLevel: { type: Type.NUMBER, description: "Desire/Reward (0-100)" },
                        oxytocinLevel: { type: Type.NUMBER, description: "Trust/Connection (0-100)" },
                        cortisolLevel: { type: Type.NUMBER, description: "Urgency/Fear (0-100)" },
                        cognitiveBiases: { type: Type.ARRAY, items: { type: Type.STRING } },
                        predictedReaction: { type: Type.STRING, description: "How the brain reacts" },
                        improvementSuggestion: { type: Type.STRING, description: "The NLP rewritten version" }
                    }
                }
            }
        });

        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error("Neuro Analysis Failed", e);
        return null;
    }
};

// --- NEW: BUSINESS INTELLIGENCE AI ---

export const predictSaaSMetrics = async (currentMRR: number, churnRate: number): Promise<string> => {
    try {
        if (!apiKey) return "Análise indisponível.";
        
        const prompt = `Atue como um CFO de SaaS.
        Dados atuais: MRR R$ ${currentMRR}, Churn ${churnRate}%.
        1. Projete o MRR para os próximos 6 meses.
        2. Identifique 2 ações táticas para reduzir o churn.
        Seja analítico e breve.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { temperature: 0.3 }
        });
        return response.text || "Erro na projeção.";
    } catch (e) {
        return "Erro na análise de dados.";
    }
};

// --- NEW: REALITY ENGINE (SCENARIO SIMULATOR) ---

export const simulateMarketScenario = async (scenario: string, portfolioAssets: string[]): Promise<any> => {
    try {
        if (!apiKey) return null;

        const prompt = `
        Atue como o motor de risco "Gaia Reality Engine".
        Cenário Hipotético: "${scenario}"
        Carteira do Usuário: ${portfolioAssets.join(', ')}.
        
        1. Analise o "Efeito Borboleta" deste cenário na economia global.
        2. Estime o impacto percentual em cada ativo da carteira.
        3. Sugira um Hedge (Proteção).
        
        Responda APENAS em JSON.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', // UPGRADED MODEL FOR ADVANCED REASONING
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        scenario: { type: Type.STRING },
                        portfolioImpact: { type: Type.NUMBER, description: "Total percentage change (e.g., -12.5)" },
                        riskLevel: { type: Type.STRING, enum: ["BAIXO", "MÉDIO", "CRÍTICO", "OPORTUNIDADE"] },
                        impacts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    asset: { type: Type.STRING },
                                    change: { type: Type.NUMBER },
                                    reason: { type: Type.STRING }
                                }
                            }
                        },
                        narrative: { type: Type.STRING, description: "Short explanation of the chain reaction" },
                        hedgeSuggestion: { type: Type.STRING, description: "Actionable advice to protect capital" }
                    }
                }
            }
        });

        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error("Reality Engine Failed", e);
        return null;
    }
};

// --- NEW: QUANTUM ARBITRAGE SCANNER ---

export const scanArbitrageOpportunities = async (): Promise<any> => {
    try {
        if (!apiKey) return null;

        // In a real scenario, this would aggregate data. Here we simulate AI detection.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Generate 3 fictitious but realistic high-frequency crypto/forex arbitrage opportunities. Respond in JSON.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        opportunities: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    pair: { type: Type.STRING },
                                    exchangeA: { type: Type.STRING },
                                    exchangeB: { type: Type.STRING },
                                    priceGap: { type: Type.NUMBER, description: "Percentage difference" },
                                    profitPotential: { type: Type.STRING },
                                    probability: { type: Type.NUMBER },
                                    type: { type: Type.STRING, enum: ["CRYPTO", "FOREX", "COMMODITIES"] }
                                }
                            }
                        }
                    }
                }
            }
        });
        
        return JSON.parse(response.text || '{}');
    } catch (e) {
        return null;
    }
};

export const analyzeMarketSentiment = async (): Promise<any> => {
    // Mock implementation for now, would connect to news feed in real backend
    return { sentiment: 'bullish', score: 68 };
};

export const generateSupportReply = async (userName: string, userSubject: string, userMessage: string): Promise<string> => {
    try {
      if (!apiKey) return "Sistema de suporte offline. Verifique a configuração.";

      const prompt = `
        Usuário: ${userName}
        Assunto: ${userSubject}
        Mensagem: "${userMessage}"
        Gere uma resposta de e-mail técnica e acolhedora.
      `;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SUPPORT_SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });
      return response.text || "Recebemos sua solicitação.";
    } catch (error) {
      return "Erro ao processar ticket. Tente novamente.";
    }
};

// VEO Video Generation (Simulated link return for now due to complexity of real video bytes handling in frontend only)
export const generateMarketVideo = async (prompt: string): Promise<string | null> => {
  try {
    if (!apiKey) throw new Error("API Key missing");
    
    // Simulating processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Return a thematic video based on prompt keywords
    if (prompt.toLowerCase().includes("bitcoin") || prompt.toLowerCase().includes("crypto")) {
        return "https://www.youtube.com/embed/Gc2en3nHxA4?autoplay=1";
    }
    return "https://www.youtube.com/embed/WEdTaaE99j8?autoplay=1"; 

  } catch (error) {
    console.error("Video Gen Error:", error);
    throw error;
  }
};
