<template>
    <div class="auth-page">
        <div class="auth-container">
            <div class="auth-header">
                <router-link to="/" class="logo-link">
                    <img src="@/assets/images/kabaroapp-header.png" alt="Kabaro App Logo" class="auth-logo" />
                </router-link>
                <h1>Create Account</h1>
                <p>Join the maritime professional community</p>
            </div>

            <form @submit.prevent="handleRegister" class="auth-form">
                <!-- Name Row -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <div class="input-wrapper">
                            <input type="text" id="firstName" v-model="formData.firstName" required
                                placeholder="Enter first name" :class="['form-input', { error: errors.firstName }]" />
                        </div>
                        <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                    </div>

                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <div class="input-wrapper">
                            <input type="text" id="lastName" v-model="formData.lastName" required
                                placeholder="Enter last name" :class="['form-input', { error: errors.lastName }]" />
                        </div>
                        <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                    </div>
                </div>

                <!-- Username -->
                <div class="form-group">
                    <label for="username">Username</label>
                    <div class="input-wrapper">
                        <input type="text" id="username" v-model="formData.username" required
                            placeholder="Choose a username" :class="['form-input', { error: errors.username }]" />
                    </div>
                    <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
                </div>

                <!-- Date of Birth section: -->
                <div class="form-group">
                    <label for="dateOfBirth">Date of Birth</label>
                    <div class="input-wrapper">
                        <input type="date" id="dateOfBirth" v-model="formData.dateOfBirth" required ref="dateInput"
                            :class="['form-input', { error: errors.dateOfBirth }]" />
                    </div>
                    <span v-if="errors.dateOfBirth" class="error-message">{{ errors.dateOfBirth }}</span>
                </div>

                <!-- Nationality -->
                <div class="form-group">
                    <label for="nationality">Nationality</label>
                    <div class="input-wrapper">
                        <input type="text" id="nationality" v-model="formData.nationality" required
                            placeholder="Enter your nationality"
                            :class="['form-input', { error: errors.nationality }]" />
                    </div>
                    <span v-if="errors.nationality" class="error-message">{{ errors.nationality }}</span>
                </div>

                <!-- Year Graduated -->
                <div class="form-group">
                    <label for="graduationYear">Year Graduated</label>
                    <div class="input-wrapper">
                        <input type="number" id="graduationYear" v-model="formData.graduationYear" required
                            :max="currentYear" :min="currentYear - 60" placeholder="Enter graduation year"
                            :class="['form-input', { error: errors.graduationYear }]" />
                    </div>
                    <span v-if="errors.graduationYear" class="error-message">{{ errors.graduationYear }}</span>
                </div>

                <!-- Position/Rank -->
                <div class="form-group">
                    <label for="position">Position or Rank</label>
                    <div class="input-wrapper">
                        <select id="position" v-model="formData.position" required
                            :class="['form-input', { error: errors.position }]">
                            <option value="">Select your position</option>
                            <option value="captain">Captain</option>
                            <option value="chief_engineer">Chief Engineer</option>
                            <option value="deck_officer">Deck Officer</option>
                            <option value="engineer_officer">Engineer Officer</option>
                            <option value="able_seaman">Able Seaman</option>
                            <option value="able_seaman">Ordinary Seaman</option>
                            <option value="able_seaman">Deck Cadet</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <span v-if="errors.position" class="error-message">{{ errors.position }}</span>
                </div>

                <!-- Current Rank Experience -->
                <div class="form-group">
                    <label for="currentRankExperience">Years of Experience (Current Rank)</label>
                    <div class="input-wrapper">
                        <input type="number" id="currentRankExperience" v-model="formData.currentRankExperience"
                            required min="0" max="50" placeholder="Enter years in current rank"
                            :class="['form-input', { error: errors.currentRankExperience }]" />
                    </div>
                    <span v-if="errors.currentRankExperience" class="error-message">{{ errors.currentRankExperience }}</span>
                </div>

                <!-- Total Seafaring Experience -->
                <div class="form-group">
                    <label for="totalExperience">Total Years of Experience (as Seafarer)</label>
                    <div class="input-wrapper">
                        <input type="number" id="totalExperience" v-model="formData.totalExperience" required min="0"
                            max="50" placeholder="Enter total years as seafarer"
                            :class="['form-input', { error: errors.totalExperience }]" />
                    </div>
                    <span v-if="errors.totalExperience" class="error-message">{{ errors.totalExperience }}</span>
                </div>

                <!-- Contact Information -->
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <div class="input-wrapper">
                        <input type="email" id="email" v-model="formData.email" required placeholder="Enter your email"
                            :class="['form-input', { error: errors.email }]" />
                    </div>
                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <div class="input-wrapper">
                        <input type="tel" id="phone" v-model="formData.phone" required
                            placeholder="Enter your phone number" :class="['form-input', { error: errors.phone }]" />
                    </div>
                    <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
                </div>

                <!-- US Visa input with checkbox -->
                <div class="form-group">
                    <label class="visa-label">Is US Visa Holder?</label>
                    <div class="visa-checkbox-wrapper">
                        <label class="visa-checkbox">
                            <input type="checkbox" v-model="formData.isUSVisaHolder"
                                :class="{ error: errors.isUSVisaHolder }" />
                            <span>Yes, I hold a valid US Visa</span>
                        </label>
                    </div>
                    <span v-if="errors.isUSVisaHolder" class="error-message">{{ errors.isUSVisaHolder }}</span>
                </div>

                <!-- Password -->
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-wrapper">
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password"
                            required placeholder="Create a password"
                            :class="['form-input', { error: errors.password }]" />
                        <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                    <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
                </div>

                <!-- Terms and Conditions -->
                <div class="terms-checkbox">
                    <label class="remember-me">
                        <input type="checkbox" v-model="formData.acceptTerms" :class="{ error: errors.terms }" />
                        <span>I agree to the <router-link to="/terms" class="auth-link">Terms of Service</router-link>
                            and <router-link to="/privacy" class="auth-link">Privacy Policy</router-link></span>
                    </label>
                    <span v-if="errors.terms" class="error-message">{{ errors.terms }}</span>
                </div>

                <button type="submit" :class="['submit-btn', { loading: isLoading }]" :disabled="isLoading">
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                </button>
            </form>

            <div class="auth-footer">
                <p>Already have an account?
                    <router-link to="/auth/login" class="login-btn">Log In</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterComponent',
    data() {
        return {
            formData: {
                firstName: '',
                lastName: '',
                username: '',
                dateOfBirth: '',
                graduationYear: '',
                nationality: '',
                position: '',
                currentRankExperience: '',
                totalExperience: '',
                email: '',
                phone: '',
                isUSVisaHolder: false,
                password: '',
                acceptTerms: false
            },
            showPassword: false,
            isLoading: false,
            errors: {
                firstName: '',
                lastName: '',
                username: '',
                dateOfBirth: '',
                graduationYear: '',
                nationality: '',
                position: '',
                currentRankExperience: '',
                totalExperience: '',
                email: '',
                phone: '',
                isUSVisaHolder: '',
                password: '',
                terms: ''
            }
        }
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    },
    methods: {
        openDatePicker() {
            this.$refs.dateInput.showPicker();
        },

        validateForm() {
            let isValid = true;
            this.errors = {
                firstName: '',
                lastName: '',
                username: '',
                dateOfBirth: '',
                graduationYear: '',
                nationality: '',
                position: '',
                currentRankExperience: '',
                totalExperience: '',
                email: '',
                phone: '',
                isUSVisaHolder: '',
                password: '',
                terms: ''
            };

            // First Name validation
            if (!this.formData.firstName.trim()) {
                this.errors.firstName = 'First name is required';
                isValid = false;
            } else if (this.formData.firstName.length < 2) {
                this.errors.firstName = 'First name must be at least 2 characters';
                isValid = false;
            }

            // Last Name validation
            if (!this.formData.lastName.trim()) {
                this.errors.lastName = 'Last name is required';
                isValid = false;
            } else if (this.formData.lastName.length < 2) {
                this.errors.lastName = 'Last name must be at least 2 characters';
                isValid = false;
            }

            // Username validation
            if (!this.formData.username.trim()) {
                this.errors.username = 'Username is required';
                isValid = false;
            } else if (this.formData.username.length < 3) {
                this.errors.username = 'Username must be at least 3 characters';
                isValid = false;
            }

            // Date of Birth validation
            if (!this.formData.dateOfBirth) {
                this.errors.dateOfBirth = 'Date of birth is required';
                isValid = false;
            } else {
                const birthDate = new Date(this.formData.dateOfBirth);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (age < 18 || (age === 18 && monthDiff < 0)) {
                    this.errors.dateOfBirth = 'You must be at least 18 years old';
                    isValid = false;
                } else if (age > 100) {
                    this.errors.dateOfBirth = 'Please enter a valid date of birth';
                    isValid = false;
                }
            }

            // Graduation Year validation
            if (!this.formData.graduationYear) {
                this.errors.graduationYear = 'Graduation year is required';
                isValid = false;
            } else {
                const gradYear = parseInt(this.formData.graduationYear);
                const currentYear = this.currentYear;
                const minYear = currentYear - 60;

                if (isNaN(gradYear) || gradYear < minYear || gradYear > currentYear) {
                    this.errors.graduationYear = `Please enter a valid year between ${minYear} and ${currentYear}`;
                    isValid = false;
                }

                // Check if graduation year is consistent with date of birth
                if (this.formData.dateOfBirth) {
                    const birthYear = new Date(this.formData.dateOfBirth).getFullYear();
                    if (gradYear < birthYear + 18) {
                        this.errors.graduationYear = 'Graduation year should be at least 18 years after birth year';
                        isValid = false;
                    }
                }
            }

            // Nationality validation
            if (!this.formData.nationality.trim()) {
                this.errors.nationality = 'Nationality is required';
                isValid = false;
            }

            // Position/Rank validation
            if (!this.formData.position) {
                this.errors.position = 'Position/Rank is required';
                isValid = false;
            }

            // Current Rank Experience validation
            if (!this.formData.currentRankExperience) {
                this.errors.currentRankExperience = 'Years of experience in current rank is required';
                isValid = false;
            } else if (isNaN(this.formData.currentRankExperience) ||
                this.formData.currentRankExperience < 0 ||
                this.formData.currentRankExperience > 50) {
                this.errors.currentRankExperience = 'Please enter a valid number of years (0-50)';
                isValid = false;
            }

            // Total Experience validation
            if (!this.formData.totalExperience) {
                this.errors.totalExperience = 'Total years of experience is required';
                isValid = false;
            } else if (isNaN(this.formData.totalExperience) ||
                this.formData.totalExperience < 0 ||
                this.formData.totalExperience > 50) {
                this.errors.totalExperience = 'Please enter a valid number of years (0-50)';
                isValid = false;
            }

            // Compare experiences
            if (Number(this.formData.totalExperience) < Number(this.formData.currentRankExperience)) {
                this.errors.totalExperience = 'Total experience cannot be less than current rank experience';
                isValid = false;
            }

            // Email validation
            if (!this.formData.email) {
                this.errors.email = 'Email is required';
                isValid = false;
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)) {
                this.errors.email = 'Please enter a valid email address';
                isValid = false;
            }

            // Phone validation
            if (!this.formData.phone) {
                this.errors.phone = 'Phone number is required';
                isValid = false;
            } else if (!/^\+?[\d\s-]{8,}$/.test(this.formData.phone)) {
                this.errors.phone = 'Please enter a valid phone number';
                isValid = false;
            }

            // Password validation
            if (!this.formData.password) {
                this.errors.password = 'Password is required';
                isValid = false;
            } else if (this.formData.password.length < 8) {
                this.errors.password = 'Password must be at least 8 characters';
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(this.formData.password)) {
                this.errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
                isValid = false;
            }

            // Terms acceptance validation
            if (!this.formData.acceptTerms) {
                this.errors.terms = 'You must accept the Terms of Service and Privacy Policy';
                isValid = false;
            }

            return isValid;
        },

        async handleRegister() {
            if (!this.validateForm()) return;

            this.isLoading = true;
            try {
                // Format the data for API submission
                const registrationData = {
                    ...this.formData,
                    dateOfBirth: new Date(this.formData.dateOfBirth).toISOString(),
                    currentRankExperience: Number(this.formData.currentRankExperience),
                    totalExperience: Number(this.formData.totalExperience)
                };

                // Simulate API call - Replace with actual API endpoint
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Log the registration attempt (remove in production)
                console.log('Registration data:', registrationData);

                // Handle successful registration
                this.$router.push('/auth/login'); // Redirect to login page

            } catch (error) {
                console.error('Registration error:', error);
                // Handle registration error (show error message, etc.)
            } finally {
                this.isLoading = false;
            }
        },

        isValidDate(dateString) {
            const date = new Date(dateString);
            return date instanceof Date && !isNaN(date);
        },

        resetForm() {
            this.formData = {
                firstName: '',
                lastName: '',
                username: '',
                dateOfBirth: '',
                nationality: '',
                position: '',
                currentRankExperience: '',
                totalExperience: '',
                email: '',
                phone: '',
                isUSVisaHolder: false,
                password: '',
                acceptTerms: false
            };
            this.errors = {};
            this.isLoading = false;
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
    font-family: 'Poppins', sans-serif;
}

.auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    background-image: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 2rem;
}

.auth-container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    padding: 3rem;
    width: 75%;
    transition: transform 0.3s ease;
}

.auth-container:hover {
    transform: translateY(-4px);
}

.auth-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.auth-logo {
    width: 200px;
    height: 44px;
    object-fit: contain;
    margin-bottom: 2rem;
}

.auth-header h1 {
    color: #1a202c;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    letter-spacing: -0.5px;
}

.auth-header p {
    color: #64748b;
    font-size: 1.1rem;
    font-weight: 300;
}

.auth-form {
    margin-bottom: 2rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.form-group {
    margin-bottom: 1.75rem;
}

.form-group label {
    display: block;
    color: #334155;
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.form-input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background-color: white;
    color: #1a202c;
}

/* Custom styles for date input */
input[type="date"].form-input {
    cursor: pointer;
}

input[type="date"].form-input::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.form-input::placeholder {
    color: #94a3b8;
    opacity: 0.8;
}

.form-input:hover {
    border-color: #cbd5e1;
}

.form-input:focus {
    outline: none;
    border-color: #8cc63e;
    box-shadow: 0 0 0 4px rgba(140, 198, 62, 0.1);
}

.form-input.error {
    border-color: #ef4444;
    background-color: white;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: block;
    font-weight: 500;
}

.input-icon,
.toggle-password {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.toggle-password:hover {
    background-color: #f1f5f9;
    color: #1a202c;
}

.input-icon:hover,
.password-toggle:hover {
    color: #64748b;
    background-color: #f1f5f9;
}

.terms-checkbox {
    margin-bottom: 2rem;
}

.remember-me {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: #475569;
    font-size: 0.95rem;
    cursor: pointer;
    padding: 0.25rem 0;
}

.remember-me input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 4px;
    border: 2px solid #cbd5e1;
    cursor: pointer;
    margin-top: 0.2rem;
    transition: all 0.2s ease;
    appearance: none;
    background-color: white;
}

.remember-me input[type="checkbox"]:hover {
    border-color: #94a3b8;
}

.remember-me input[type="checkbox"]:checked {
    background-color: #8cc63e;
    border-color: #8cc63e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 75%;
}

.remember-me input[type="checkbox"].error {
    border-color: #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.submit-btn {
    width: 100%;
    padding: 1rem;
    background: #8cc63e;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover:not(:disabled) {
    background: #7ab52f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(140, 198, 62, 0.2);
}

.submit-btn:active:not(:disabled) {
    transform: translateY(0);
}

.submit-btn.loading {
    background: #a3d669;
    cursor: not-allowed;
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.auth-footer {
    text-align: center;
    color: #64748b;
    font-size: 1rem;
    margin-top: 2rem;
}

.auth-link {
    color: #8cc63e;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
}

.auth-link:hover {
    color: #7ab52f;
    text-decoration: underline;
}

.visa-checkbox-wrapper {
    margin-top: 0.5rem;
}

.visa-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #475569;
    font-size: 0.95rem;
    cursor: pointer;
    padding: 0.5rem;
    background: #f8fafc;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.visa-checkbox:hover {
    background: #f1f5f9;
}

.visa-checkbox input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 4px;
    border: 2px solid #cbd5e1;
    cursor: pointer;
    transition: all 0.2s ease;
    appearance: none;
    background-color: white;
}

.visa-checkbox input[type="checkbox"]:checked {
    background-color: #8cc63e;
    border-color: #8cc63e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 75%;
}

.visa-label {
    font-weight: 500;
    color: #334155;
    margin-bottom: 0.5rem;
    display: block;
}

@media (max-width: 768px) {
    .auth-container {
        width: 100%;
        max-width: 500px;
    }
}

@media (max-width: 640px) {
    .auth-page {
        padding: 1rem;
    }

    .auth-container {
        padding: 2rem 1.5rem;
        margin: 1rem;
    }

    .auth-header h1 {
        font-size: 1.75rem;
    }

    .auth-header p {
        font-size: 1rem;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .submit-btn {
        padding: 0.875rem;
        font-size: 1rem;
    }
}
</style>