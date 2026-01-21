// ProfitLens AI - Claude API Integration

class ClaudeAPI {
    constructor(apiKey = null) {
        this.apiKey = apiKey || CONFIG.api.anthropic.apiKey;
        this.baseUrl = CONFIG.api.anthropic.baseUrl;
        this.model = CONFIG.api.anthropic.model;
        this.maxTokens = CONFIG.api.anthropic.maxTokens;

        if (!this.apiKey) {
            console.warn('Claude API key not configured. Please add your API key to config.js');
        }
    }

    /**
   * Send a message to Claude API via backend proxy
   * @param {string} systemPrompt - System prompt for Claude
   * @param {string} userMessage - User message
   * @param {object} options - Additional options
   * @returns {Promise<object>} API response
   */
    async sendMessage(systemPrompt, userMessage, options = {}) {
        try {
            // Use backend API if available
            if (typeof backendAPI !== 'undefined') {
                const user = authManager?.getCurrentUser();
                const response = await backendAPI.analyzeWithClaude(
                    systemPrompt,
                    userMessage,
                    user?.id || null,
                    options.analysisType || 'general'
                );

                if (response.success) {
                    return {
                        content: response.content,
                        usage: response.usage,
                        model: this.model,
                        stopReason: 'end_turn'
                    };
                } else {
                    throw new Error(response.error);
                }
            }

            // Fallback to direct API call (development only)
            if (!this.apiKey) {
                throw new Error('Backend server not available and API key not configured. Please start the backend server or add API key to config.js');
            }

            const requestBody = {
                model: options.model || this.model,
                max_tokens: options.maxTokens || this.maxTokens,
                system: systemPrompt,
                messages: [
                    {
                        role: 'user',
                        content: userMessage
                    }
                ]
            };

            const response = await fetch(`${this.baseUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return this.parseResponse(data);
        } catch (error) {
            console.error('Claude API Error:', error);
            throw error;
        }
    }

    /**
     * Parse Claude API response
     * @param {object} response - Raw API response
     * @returns {object} Parsed response
     */
    parseResponse(response) {
        const content = response.content?.[0]?.text || '';

        return {
            content,
            usage: {
                inputTokens: response.usage?.input_tokens || 0,
                outputTokens: response.usage?.output_tokens || 0,
                totalTokens: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0)
            },
            model: response.model,
            stopReason: response.stop_reason
        };
    }

    /**
     * Analyze business data for profit leaks
     * @param {object} businessData - Business data to analyze
     * @param {string} language - Language code
     * @returns {Promise<object>} Analysis results
     */
    async analyzeProfitLeaks(businessData, language = 'en') {
        const { systemPrompt, userPrompt } = buildPrompt('profitLeak', businessData, language);

        try {
            const response = await this.sendMessage(systemPrompt, userPrompt, { analysisType: 'profit' });

            // Try to parse JSON response
            try {
                const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const analysisData = JSON.parse(jsonMatch[0]);
                    return {
                        success: true,
                        data: analysisData,
                        usage: response.usage
                    };
                }
            } catch (parseError) {
                console.warn('Could not parse JSON response, returning raw content');
            }

            // Fallback to raw content if JSON parsing fails
            return {
                success: true,
                data: {
                    summary: {
                        totalLeaksFound: 0,
                        totalPotentialSavings: 0,
                        confidenceLevel: 'medium',
                        dataCompleteness: 'partial'
                    },
                    leaks: [],
                    recommendations: [response.content],
                    nextSteps: 'Review the analysis and implement recommended actions.'
                },
                rawContent: response.content,
                usage: response.usage
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    /**
     * Analyze electricity bill
     * @param {object} billData - Electricity bill data
     * @param {string} language - Language code
     * @returns {Promise<object>} Analysis results
     */
    async analyzeElectricityBill(billData, language = 'en') {
        const { systemPrompt, userPrompt } = buildPrompt('electricityBill', billData, language);

        try {
            const response = await this.sendMessage(systemPrompt, userPrompt, { analysisType: 'electricity' });

            // Try to parse JSON response
            try {
                const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const analysisData = JSON.parse(jsonMatch[0]);
                    return {
                        success: true,
                        data: analysisData,
                        usage: response.usage
                    };
                }
            } catch (parseError) {
                console.warn('Could not parse JSON response, returning raw content');
            }

            // Fallback to raw content if JSON parsing fails
            return {
                success: true,
                data: {
                    analysis: {
                        expectedAmount: billData.billAmount,
                        actualAmount: billData.billAmount,
                        overchargeDetected: false,
                        overchargeAmount: 0,
                        overchargePercentage: 0,
                        confidence: 'medium'
                    },
                    findings: [],
                    savingsOpportunities: [],
                    complaintDraft: '',
                    recommendations: [response.content]
                },
                rawContent: response.content,
                usage: response.usage
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    /**
     * Check if API is configured
     * @returns {boolean} True if API key is set
     */
    isConfigured() {
        return !!this.apiKey && this.apiKey.length > 0;
    }

    /**
     * Test API connection
     * @returns {Promise<boolean>} True if connection successful
     */
    async testConnection() {
        if (!this.isConfigured()) {
            return false;
        }

        try {
            const response = await this.sendMessage(
                'You are a helpful assistant.',
                'Hello! Please respond with "OK" if you receive this message.'
            );
            return response.content.includes('OK') || response.content.length > 0;
        } catch (error) {
            console.error('API connection test failed:', error);
            return false;
        }
    }
}

// Create global Claude API instance
const claudeAPI = new ClaudeAPI();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ClaudeAPI, claudeAPI };
}
