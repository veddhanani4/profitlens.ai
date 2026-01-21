// ProfitLens AI - Email Service Integration

// Email Configuration (using EmailJS or similar service)
const EMAIL_CONFIG = {
    serviceId: 'service_profitlens', // Replace with actual EmailJS service ID
    templateId: 'template_contact', // Replace with actual template ID
    publicKey: 'YOUR_PUBLIC_KEY', // Replace with actual public key
    adminEmail: 'admin@profitlens.ai' // Admin email to receive notifications
};

// Initialize EmailJS (if using EmailJS)
function initializeEmailService() {
    // In production, load EmailJS SDK
    // emailjs.init(EMAIL_CONFIG.publicKey);
    console.log('📧 Email service initialized');
}

// Send email using EmailJS
async function sendEmail(templateParams) {
    try {
        // In production, use actual EmailJS
        // const response = await emailjs.send(
        //   EMAIL_CONFIG.serviceId,
        //   EMAIL_CONFIG.templateId,
        //   templateParams
        // );

        // For now, simulate email sending
        console.log('📧 Email sent:', templateParams);

        // Save to local storage for demo
        const emails = storage.get('sentEmails', []);
        emails.push({
            id: generateId(),
            ...templateParams,
            sentAt: new Date().toISOString(),
            status: 'sent'
        });
        storage.set('sentEmails', emails);

        return {
            success: true,
            message: 'Email sent successfully'
        };
    } catch (error) {
        console.error('Email sending failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Send feedback email
async function sendFeedback(feedbackData) {
    const user = authManager.getCurrentUser();

    const templateParams = {
        to_email: EMAIL_CONFIG.adminEmail,
        from_name: feedbackData.name || user?.fullName || 'Anonymous',
        from_email: feedbackData.email || user?.email || 'no-reply@profitlens.ai',
        subject: `Feedback: ${feedbackData.category}`,
        message: feedbackData.message,
        rating: feedbackData.rating || 'N/A',
        user_id: user?.id || 'guest',
        timestamp: new Date().toLocaleString(),
        page_url: window.location.href
    };

    // Send to admin
    const result = await sendEmail(templateParams);

    // Save feedback to database
    const feedbacks = storage.get('feedbacks', []);
    feedbacks.push({
        id: generateId(),
        userId: user?.id || null,
        ...feedbackData,
        createdAt: new Date().toISOString(),
        status: 'submitted'
    });
    storage.set('feedbacks', feedbacks);

    // Send confirmation to user
    if (feedbackData.email || user?.email) {
        await sendEmail({
            to_email: feedbackData.email || user.email,
            from_name: 'ProfitLens AI',
            from_email: 'noreply@profitlens.ai',
            subject: 'Thank you for your feedback',
            message: `Dear ${feedbackData.name || user?.fullName},\n\nThank you for your valuable feedback. We have received your message and will review it shortly.\n\nYour feedback helps us improve ProfitLens AI.\n\nBest regards,\nProfitLens AI Team`
        });
    }

    return result;
}

// Send complaint email
async function sendComplaint(complaintData) {
    const user = authManager.getCurrentUser();

    const templateParams = {
        to_email: EMAIL_CONFIG.adminEmail,
        from_name: complaintData.name || user?.fullName || 'Anonymous',
        from_email: complaintData.email || user?.email || 'no-reply@profitlens.ai',
        subject: `COMPLAINT: ${complaintData.category} - ${complaintData.priority}`,
        message: complaintData.description,
        priority: complaintData.priority,
        category: complaintData.category,
        user_id: user?.id || 'guest',
        timestamp: new Date().toLocaleString(),
        page_url: window.location.href,
        order_id: complaintData.orderId || 'N/A'
    };

    // Send to admin
    const result = await sendEmail(templateParams);

    // Save complaint to database
    const complaints = storage.get('complaints', []);
    const complaintId = generateId();
    complaints.push({
        id: complaintId,
        userId: user?.id || null,
        ...complaintData,
        createdAt: new Date().toISOString(),
        status: 'open',
        ticketNumber: `TICKET-${complaintId.substring(0, 8).toUpperCase()}`
    });
    storage.set('complaints', complaints);

    // Send confirmation to user with ticket number
    if (complaintData.email || user?.email) {
        await sendEmail({
            to_email: complaintData.email || user.email,
            from_name: 'ProfitLens AI Support',
            from_email: 'support@profitlens.ai',
            subject: `Complaint Received - Ticket #${complaintId.substring(0, 8).toUpperCase()}`,
            message: `Dear ${complaintData.name || user?.fullName},\n\nWe have received your complaint and assigned ticket number: ${complaintId.substring(0, 8).toUpperCase()}\n\nCategory: ${complaintData.category}\nPriority: ${complaintData.priority}\n\nOur team will review your complaint and respond within 24-48 hours.\n\nThank you for bringing this to our attention.\n\nBest regards,\nProfitLens AI Support Team`
        });
    }

    return {
        success: true,
        ticketNumber: `TICKET-${complaintId.substring(0, 8).toUpperCase()}`,
        message: 'Complaint submitted successfully'
    };
}

// Send user registration notification to admin
async function notifyAdminNewUser(userData) {
    const templateParams = {
        to_email: EMAIL_CONFIG.adminEmail,
        from_name: 'ProfitLens AI System',
        from_email: 'system@profitlens.ai',
        subject: '🎉 New User Registration',
        message: `A new user has registered on ProfitLens AI:\n\nName: ${userData.fullName}\nEmail: ${userData.email}\nBusiness: ${userData.businessName || 'N/A'}\nPlan: ${userData.plan || 'free'}\nRegistered: ${new Date().toLocaleString()}\nUser ID: ${userData.id}`,
        user_data: JSON.stringify(userData, null, 2)
    };

    return await sendEmail(templateParams);
}

// Send subscription notification to admin
async function notifyAdminSubscription(subscriptionData) {
    const templateParams = {
        to_email: EMAIL_CONFIG.adminEmail,
        from_name: 'ProfitLens AI System',
        from_email: 'system@profitlens.ai',
        subject: '💰 New Subscription',
        message: `A user has subscribed to a paid plan:\n\nUser: ${subscriptionData.userName}\nEmail: ${subscriptionData.userEmail}\nPlan: ${subscriptionData.plan}\nAmount: ₹${subscriptionData.amount}\nPayment ID: ${subscriptionData.paymentId}\nDate: ${new Date().toLocaleString()}`,
        subscription_data: JSON.stringify(subscriptionData, null, 2)
    };

    return await sendEmail(templateParams);
}

// Send analysis notification to admin (for monitoring)
async function notifyAdminAnalysis(analysisData) {
    // Only send for certain conditions (e.g., high-value findings)
    if (analysisData.totalSavings < 10000) return;

    const templateParams = {
        to_email: EMAIL_CONFIG.adminEmail,
        from_name: 'ProfitLens AI System',
        from_email: 'system@profitlens.ai',
        subject: '📊 High-Value Analysis Completed',
        message: `A high-value analysis has been completed:\n\nUser: ${analysisData.userName}\nType: ${analysisData.type}\nTotal Savings Identified: ₹${analysisData.totalSavings}\nLeaks Found: ${analysisData.leaksCount}\nDate: ${new Date().toLocaleString()}`,
        analysis_summary: JSON.stringify(analysisData, null, 2)
    };

    return await sendEmail(templateParams);
}

// Send welcome email to new user
async function sendWelcomeEmail(userData) {
    const templateParams = {
        to_email: userData.email,
        from_name: 'ProfitLens AI',
        from_email: 'welcome@profitlens.ai',
        subject: '🎉 Welcome to ProfitLens AI!',
        message: `Dear ${userData.fullName},\n\nWelcome to ProfitLens AI! We're excited to help you identify profit leaks and save money.\n\nYour account has been created successfully:\n- Email: ${userData.email}\n- Plan: ${userData.plan || 'Free'}\n\nGet started:\n1. Analyze your profit leaks\n2. Check your electricity bills\n3. Chat with our AI assistant\n\nNeed help? Visit our User Manual or contact support.\n\nBest regards,\nProfitLens AI Team\n\nStop Profit Leaks. Start Saving.`
    };

    return await sendEmail(templateParams);
}

// Send password reset email
async function sendPasswordResetEmail(email, resetToken) {
    const resetLink = `${window.location.origin}/reset-password.html?token=${resetToken}`;

    const templateParams = {
        to_email: email,
        from_name: 'ProfitLens AI',
        from_email: 'noreply@profitlens.ai',
        subject: '🔒 Password Reset Request',
        message: `You requested to reset your password for ProfitLens AI.\n\nClick the link below to reset your password:\n${resetLink}\n\nThis link will expire in 24 hours.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nProfitLens AI Team`,
        reset_link: resetLink
    };

    return await sendEmail(templateParams);
}

// Get user feedbacks (admin function)
function getUserFeedbacks(userId = null) {
    const feedbacks = storage.get('feedbacks', []);
    if (userId) {
        return feedbacks.filter(f => f.userId === userId);
    }
    return feedbacks;
}

// Get user complaints (admin function)
function getUserComplaints(userId = null) {
    const complaints = storage.get('complaints', []);
    if (userId) {
        return complaints.filter(c => c.userId === userId);
    }
    return complaints;
}

// Update complaint status (admin function)
function updateComplaintStatus(complaintId, status, response) {
    const complaints = storage.get('complaints', []);
    const index = complaints.findIndex(c => c.id === complaintId);

    if (index !== -1) {
        complaints[index].status = status;
        complaints[index].response = response;
        complaints[index].updatedAt = new Date().toISOString();
        storage.set('complaints', complaints);

        // Send email to user about status update
        if (complaints[index].email) {
            sendEmail({
                to_email: complaints[index].email,
                from_name: 'ProfitLens AI Support',
                from_email: 'support@profitlens.ai',
                subject: `Complaint Update - Ticket #${complaints[index].ticketNumber}`,
                message: `Dear ${complaints[index].name},\n\nYour complaint (Ticket #${complaints[index].ticketNumber}) has been updated.\n\nStatus: ${status}\n\n${response}\n\nThank you for your patience.\n\nBest regards,\nProfitLens AI Support Team`
            });
        }

        return { success: true, complaint: complaints[index] };
    }

    return { success: false, error: 'Complaint not found' };
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeEmailService,
        sendEmail,
        sendFeedback,
        sendComplaint,
        notifyAdminNewUser,
        notifyAdminSubscription,
        notifyAdminAnalysis,
        sendWelcomeEmail,
        sendPasswordResetEmail,
        getUserFeedbacks,
        getUserComplaints,
        updateComplaintStatus
    };
}
