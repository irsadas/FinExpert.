/**
 * FinExpert Portfolio Core Logic
 * Organized by Feature Modules
 */

// --- UTILITIES ---
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// --- NAVIGATION & UI ---
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileBtn.classList.toggle('is-active');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        window.scrollY > 300 ? backToTopBtn.classList.add('show') : backToTopBtn.classList.remove('show');
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (icon) icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    });
}

// --- FORMS & VALIDATION ---
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const serviceInput = document.getElementById('service');
        
        let isValid = true;
        let errorMessage = "";

        // Reset border colors
        nameInput.style.borderColor = "#d1d5db";
        emailInput.style.borderColor = "#d1d5db";

        // Validate Name
        if (nameInput.value.trim() === "") {
            isValid = false;
            errorMessage += "Please enter your full name.\n";
            nameInput.style.borderColor = "#ef4444"; // Red color
        }

        // Validate Email
        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            errorMessage += "Please enter a valid email address.\n";
            emailInput.style.borderColor = "#ef4444"; // Red color
        }

        if (isValid) {
            alert(`Thank you, ${nameInput.value}! Your request for ${serviceInput.value} has been received. We will contact you shortly.`);
            contactForm.reset();
        } else {
            alert(errorMessage);
        }
    });
}

const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
if (cookieBanner && acceptCookiesBtn) {
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.classList.remove('show');
    });
}

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        if (emailInput.value) {
            alert(`Thank you for subscribing! We've sent a confirmation to ${emailInput.value}.`);
            newsletterForm.reset();
        }
    });
}

// --- MODAL SYSTEM ---
function setupModal(modalId, openBtnId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    
    if (modal) {
        const closeBtn = modal.querySelector('.close-modal');

        if (openBtn) {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }
    }
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

setupModal('consultation-modal', 'open-modal-btn');
setupModal('login-modal', 'login-btn');
setupModal('forgot-password-modal', null); // Open button handled manually
setupModal('2fa-modal', 'setup-2fa-btn');

const forgotPasswordLink = document.getElementById('forgot-password-link');
const loginModal = document.getElementById('login-modal');
const forgotPasswordModal = document.getElementById('forgot-password-modal');
const backToLoginLink = document.getElementById('back-to-login');

if (forgotPasswordLink && loginModal && forgotPasswordModal) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('show');
        forgotPasswordModal.classList.add('show');
    });
}

if (backToLoginLink && loginModal && forgotPasswordModal) {
    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        forgotPasswordModal.classList.remove('show');
        loginModal.classList.add('show');
    });
}

const forgotPasswordForm = document.getElementById('forgot-password-form');
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        alert(`Password reset link sent to ${email}. Please check your inbox.`);
        forgotPasswordModal.classList.remove('show');
        forgotPasswordForm.reset();
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        alert(`Login simulation: Welcome back, ${email}!`);
        document.getElementById('login-modal').classList.remove('show');
        loginForm.reset();
    });
}

const modalForm = document.getElementById('modal-form');
const consultationModal = document.getElementById('consultation-modal');

if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('modal-name');
        const emailInput = document.getElementById('modal-email');
        
        let isValid = true;
        let errorMessage = "";

        nameInput.style.borderColor = "#d1d5db";
        emailInput.style.borderColor = "#d1d5db";

        if (nameInput.value.trim() === "") {
            isValid = false;
            nameInput.style.borderColor = "#ef4444";
        }

        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = "#ef4444";
        }

        if (isValid) {
            alert("Thank you! Your consultation request has been received.");
            if (consultationModal) consultationModal.classList.remove('show');
            modalForm.reset();
        }
    });
}

// --- FEATURES (FAQ & TAX) ---
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
}

// Tax Estimator Logic
const taxForm = document.getElementById('tax-estimator-form');
let taxChartInstance = null; // Global variable to track the chart instance

if (taxForm) {
    // 2024 IRS Tax Data (Progressive)
    const TAX_DATA_2024 = {
        single: {
            deduction: 14600,
            brackets: [
                { limit: 11600, rate: 0.10 },
                { limit: 47150, rate: 0.12 },
                { limit: 100525, rate: 0.22 },
                { limit: 191950, rate: 0.24 },
                { limit: 243725, rate: 0.32 },
                { limit: 609350, rate: 0.35 },
                { limit: Infinity, rate: 0.37 }
            ]
        },
        married: {
            deduction: 29200,
            brackets: [
                { limit: 23200, rate: 0.10 },
                { limit: 94300, rate: 0.12 },
                { limit: 201050, rate: 0.22 },
                { limit: 383900, rate: 0.24 },
                { limit: 487450, rate: 0.32 },
                { limit: 731200, rate: 0.35 },
                { limit: Infinity, rate: 0.37 }
            ]
        }
    };

    taxForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const income = parseFloat(document.getElementById('annual-income').value);
        const itemized = parseFloat(document.getElementById('itemized-deductions').value) || 0;
        const status = document.getElementById('filing-status').value;
        const resultDiv = document.getElementById('tax-result');
        const amountSpan = document.getElementById('estimated-amount');
        const breakdownDiv = document.getElementById('tax-breakdown');
        
        if (isNaN(income) || income < 0) {
            alert("Please enter a valid income amount.");
            return;
        }

        const data = TAX_DATA_2024[status];
        const deductionToUse = Math.max(data.deduction, itemized);
        let taxableIncome = Math.max(0, income - deductionToUse);
        let totalTax = 0;
        let previousLimit = 0;
        let breakdownHtml = `<strong>Taxable Income: $${taxableIncome.toLocaleString()}</strong> (after $${deductionToUse.toLocaleString()} ${deductionToUse > data.deduction ? 'itemized' : 'standard'} deduction)<br><br>`;
        const chartLabels = [];
        const chartData = [];

        for (const bracket of data.brackets) {
            if (taxableIncome > previousLimit) {
                const taxableInThisBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
                const taxForBracket = taxableInThisBracket * bracket.rate;
                totalTax += taxForBracket;
                
                chartLabels.push(`${(bracket.rate * 100).toFixed(0)}% Bracket`);
                chartData.push(taxForBracket);
                
                breakdownHtml += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${(bracket.rate * 100).toFixed(0)}% on first $${taxableInThisBracket.toLocaleString()}</span>
                        <span>$${taxForBracket.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                `;
                
                previousLimit = bracket.limit;
            } else {
                break;
            }
        }
        
        amountSpan.textContent = '$' + totalTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        if (breakdownDiv) {
            breakdownDiv.innerHTML = breakdownHtml;
        }
        resultDiv.style.display = 'block';

        // Render or Update Chart
        const ctx = document.getElementById('taxChart').getContext('2d');
        
        // Destroy existing chart if it exists to prevent overlap
        if (taxChartInstance) {
            taxChartInstance.destroy();
        }

        taxChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartData,
                    backgroundColor: [
                        '#0a192f', '#d4af37', '#112240', '#b5952f', '#1f2937', '#8892b0', '#4b5563'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.body).getPropertyValue('--text-main').trim()
                        }
                    }
                }
            }
        });
    });
}

const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

const profileForm = document.getElementById('profile-settings-form');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Profile settings saved successfully!');
    });
}

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');

if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            alert(`File "${files[0].name}" uploaded successfully!`);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            alert(`File "${fileInput.files[0].name}" selected!`);
        }
    });
}

const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

if (chatForm && chatMessages && chatInput) {
    // Scroll to bottom on load
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = chatInput.value.trim();
        
        if (messageText) {
            // Add user message
            addMessage(messageText, 'sent');
            chatInput.value = '';
            
            // Simulate reply
            setTimeout(() => {
                addMessage("Thanks for your message. An accountant will review it shortly.", 'received');
            }, 1000);
        }
    });

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        const p = document.createElement('p');
        p.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('time');
        const now = new Date();
        timeSpan.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.appendChild(p);
        messageDiv.appendChild(timeSpan);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Deactivate all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate clicked
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

const securityForm = document.getElementById('security-settings-form');
if (securityForm) {
    securityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Password updated successfully!');
        securityForm.reset();
    });
}

const preferencesForm = document.getElementById('preferences-form');
if (preferencesForm) {
    preferencesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Preferences saved successfully!');
    });
}

const twoFactorForm = document.getElementById('2fa-verify-form');
if (twoFactorForm) {
    twoFactorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('2fa-code').value;
        if (code && code.length === 6 && !isNaN(code)) {
            alert('Two-Factor Authentication has been enabled successfully!');
            document.getElementById('2fa-modal').classList.remove('show');
        } else {
            alert('Please enter a valid 6-digit code.');
        }
    });
}

const notificationsBtn = document.getElementById('notifications-btn');
const notificationsMenu = document.getElementById('notifications-menu');

if (notificationsBtn && notificationsMenu) {
    notificationsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsMenu.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        if (notificationsMenu.classList.contains('show')) {
            notificationsMenu.classList.remove('show');
        }
    });

    notificationsMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

const markAllReadBtn = document.getElementById('mark-all-read');
const notificationBadge = document.querySelector('.notification-badge');
const notificationItems = document.querySelectorAll('.notification-item');

if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (notificationBadge) {
            notificationBadge.style.display = 'none';
        }
        notificationItems.forEach(item => {
            item.classList.add('read');
        });
    });
}

const saveEstimationBtn = document.getElementById('save-estimation-btn');
if (saveEstimationBtn) {
    saveEstimationBtn.addEventListener('click', () => {
        const income = document.getElementById('annual-income').value;
        const status = document.getElementById('filing-status').value;
        const itemized = document.getElementById('itemized-deductions').value || 0;
        const estimatedTax = document.getElementById('estimated-amount').textContent;

        const estimation = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            income: parseFloat(income).toLocaleString(),
            status: status.charAt(0).toUpperCase() + status.slice(1),
            itemized: parseFloat(itemized).toLocaleString(),
            totalTax: estimatedTax
        };

        const savedEstimations = JSON.parse(localStorage.getItem('taxEstimations')) || [];
        savedEstimations.push(estimation);
        localStorage.setItem('taxEstimations', JSON.stringify(savedEstimations));

        alert('Estimation saved to your browser successfully!');
        loadSavedEstimations(); // Refresh table if it exists on the current page
    });
}

function loadSavedEstimations() {
    const tableBody = document.getElementById('saved-estimations-body');
    const clearBtn = document.getElementById('clear-history-btn');
    if (!tableBody) return;

    const savedEstimations = JSON.parse(localStorage.getItem('taxEstimations')) || [];
    tableBody.innerHTML = '';

    if (savedEstimations.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">No saved estimations found.</td></tr>';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }

    if (clearBtn) clearBtn.style.display = 'block';

    // Sort by date descending (newest first)
    savedEstimations.sort((a, b) => b.id - a.id);

    savedEstimations.forEach(est => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${est.date}</td>
            <td>$${est.income}</td>
            <td>${est.status}</td>
            <td>$${est.itemized}</td>
            <td><strong>${est.totalTax}</strong></td>
            <td>
                <button class="btn-sm delete-estimation" data-id="${est.id}" title="Delete">
                    <i class="fas fa-trash-alt" style="color: #ef4444;"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach delete event listeners
    document.querySelectorAll('.delete-estimation').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            let estimations = JSON.parse(localStorage.getItem('taxEstimations')) || [];
            estimations = estimations.filter(e => e.id !== id);
            localStorage.setItem('taxEstimations', JSON.stringify(estimations));
            loadSavedEstimations();
        });
    });
}

const clearHistoryBtn = document.getElementById('clear-history-btn');
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all saved estimations? This action cannot be undone.')) {
            localStorage.removeItem('taxEstimations');
            loadSavedEstimations();
        }
    });
}

// --- ANIMATIONS ---
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

document.addEventListener('DOMContentLoaded', loadSavedEstimations);