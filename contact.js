// Contact form validation and enhancement
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        this.addValidation();
        this.addProgressiveEnhancement();
    }

    addValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        
        // Remove existing error
        this.clearErrors(field);
        
        // Validate based on field type
        if (type === 'email') {
            if (!this.isValidEmail(value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'This field is required');
            return false;
        }
        
        if (field.tagName === 'TEXTAREA' && value.length < 10) {
            this.showError(field, 'Message must be at least 10 characters');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    clearErrors(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    addProgressiveEnhancement() {
        // Add character counter for textarea
        const textarea = this.form.querySelector('textarea');
        if (textarea) {
            this.addCharacterCounter(textarea);
        }
        
        // Add loading state for submit button
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    addCharacterCounter(textarea) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = '0 characters';
        
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            counter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
            
            if (length > 500) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        });
    }

    handleSubmit() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = '#27ae60';
            
            // Reset form after delay
            setTimeout(() => {
                this.form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                
                // Clear character counter
                const counter = this.form.querySelector('.character-counter');
                if (counter) {
                    counter.textContent = '0 characters';
                }
            }, 2000);
        }, 1500);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
