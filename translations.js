// ProfitLens AI - Multi-Language Translations

const TRANSLATIONS = {
    en: {
        // Navigation
        nav: {
            home: 'Home',
            features: 'Features',
            pricing: 'Pricing',
            login: 'Login',
            signup: 'Sign Up',
            logout: 'Logout',
            dashboard: 'Dashboard'
        },

        // Hero Section
        hero: {
            title: 'Stop Profit Leaks. Start Saving.',
            subtitle: 'AI-powered profit leak detection and electricity bill intelligence for SMBs',
            cta: 'Get Started Free',
            secondaryCta: 'Watch Demo'
        },

        // Features
        features: {
            title: 'Powerful Features for Your Business',
            profitLeak: {
                title: 'Profit Leak Detection',
                description: 'Identify hidden profit leaks with AI-powered analysis of your business data'
            },
            electricityBill: {
                title: 'Electricity Bill Intelligence',
                description: 'Detect overcharges and generate complaint drafts automatically'
            },
            multiLanguage: {
                title: 'Multi-Language Support',
                description: 'Available in English, Hindi, Chinese, and Indonesian'
            },
            insights: {
                title: 'Actionable Insights',
                description: 'Get clear, actionable recommendations with one-click "Fix Now" CTAs'
            }
        },

        // Pricing
        pricing: {
            title: 'Simple, Transparent Pricing',
            subtitle: 'Choose the plan that fits your business',
            free: 'Free',
            perMonth: '/month',
            popular: 'Most Popular',
            choosePlan: 'Choose Plan',
            currentPlan: 'Current Plan',
            features: {
                profitAnalysis: 'Profit Analysis',
                electricityAnalysis: 'Electricity Analysis',
                advancedInsights: 'Advanced Insights',
                prioritySupport: 'Priority Support',
                multiLocation: 'Multi-Location Support',
                exportReports: 'Export Reports',
                customIntegration: 'Custom Integration',
                unlimited: 'Unlimited',
                perMonth: 'per month'
            }
        },

        // Authentication
        auth: {
            login: 'Login',
            signup: 'Sign Up',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            fullName: 'Full Name',
            businessName: 'Business Name',
            forgotPassword: 'Forgot Password?',
            noAccount: "Don't have an account?",
            hasAccount: 'Already have an account?',
            loginSuccess: 'Login successful!',
            signupSuccess: 'Account created successfully!',
            loginError: 'Invalid email or password',
            signupError: 'Error creating account',
            passwordMismatch: 'Passwords do not match',
            invalidEmail: 'Invalid email address'
        },

        // Profit Analyzer
        profitAnalyzer: {
            title: 'Profit Leak Analyzer',
            subtitle: 'Enter your business data to identify profit leaks',
            revenue: 'Monthly Revenue',
            costs: 'Monthly Costs',
            inventory: 'Inventory Value',
            employees: 'Number of Employees',
            industry: 'Industry',
            analyze: 'Analyze Now',
            analyzing: 'Analyzing...',
            results: 'Analysis Results',
            leaksFound: 'Profit Leaks Found',
            potentialSavings: 'Potential Savings',
            fixNow: 'Fix Now',
            viewDetails: 'View Details',
            partialDataNote: 'You can submit partial data. More data = better insights.',
            industries: {
                retail: 'Retail',
                manufacturing: 'Manufacturing',
                services: 'Services',
                hospitality: 'Hospitality',
                technology: 'Technology',
                other: 'Other'
            }
        },

        // Electricity Analyzer
        electricityAnalyzer: {
            title: 'Electricity Bill Analyzer',
            subtitle: 'Upload or enter your electricity bill details',
            uploadBill: 'Upload Bill',
            manualEntry: 'Manual Entry',
            billAmount: 'Bill Amount',
            unitsConsumed: 'Units Consumed',
            billingPeriod: 'Billing Period',
            provider: 'Electricity Provider',
            analyze: 'Analyze Bill',
            analyzing: 'Analyzing...',
            results: 'Analysis Results',
            overchargeDetected: 'Overcharge Detected',
            noOvercharge: 'No Overcharge Detected',
            expectedAmount: 'Expected Amount',
            actualAmount: 'Actual Amount',
            overchargeAmount: 'Overcharge',
            generateComplaint: 'Generate Complaint',
            downloadComplaint: 'Download Complaint',
            complaintGenerated: 'Complaint draft generated successfully',
            savingsOpportunity: 'Savings Opportunity'
        },

        // Common
        common: {
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            cancel: 'Cancel',
            save: 'Save',
            delete: 'Delete',
            edit: 'Edit',
            close: 'Close',
            back: 'Back',
            next: 'Next',
            submit: 'Submit',
            search: 'Search',
            filter: 'Filter',
            sort: 'Sort',
            export: 'Export',
            import: 'Import',
            download: 'Download',
            upload: 'Upload',
            required: 'Required',
            optional: 'Optional',
            viewMore: 'View More',
            viewLess: 'View Less',
            learnMore: 'Learn More'
        },

        // Notifications
        notifications: {
            upgradeRequired: 'Upgrade your plan to access this feature',
            limitReached: 'You have reached your usage limit',
            savedSuccessfully: 'Saved successfully',
            errorOccurred: 'An error occurred. Please try again.',
            copied: 'Copied to clipboard',
            downloadStarted: 'Download started'
        }
    },

    hi: {
        // Navigation
        nav: {
            home: 'होम',
            features: 'विशेषताएं',
            pricing: 'मूल्य निर्धारण',
            login: 'लॉगिन',
            signup: 'साइन अप',
            logout: 'लॉगआउट',
            dashboard: 'डैशबोर्ड'
        },

        hero: {
            title: 'लाभ रिसाव रोकें। बचत शुरू करें।',
            subtitle: 'SMB के लिए AI-संचालित लाभ रिसाव पहचान और बिजली बिल बुद्धिमत्ता',
            cta: 'मुफ्त शुरू करें',
            secondaryCta: 'डेमो देखें'
        },

        features: {
            title: 'आपके व्यवसाय के लिए शक्तिशाली सुविधाएं',
            profitLeak: {
                title: 'लाभ रिसाव पहचान',
                description: 'अपने व्यवसाय डेटा के AI-संचालित विश्लेषण के साथ छिपे लाभ रिसाव की पहचान करें'
            },
            electricityBill: {
                title: 'बिजली बिल बुद्धिमत्ता',
                description: 'अधिक शुल्क का पता लगाएं और स्वचालित रूप से शिकायत ड्राफ्ट बनाएं'
            },
            multiLanguage: {
                title: 'बहु-भाषा समर्थन',
                description: 'अंग्रेजी, हिंदी, चीनी और इंडोनेशियाई में उपलब्ध'
            },
            insights: {
                title: 'कार्रवाई योग्य अंतर्दृष्टि',
                description: 'एक-क्लिक "अभी ठीक करें" CTA के साथ स्पष्ट, कार्रवाई योग्य सिफारिशें प्राप्त करें'
            }
        },

        pricing: {
            title: 'सरल, पारदर्शी मूल्य निर्धारण',
            subtitle: 'अपने व्यवसाय के लिए उपयुक्त योजना चुनें',
            free: 'मुफ्त',
            perMonth: '/महीना',
            popular: 'सबसे लोकप्रिय',
            choosePlan: 'योजना चुनें',
            currentPlan: 'वर्तमान योजना',
            features: {
                profitAnalysis: 'लाभ विश्लेषण',
                electricityAnalysis: 'बिजली विश्लेषण',
                advancedInsights: 'उन्नत अंतर्दृष्टि',
                prioritySupport: 'प्राथमिकता समर्थन',
                multiLocation: 'बहु-स्थान समर्थन',
                exportReports: 'रिपोर्ट निर्यात',
                customIntegration: 'कस्टम एकीकरण',
                unlimited: 'असीमित',
                perMonth: 'प्रति माह'
            }
        },

        auth: {
            login: 'लॉगिन',
            signup: 'साइन अप',
            email: 'ईमेल',
            password: 'पासवर्ड',
            confirmPassword: 'पासवर्ड की पुष्टि करें',
            fullName: 'पूरा नाम',
            businessName: 'व्यवसाय का नाम',
            forgotPassword: 'पासवर्ड भूल गए?',
            noAccount: 'खाता नहीं है?',
            hasAccount: 'पहले से खाता है?',
            loginSuccess: 'लॉगिन सफल!',
            signupSuccess: 'खाता सफलतापूर्वक बनाया गया!',
            loginError: 'अमान्य ईमेल या पासवर्ड',
            signupError: 'खाता बनाने में त्रुटि',
            passwordMismatch: 'पासवर्ड मेल नहीं खाते',
            invalidEmail: 'अमान्य ईमेल पता'
        },

        profitAnalyzer: {
            title: 'लाभ रिसाव विश्लेषक',
            subtitle: 'लाभ रिसाव की पहचान के लिए अपना व्यवसाय डेटा दर्ज करें',
            revenue: 'मासिक राजस्व',
            costs: 'मासिक लागत',
            inventory: 'इन्वेंटरी मूल्य',
            employees: 'कर्मचारियों की संख्या',
            industry: 'उद्योग',
            analyze: 'अभी विश्लेषण करें',
            analyzing: 'विश्लेषण कर रहे हैं...',
            results: 'विश्लेषण परिणाम',
            leaksFound: 'लाभ रिसाव मिले',
            potentialSavings: 'संभावित बचत',
            fixNow: 'अभी ठीक करें',
            viewDetails: 'विवरण देखें',
            partialDataNote: 'आप आंशिक डेटा सबमिट कर सकते हैं। अधिक डेटा = बेहतर अंतर्दृष्टि।',
            industries: {
                retail: 'खुदरा',
                manufacturing: 'विनिर्माण',
                services: 'सेवाएं',
                hospitality: 'आतिथ्य',
                technology: 'प्रौद्योगिकी',
                other: 'अन्य'
            }
        },

        electricityAnalyzer: {
            title: 'बिजली बिल विश्लेषक',
            subtitle: 'अपने बिजली बिल का विवरण अपलोड या दर्ज करें',
            uploadBill: 'बिल अपलोड करें',
            manualEntry: 'मैनुअल प्रविष्टि',
            billAmount: 'बिल राशि',
            unitsConsumed: 'खपत इकाइयां',
            billingPeriod: 'बिलिंग अवधि',
            provider: 'बिजली प्रदाता',
            analyze: 'बिल का विश्लेषण करें',
            analyzing: 'विश्लेषण कर रहे हैं...',
            results: 'विश्लेषण परिणाम',
            overchargeDetected: 'अधिक शुल्क का पता चला',
            noOvercharge: 'कोई अधिक शुल्क नहीं',
            expectedAmount: 'अपेक्षित राशि',
            actualAmount: 'वास्तविक राशि',
            overchargeAmount: 'अधिक शुल्क',
            generateComplaint: 'शिकायत बनाएं',
            downloadComplaint: 'शिकायत डाउनलोड करें',
            complaintGenerated: 'शिकायत ड्राफ्ट सफलतापूर्वक बनाया गया',
            savingsOpportunity: 'बचत का अवसर'
        },

        common: {
            loading: 'लोड हो रहा है...',
            error: 'त्रुटि',
            success: 'सफलता',
            cancel: 'रद्द करें',
            save: 'सहेजें',
            delete: 'हटाएं',
            edit: 'संपादित करें',
            close: 'बंद करें',
            back: 'वापस',
            next: 'अगला',
            submit: 'सबमिट करें',
            search: 'खोजें',
            filter: 'फ़िल्टर',
            sort: 'क्रमबद्ध करें',
            export: 'निर्यात',
            import: 'आयात',
            download: 'डाउनलोड',
            upload: 'अपलोड',
            required: 'आवश्यक',
            optional: 'वैकल्पिक',
            viewMore: 'और देखें',
            viewLess: 'कम देखें',
            learnMore: 'और जानें'
        },

        notifications: {
            upgradeRequired: 'इस सुविधा तक पहुंचने के लिए अपनी योजना अपग्रेड करें',
            limitReached: 'आप अपनी उपयोग सीमा तक पहुंच गए हैं',
            savedSuccessfully: 'सफलतापूर्वक सहेजा गया',
            errorOccurred: 'एक त्रुटि हुई। कृपया पुन: प्रयास करें।',
            copied: 'क्लिपबोर्ड पर कॉपी किया गया',
            downloadStarted: 'डाउनलोड शुरू हुआ'
        }
    },

    zh: {
        nav: {
            home: '首页',
            features: '功能',
            pricing: '价格',
            login: '登录',
            signup: '注册',
            logout: '登出',
            dashboard: '仪表板'
        },

        hero: {
            title: '停止利润泄漏。开始节省。',
            subtitle: '为中小企业提供AI驱动的利润泄漏检测和电费智能分析',
            cta: '免费开始',
            secondaryCta: '观看演示'
        },

        features: {
            title: '为您的业务提供强大功能',
            profitLeak: {
                title: '利润泄漏检测',
                description: '通过AI驱动的业务数据分析识别隐藏的利润泄漏'
            },
            electricityBill: {
                title: '电费智能分析',
                description: '自动检测超额收费并生成投诉草稿'
            },
            multiLanguage: {
                title: '多语言支持',
                description: '支持英语、印地语、中文和印尼语'
            },
            insights: {
                title: '可操作的见解',
                description: '获得清晰、可操作的建议，一键"立即修复"'
            }
        },

        pricing: {
            title: '简单透明的价格',
            subtitle: '选择适合您业务的计划',
            free: '免费',
            perMonth: '/月',
            popular: '最受欢迎',
            choosePlan: '选择计划',
            currentPlan: '当前计划',
            features: {
                profitAnalysis: '利润分析',
                electricityAnalysis: '电费分析',
                advancedInsights: '高级见解',
                prioritySupport: '优先支持',
                multiLocation: '多地点支持',
                exportReports: '导出报告',
                customIntegration: '自定义集成',
                unlimited: '无限',
                perMonth: '每月'
            }
        },

        auth: {
            login: '登录',
            signup: '注册',
            email: '电子邮件',
            password: '密码',
            confirmPassword: '确认密码',
            fullName: '全名',
            businessName: '企业名称',
            forgotPassword: '忘记密码？',
            noAccount: '没有账户？',
            hasAccount: '已有账户？',
            loginSuccess: '登录成功！',
            signupSuccess: '账户创建成功！',
            loginError: '电子邮件或密码无效',
            signupError: '创建账户时出错',
            passwordMismatch: '密码不匹配',
            invalidEmail: '电子邮件地址无效'
        },

        profitAnalyzer: {
            title: '利润泄漏分析器',
            subtitle: '输入您的业务数据以识别利润泄漏',
            revenue: '月收入',
            costs: '月成本',
            inventory: '库存价值',
            employees: '员工人数',
            industry: '行业',
            analyze: '立即分析',
            analyzing: '分析中...',
            results: '分析结果',
            leaksFound: '发现利润泄漏',
            potentialSavings: '潜在节省',
            fixNow: '立即修复',
            viewDetails: '查看详情',
            partialDataNote: '您可以提交部分数据。数据越多=见解越好。',
            industries: {
                retail: '零售',
                manufacturing: '制造',
                services: '服务',
                hospitality: '酒店',
                technology: '技术',
                other: '其他'
            }
        },

        electricityAnalyzer: {
            title: '电费分析器',
            subtitle: '上传或输入您的电费详情',
            uploadBill: '上传账单',
            manualEntry: '手动输入',
            billAmount: '账单金额',
            unitsConsumed: '消耗单位',
            billingPeriod: '计费周期',
            provider: '电力供应商',
            analyze: '分析账单',
            analyzing: '分析中...',
            results: '分析结果',
            overchargeDetected: '检测到超额收费',
            noOvercharge: '未检测到超额收费',
            expectedAmount: '预期金额',
            actualAmount: '实际金额',
            overchargeAmount: '超额收费',
            generateComplaint: '生成投诉',
            downloadComplaint: '下载投诉',
            complaintGenerated: '投诉草稿生成成功',
            savingsOpportunity: '节省机会'
        },

        common: {
            loading: '加载中...',
            error: '错误',
            success: '成功',
            cancel: '取消',
            save: '保存',
            delete: '删除',
            edit: '编辑',
            close: '关闭',
            back: '返回',
            next: '下一步',
            submit: '提交',
            search: '搜索',
            filter: '筛选',
            sort: '排序',
            export: '导出',
            import: '导入',
            download: '下载',
            upload: '上传',
            required: '必填',
            optional: '可选',
            viewMore: '查看更多',
            viewLess: '查看更少',
            learnMore: '了解更多'
        },

        notifications: {
            upgradeRequired: '升级您的计划以访问此功能',
            limitReached: '您已达到使用限制',
            savedSuccessfully: '保存成功',
            errorOccurred: '发生错误。请重试。',
            copied: '已复制到剪贴板',
            downloadStarted: '下载已开始'
        }
    },

    id: {
        nav: {
            home: 'Beranda',
            features: 'Fitur',
            pricing: 'Harga',
            login: 'Masuk',
            signup: 'Daftar',
            logout: 'Keluar',
            dashboard: 'Dasbor'
        },

        hero: {
            title: 'Hentikan Kebocoran Keuntungan. Mulai Hemat.',
            subtitle: 'Deteksi kebocoran keuntungan dan kecerdasan tagihan listrik berbasis AI untuk UKM',
            cta: 'Mulai Gratis',
            secondaryCta: 'Tonton Demo'
        },

        features: {
            title: 'Fitur Kuat untuk Bisnis Anda',
            profitLeak: {
                title: 'Deteksi Kebocoran Keuntungan',
                description: 'Identifikasi kebocoran keuntungan tersembunyi dengan analisis data bisnis berbasis AI'
            },
            electricityBill: {
                title: 'Kecerdasan Tagihan Listrik',
                description: 'Deteksi biaya berlebih dan buat draf keluhan secara otomatis'
            },
            multiLanguage: {
                title: 'Dukungan Multi-Bahasa',
                description: 'Tersedia dalam bahasa Inggris, Hindi, Mandarin, dan Indonesia'
            },
            insights: {
                title: 'Wawasan yang Dapat Ditindaklanjuti',
                description: 'Dapatkan rekomendasi yang jelas dan dapat ditindaklanjuti dengan CTA "Perbaiki Sekarang" satu klik'
            }
        },

        pricing: {
            title: 'Harga Sederhana dan Transparan',
            subtitle: 'Pilih paket yang sesuai dengan bisnis Anda',
            free: 'Gratis',
            perMonth: '/bulan',
            popular: 'Paling Populer',
            choosePlan: 'Pilih Paket',
            currentPlan: 'Paket Saat Ini',
            features: {
                profitAnalysis: 'Analisis Keuntungan',
                electricityAnalysis: 'Analisis Listrik',
                advancedInsights: 'Wawasan Lanjutan',
                prioritySupport: 'Dukungan Prioritas',
                multiLocation: 'Dukungan Multi-Lokasi',
                exportReports: 'Ekspor Laporan',
                customIntegration: 'Integrasi Kustom',
                unlimited: 'Tidak Terbatas',
                perMonth: 'per bulan'
            }
        },

        auth: {
            login: 'Masuk',
            signup: 'Daftar',
            email: 'Email',
            password: 'Kata Sandi',
            confirmPassword: 'Konfirmasi Kata Sandi',
            fullName: 'Nama Lengkap',
            businessName: 'Nama Bisnis',
            forgotPassword: 'Lupa Kata Sandi?',
            noAccount: 'Tidak punya akun?',
            hasAccount: 'Sudah punya akun?',
            loginSuccess: 'Login berhasil!',
            signupSuccess: 'Akun berhasil dibuat!',
            loginError: 'Email atau kata sandi tidak valid',
            signupError: 'Kesalahan membuat akun',
            passwordMismatch: 'Kata sandi tidak cocok',
            invalidEmail: 'Alamat email tidak valid'
        },

        profitAnalyzer: {
            title: 'Penganalisis Kebocoran Keuntungan',
            subtitle: 'Masukkan data bisnis Anda untuk mengidentifikasi kebocoran keuntungan',
            revenue: 'Pendapatan Bulanan',
            costs: 'Biaya Bulanan',
            inventory: 'Nilai Inventaris',
            employees: 'Jumlah Karyawan',
            industry: 'Industri',
            analyze: 'Analisis Sekarang',
            analyzing: 'Menganalisis...',
            results: 'Hasil Analisis',
            leaksFound: 'Kebocoran Keuntungan Ditemukan',
            potentialSavings: 'Potensi Penghematan',
            fixNow: 'Perbaiki Sekarang',
            viewDetails: 'Lihat Detail',
            partialDataNote: 'Anda dapat mengirimkan data parsial. Lebih banyak data = wawasan lebih baik.',
            industries: {
                retail: 'Ritel',
                manufacturing: 'Manufaktur',
                services: 'Layanan',
                hospitality: 'Perhotelan',
                technology: 'Teknologi',
                other: 'Lainnya'
            }
        },

        electricityAnalyzer: {
            title: 'Penganalisis Tagihan Listrik',
            subtitle: 'Unggah atau masukkan detail tagihan listrik Anda',
            uploadBill: 'Unggah Tagihan',
            manualEntry: 'Entri Manual',
            billAmount: 'Jumlah Tagihan',
            unitsConsumed: 'Unit yang Dikonsumsi',
            billingPeriod: 'Periode Penagihan',
            provider: 'Penyedia Listrik',
            analyze: 'Analisis Tagihan',
            analyzing: 'Menganalisis...',
            results: 'Hasil Analisis',
            overchargeDetected: 'Biaya Berlebih Terdeteksi',
            noOvercharge: 'Tidak Ada Biaya Berlebih',
            expectedAmount: 'Jumlah yang Diharapkan',
            actualAmount: 'Jumlah Aktual',
            overchargeAmount: 'Biaya Berlebih',
            generateComplaint: 'Buat Keluhan',
            downloadComplaint: 'Unduh Keluhan',
            complaintGenerated: 'Draf keluhan berhasil dibuat',
            savingsOpportunity: 'Peluang Penghematan'
        },

        common: {
            loading: 'Memuat...',
            error: 'Kesalahan',
            success: 'Berhasil',
            cancel: 'Batal',
            save: 'Simpan',
            delete: 'Hapus',
            edit: 'Edit',
            close: 'Tutup',
            back: 'Kembali',
            next: 'Berikutnya',
            submit: 'Kirim',
            search: 'Cari',
            filter: 'Filter',
            sort: 'Urutkan',
            export: 'Ekspor',
            import: 'Impor',
            download: 'Unduh',
            upload: 'Unggah',
            required: 'Wajib',
            optional: 'Opsional',
            viewMore: 'Lihat Lebih Banyak',
            viewLess: 'Lihat Lebih Sedikit',
            learnMore: 'Pelajari Lebih Lanjut'
        },

        notifications: {
            upgradeRequired: 'Tingkatkan paket Anda untuk mengakses fitur ini',
            limitReached: 'Anda telah mencapai batas penggunaan',
            savedSuccessfully: 'Berhasil disimpan',
            errorOccurred: 'Terjadi kesalahan. Silakan coba lagi.',
            copied: 'Disalin ke clipboard',
            downloadStarted: 'Unduhan dimulai'
        }
    }
};

// Get nested translation value
function getTranslation(lang, key) {
    const keys = key.split('.');
    let value = TRANSLATIONS[lang];

    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }

    return value || key;
}

// Translate element
function translateElement(element, lang) {
    const key = element.getAttribute('data-i18n');
    if (key) {
        const translation = getTranslation(lang, key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    }
}

// Translate page
function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        translateElement(element, lang);
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update direction for RTL languages
    const isRTL = CONFIG.languages[lang]?.rtl || false;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TRANSLATIONS, getTranslation, translateElement, translatePage };
}
