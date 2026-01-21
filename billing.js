// ProfitLens AI - Billing and Payment Management

// Razorpay Configuration (replace with actual keys in production)
const RAZORPAY_CONFIG = {
    keyId: 'rzp_test_YOUR_KEY_ID', // Replace with actual key
    keySecret: 'YOUR_KEY_SECRET' // Keep secret on server only
};

// Subscription Plans
const SUBSCRIPTION_PLANS = {
    free: {
        name: 'Free',
        price: 0,
        currency: 'INR',
        limits: {
            profitAnalysis: 3,
            electricityAnalysis: 2
        },
        features: ['Basic insights', 'Email support']
    },
    starter: {
        name: 'Starter',
        price: 499,
        currency: 'INR',
        limits: {
            profitAnalysis: 20,
            electricityAnalysis: 10
        },
        features: ['Advanced insights', 'Email support', 'Export reports']
    },
    professional: {
        name: 'Professional',
        price: 999,
        currency: 'INR',
        limits: {
            profitAnalysis: Infinity,
            electricityAnalysis: Infinity
        },
        features: ['Unlimited analyses', 'Advanced insights', 'Priority support', 'Export reports']
    },
    enterprise: {
        name: 'Enterprise',
        price: 1999,
        currency: 'INR',
        limits: {
            profitAnalysis: Infinity,
            electricityAnalysis: Infinity
        },
        features: ['Everything in Professional', 'Multi-location support', 'Custom integration', 'Dedicated support']
    }
};

// Check if user has exceeded usage limits
function checkUsageLimit(user, analysisType) {
    const plan = SUBSCRIPTION_PLANS[user.plan] || SUBSCRIPTION_PLANS.free;
    const usage = user.usage || { profitAnalysis: 0, electricityAnalysis: 0 };

    const limitKey = analysisType === 'profit' ? 'profitAnalysis' : 'electricityAnalysis';
    const limit = plan.limits[limitKey];

    if (limit === Infinity) {
        return { allowed: true, remaining: Infinity };
    }

    const used = usage[limitKey] || 0;
    const remaining = limit - used;

    return {
        allowed: remaining > 0,
        remaining,
        limit,
        used
    };
}

// Increment usage counter
function incrementUsage(user, analysisType) {
    const limitKey = analysisType === 'profit' ? 'profitAnalysis' : 'electricityAnalysis';

    if (!user.usage) {
        user.usage = { profitAnalysis: 0, electricityAnalysis: 0 };
    }

    user.usage[limitKey] = (user.usage[limitKey] || 0) + 1;

    // Save to storage
    const users = storage.get('users', []);
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        storage.set('users', users);
    }

    return user.usage[limitKey];
}

// Reset monthly usage (call this at the start of each month)
function resetMonthlyUsage(userId) {
    const users = storage.get('users', []);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex].usage = { profitAnalysis: 0, electricityAnalysis: 0 };
        storage.set('users', users);
    }
}

// Create Razorpay order (server-side function)
async function createRazorpayOrder(amount, currency = 'INR') {
    // This should be called from backend
    // Frontend should call backend API which then calls Razorpay

    const orderData = {
        amount: amount * 100, // Amount in paise
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
            app: 'ProfitLens AI'
        }
    };

    // In production, make API call to backend
    // Backend will call Razorpay API with secret key
    return {
        id: `order_${generateId()}`,
        amount: orderData.amount,
        currency: orderData.currency
    };
}

// Verify Razorpay payment signature (server-side function)
function verifyPaymentSignature(orderId, paymentId, signature) {
    // This MUST be done on server-side for security
    // Never expose Razorpay secret key on frontend

    const crypto = require('crypto');
    const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_CONFIG.keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

    return expectedSignature === signature;
}

// Process subscription payment
async function processSubscription(userId, planId) {
    const user = authManager.getCurrentUser();
    if (user.id !== userId) {
        throw new Error('Unauthorized');
    }

    const plan = SUBSCRIPTION_PLANS[planId];
    if (!plan) {
        throw new Error('Invalid plan');
    }

    // Create Razorpay order
    const order = await createRazorpayOrder(plan.price, plan.currency);

    return {
        orderId: order.id,
        amount: plan.price,
        currency: plan.currency,
        planId,
        planName: plan.name
    };
}

// Handle successful payment
function handlePaymentSuccess(paymentData) {
    const { userId, planId, paymentId, orderId, signature } = paymentData;

    // Verify payment signature (should be done on server)
    // For now, we'll trust the payment

    // Update user plan
    const users = storage.get('users', []);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        throw new Error('User not found');
    }

    users[userIndex].plan = planId;
    users[userIndex].subscriptionStartDate = new Date().toISOString();
    users[userIndex].subscriptionStatus = 'active';
    storage.set('users', users);

    // Create invoice
    const invoice = {
        id: generateId(),
        userId,
        date: new Date().toISOString(),
        description: `${SUBSCRIPTION_PLANS[planId].name} Plan Subscription`,
        amount: SUBSCRIPTION_PLANS[planId].price,
        currency: SUBSCRIPTION_PLANS[planId].currency,
        status: 'paid',
        paymentId,
        orderId
    };

    const invoices = storage.get('invoices', []);
    invoices.push(invoice);
    storage.set('invoices', invoices);

    return {
        success: true,
        invoice,
        message: 'Subscription activated successfully'
    };
}

// Cancel subscription
function cancelSubscription(userId) {
    const users = storage.get('users', []);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        throw new Error('User not found');
    }

    // Downgrade to free plan
    users[userIndex].plan = 'free';
    users[userIndex].subscriptionStatus = 'cancelled';
    users[userIndex].subscriptionCancelDate = new Date().toISOString();
    storage.set('users', users);

    // Create cancellation invoice
    const invoice = {
        id: generateId(),
        userId,
        date: new Date().toISOString(),
        description: 'Subscription Cancelled',
        amount: 0,
        currency: 'INR',
        status: 'cancelled'
    };

    const invoices = storage.get('invoices', []);
    invoices.push(invoice);
    storage.set('invoices', invoices);

    return {
        success: true,
        message: 'Subscription cancelled successfully'
    };
}

// Get user invoices
function getUserInvoices(userId) {
    const invoices = storage.get('invoices', []);
    return invoices.filter(inv => inv.userId === userId);
}

// Generate invoice PDF (placeholder)
function generateInvoicePDF(invoiceId) {
    const invoices = storage.get('invoices', []);
    const invoice = invoices.find(inv => inv.id === invoiceId);

    if (!invoice) {
        throw new Error('Invoice not found');
    }

    // In production, use a PDF library like jsPDF or pdfmake
    console.log('Generating PDF for invoice:', invoice);

    return {
        success: true,
        message: 'Invoice PDF generated',
        downloadUrl: `#invoice-${invoiceId}`
    };
}

// Add payment method
function addPaymentMethod(userId, methodData) {
    const paymentMethod = {
        id: generateId(),
        userId,
        type: methodData.type || 'Card',
        last4: methodData.last4,
        expiry: methodData.expiry,
        isDefault: methodData.isDefault || false,
        createdAt: new Date().toISOString()
    };

    const paymentMethods = storage.get('paymentMethods', []);

    // If this is set as default, unset other defaults
    if (paymentMethod.isDefault) {
        paymentMethods.forEach(pm => {
            if (pm.userId === userId) {
                pm.isDefault = false;
            }
        });
    }

    paymentMethods.push(paymentMethod);
    storage.set('paymentMethods', paymentMethods);

    return paymentMethod;
}

// Remove payment method
function removePaymentMethod(userId, methodId) {
    const paymentMethods = storage.get('paymentMethods', []);
    const filtered = paymentMethods.filter(pm =>
        !(pm.id === methodId && pm.userId === userId)
    );

    storage.set('paymentMethods', filtered);

    return {
        success: true,
        message: 'Payment method removed'
    };
}

// Get user payment methods
function getUserPaymentMethods(userId) {
    const paymentMethods = storage.get('paymentMethods', []);
    return paymentMethods.filter(pm => pm.userId === userId);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SUBSCRIPTION_PLANS,
        checkUsageLimit,
        incrementUsage,
        resetMonthlyUsage,
        processSubscription,
        handlePaymentSuccess,
        cancelSubscription,
        getUserInvoices,
        generateInvoicePDF,
        addPaymentMethod,
        removePaymentMethod,
        getUserPaymentMethods
    };
}
