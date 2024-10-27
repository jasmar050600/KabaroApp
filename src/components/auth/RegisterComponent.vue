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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.auth-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  background-image: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: min(2rem, 5vw);
}

.auth-container {
  background: white;
  width: min(90%, 600px);
  min-width: 280px;
  margin: 1rem;
  padding: min(2rem, 5vw);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.auth-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.auth-logo {
  width: min(160px, 80%);
  height: auto;
  margin-bottom: 1.25rem;
}

.auth-header h1 {
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.auth-header p {
  font-size: clamp(0.875rem, 3vw, 1rem);
  color: #64748b;
  padding: 0 0.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.375rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  height: 2.75rem;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 0.875rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #8cc63e;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(140, 198, 62, 0.1);
}

.form-input.error {
  border-color: #ef4444;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
}

.terms-checkbox {
  margin-bottom: 1.25rem;
}

.remember-me {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
}

.submit-btn {
  width: 100%;
  height: 2.75rem;
  background: #8cc63e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #7ab52f;
}

.submit-btn.loading {
  background: #a3d669;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  color: #64748b;
}

.auth-link {
  color: #8cc63e;
  text-decoration: none;
  font-weight: 500;
}

/* Responsive styles */
@media (min-width: 640px) {
  .auth-container {
    padding: 2rem;
  }

  .form-input {
    font-size: 1rem;
  }

  .remember-me {
    font-size: 1rem;
  }
}

/* Custom styles for select inputs */
select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.763L10.825 4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* Styles for date input */
input[type="date"].form-input {
  padding-right: 1rem;
}

input[type="date"].form-input::-webkit-calendar-picker-indicator {
  opacity: 0.6;
  cursor: pointer;
}

/* Visa checkbox specific styles */
.visa-checkbox-wrapper {
  margin-top: 0.5rem;
}

.visa-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.visa-checkbox:hover {
  background: #f1f5f9;
}
</style>