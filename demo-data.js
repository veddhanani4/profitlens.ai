// ProfitLens AI - Demo Data Setup

// Demo account credentials
const DEMO_ACCOUNT = {
    email: 'demo@profitlens.ai',
    password: 'demo123',
    fullName: 'Demo User',
    businessName: 'Demo Business Ltd'
};

// Initialize demo data
function initializeDemoData() {
    // Check if demo user already exists
    const users = storage.get('users', []);
    const demoUser = users.find(u => u.email === DEMO_ACCOUNT.email);

    if (!demoUser) {
        // Create demo user
        const newDemoUser = {
            id: 'demo_user_001',
            email: DEMO_ACCOUNT.email,
            password: hashPassword(DEMO_ACCOUNT.password),
            fullName: DEMO_ACCOUNT.fullName,
            businessName: DEMO_ACCOUNT.businessName,
            plan: 'professional', // Give demo user Professional plan
            createdAt: new Date().toISOString(),
            usage: {
                profitAnalysis: 5,
                electricityAnalysis: 3
            }
        };

        users.push(newDemoUser);
        storage.set('users', users);

        // Create sample profit analyses
        const analyses = storage.get('profitAnalyses', []);
        analyses.push({
            id: 'analysis_001',
            userId: 'demo_user_001',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            data: {
                summary: {
                    totalLeaksFound: 3,
                    totalPotentialSavings: 45000,
                    confidenceLevel: 'high',
                    dataCompleteness: 'complete'
                },
                leaks: [
                    {
                        id: 'leak_001',
                        title: 'Inventory Overstocking',
                        description: 'Your inventory turnover ratio is below industry average, indicating excess stock that ties up capital.',
                        category: 'inventory',
                        priority: 'high',
                        monthlySavings: 25000,
                        annualSavings: 300000,
                        confidence: 'high',
                        actions: [
                            {
                                step: 'Implement Just-In-Time (JIT) inventory management',
                                timeline: '1-month',
                                effort: 'medium'
                            },
                            {
                                step: 'Analyze slow-moving items and run clearance sales',
                                timeline: 'immediate',
                                effort: 'low'
                            },
                            {
                                step: 'Negotiate better payment terms with suppliers',
                                timeline: '1-week',
                                effort: 'low'
                            }
                        ]
                    },
                    {
                        id: 'leak_002',
                        title: 'Labor Cost Inefficiency',
                        description: 'Labor costs are 15% higher than industry benchmark for your revenue level.',
                        category: 'labor',
                        priority: 'medium',
                        monthlySavings: 15000,
                        annualSavings: 180000,
                        confidence: 'high',
                        actions: [
                            {
                                step: 'Review and optimize shift schedules',
                                timeline: '1-week',
                                effort: 'medium'
                            },
                            {
                                step: 'Cross-train employees for multiple roles',
                                timeline: '1-month',
                                effort: 'high'
                            }
                        ]
                    },
                    {
                        id: 'leak_003',
                        title: 'Utility Cost Optimization',
                        description: 'Energy consumption patterns suggest potential for 10-15% reduction through efficiency measures.',
                        category: 'overhead',
                        priority: 'low',
                        monthlySavings: 5000,
                        annualSavings: 60000,
                        confidence: 'medium',
                        actions: [
                            {
                                step: 'Install LED lighting and motion sensors',
                                timeline: '1-month',
                                effort: 'medium'
                            },
                            {
                                step: 'Schedule equipment maintenance to improve efficiency',
                                timeline: '1-week',
                                effort: 'low'
                            }
                        ]
                    }
                ],
                recommendations: [
                    'Focus on high-priority leaks first for maximum impact',
                    'Monitor inventory levels weekly',
                    'Review labor schedules monthly'
                ],
                nextSteps: 'Implement the immediate actions and track savings over the next 30 days.'
            },
            businessData: {
                revenue: 500000,
                costs: 425000,
                inventory: 150000,
                employees: 25,
                industry: 'retail'
            }
        });
        storage.set('profitAnalyses', analyses);

        // Create sample electricity analyses
        const electricityAnalyses = storage.get('electricityAnalyses', []);
        electricityAnalyses.push({
            id: 'elec_analysis_001',
            userId: 'demo_user_001',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            data: {
                analysis: {
                    expectedAmount: 4500,
                    actualAmount: 5200,
                    overchargeDetected: true,
                    overchargeAmount: 700,
                    overchargePercentage: 15.6,
                    confidence: 'high'
                },
                findings: [
                    {
                        issue: 'Fixed Charge Discrepancy',
                        impact: 'Overcharge of ₹400',
                        evidence: 'Fixed charges applied at commercial rate instead of industrial rate'
                    },
                    {
                        issue: 'Meter Reading Error',
                        impact: 'Overcharge of ₹300',
                        evidence: 'Units consumed recorded as 520 instead of actual 450'
                    }
                ],
                savingsOpportunities: [
                    {
                        opportunity: 'Switch to Time-of-Day Tariff',
                        potentialSavings: 800,
                        implementation: 'Contact provider to change tariff plan. Shift heavy usage to off-peak hours.'
                    },
                    {
                        opportunity: 'Power Factor Correction',
                        potentialSavings: 500,
                        implementation: 'Install capacitor banks to improve power factor and reduce penalties.'
                    }
                ],
                complaintDraft: `To,
The Customer Service Manager
[Electricity Provider Name]
[Address]

Date: ${new Date().toLocaleDateString('en-IN')}

Subject: Complaint Regarding Overcharge in Electricity Bill

Dear Sir/Madam,

I am writing to bring to your attention discrepancies in my electricity bill for the period [Billing Period].

Consumer Number: [Your Consumer Number]
Bill Amount: ₹5,200
Expected Amount: ₹4,500
Overcharge: ₹700

Issues Identified:
1. Fixed Charge Discrepancy: Fixed charges have been applied at commercial rate instead of the applicable industrial rate, resulting in an overcharge of ₹400.

2. Meter Reading Error: The bill shows units consumed as 520 kWh, whereas the actual consumption based on meter readings is 450 kWh, resulting in an overcharge of ₹300.

I request you to:
1. Verify the meter reading and correct the billing
2. Apply the correct tariff category
3. Adjust the overcharged amount of ₹700 in my next bill
4. Provide a revised bill with correct charges

I have attached copies of:
- Current electricity bill
- Previous month's bill for reference
- Meter reading photographs

I request you to investigate this matter urgently and resolve it within 7 working days as per CGRF guidelines.

Thank you for your prompt attention to this matter.

Yours sincerely,
${DEMO_ACCOUNT.fullName}
${DEMO_ACCOUNT.businessName}
Email: ${DEMO_ACCOUNT.email}`,
                recommendations: [
                    'File complaint with electricity provider immediately',
                    'Keep copies of all bills and correspondence',
                    'Consider installing smart meter for accurate readings',
                    'Review tariff category with provider'
                ]
            },
            billData: {
                billAmount: 5200,
                unitsConsumed: 520,
                billingPeriod: 'December 2025',
                provider: 'State Electricity Board'
            }
        });
        storage.set('electricityAnalyses', electricityAnalyses);

        console.log('✅ Demo data initialized successfully');
        console.log('📧 Demo Account:', DEMO_ACCOUNT.email);
        console.log('🔑 Password:', DEMO_ACCOUNT.password);
    }
}

// Simple password hashing (matches auth.js implementation)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Auto-fill demo credentials
function fillDemoCredentials() {
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    if (emailInput && passwordInput) {
        emailInput.value = DEMO_ACCOUNT.email;
        passwordInput.value = DEMO_ACCOUNT.password;

        // Show notification
        if (typeof toast !== 'undefined') {
            toast.info('Demo credentials filled! Click Login to continue.');
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DEMO_ACCOUNT, initializeDemoData, fillDemoCredentials };
}
