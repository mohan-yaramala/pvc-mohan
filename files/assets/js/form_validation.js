/**
 * PVC SECURITY - Form Validation & Submission System
 * Handles validation for all forms (Home, Contact Us) and manages success popups.
 */

document.addEventListener('DOMContentLoaded', function () {
    injectSuccessPopup();
    initFormHandlers();
});

/**
 * Injects the premium success popup HTML and CSS if not present
 */
function injectSuccessPopup() {
    if (document.getElementById('successOverlay')) return;

    const popupHtml = `
    <div class="success-overlay" id="successOverlay">
        <div class="success-card">
            <div class="checkmark-circle">
                <i class="fa-solid fa-check checkmark-icon"></i>
            </div>
            <h3 style="font-weight: 800; color: #000; margin-bottom: 10px;">Request Sent!</h3>
            <p style="color: #666; font-size: 15px; margin-bottom: 0;">We have received your details.<br>Our experts will contact you shortly.</p>
            <button class="btn-success-close" onclick="closeSuccessPopup()">DONE</button>
        </div>
    </div>
    
    <style>
        .success-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 99999;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .success-overlay.active {
            display: flex !important;
            opacity: 1;
        }
        .success-card {
            background: white;
            padding: 50px 40px;
            border-radius: 30px;
            text-align: center;
            width: 90%;
            max-width: 400px;
            transform: scale(0.8);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .success-overlay.active .success-card {
            transform: scale(1);
            opacity: 1;
        }
        .checkmark-circle {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #D4AF37, #AA771C);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
            animation: pulseGold 2s infinite;
        }
        @keyframes pulseGold {
            0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); }
            100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
        .checkmark-icon {
            font-size: 40px;
            color: white;
            opacity: 0;
            transform: scale(0);
        }
        .success-overlay.active .checkmark-icon {
            animation: popCheck 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards;
        }
        @keyframes popCheck {
            from { opacity: 0; transform: scale(0) rotate(-45deg); }
            to { opacity: 1; transform: scale(1) rotate(0); }
        }
        .btn-success-close {
            background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
            color: #000;
            border: none;
            padding: 15px 50px;
            border-radius: 50px;
            font-weight: 800;
            font-size: 16px;
            margin-top: 30px;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s;
            box-shadow: 0 10px 20px rgba(184, 134, 11, 0.3);
        }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHtml);
}

function initFormHandlers() {
    const contactForms = document.querySelectorAll('form');

    contactForms.forEach(form => {
        // Prevent default submit initially to handle validation
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmission(form);
        });
    });
}

function handleFormSubmission(form) {
    const allInputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    allInputs.forEach(input => {
        // Check for specific fields
        const val = input.value.trim();
        const type = input.getAttribute('type');
        const placeholder = input.getAttribute('placeholder') || "This field";

        if (val === "") {
            showInputError(input, `${placeholder} is required.`);
            isValid = false;
        } else if (type === 'email' && !validateEmail(val)) {
            showInputError(input, "Please enter a valid email.");
            isValid = false;
        } else {
            clearInputError(input);
        }
    });

    if (isValid) {
        processSuccess(form);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showInputError(input, message) {
    input.style.border = "1px solid #ff4d4d";
    input.style.boxShadow = "0 0 5px rgba(255, 77, 77, 0.3)";

    let errorMsg = input.parentNode.querySelector('.pvc-error-msg');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'pvc-error-msg';
        errorMsg.style.color = '#ff4d4d';
        errorMsg.style.fontSize = '11px';
        errorMsg.style.marginTop = '4px';
        errorMsg.style.textAlign = 'left';
        input.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function clearInputError(input) {
    input.style.border = "";
    input.style.boxShadow = "";
    const errorMsg = input.parentNode.querySelector('.pvc-error-msg');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function processSuccess(form) {
    const formContainer = form.closest('.form-container') || form.closest('.contact-boxarea');

    if (formContainer) {
        formContainer.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        formContainer.style.transform = 'translateY(-100px)';
        formContainer.style.opacity = '0';
    }

    form.reset();

    const overlay = document.getElementById('successOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }

    setTimeout(() => {
        if (formContainer) {
            formContainer.style.transform = 'translateY(0)';
            formContainer.style.opacity = '1';
        }
    }, 1000);
}

window.closeSuccessPopup = function () {
    const overlay = document.getElementById('successOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
};
