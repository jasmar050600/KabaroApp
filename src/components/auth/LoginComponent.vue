<template>
    <div class="auth-container">
      <div class="auth-header">
        <router-link to="/" class="logo-link">
          <img src="@/assets/images/kabaroapp-header.png" alt="Kabaro App Logo" class="auth-logo" />
        </router-link>
        <h1>Welcome Back</h1>
        <p>Sign in to access your maritime career opportunities</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-wrapper">
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required 
              placeholder="Enter your email"
              :class="['form-input', { error: errors.email }]"
            />
            <span class="input-icon">📧</span>
          </div>
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <input 
              :type="showPassword ? 'text' : 'password'"
              id="password" 
              v-model="password" 
              required 
              placeholder="Enter your password"
              :class="['form-input', { error: errors.password }]"
            />
            <button 
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-actions">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span>Remember me</span>
          </label>
          <router-link to="/forgot-password" class="forgot-password">
            Forgot Password?
          </router-link>
        </div>

        <button 
          type="submit" 
          :class="['submit-btn', { loading: isLoading }]"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Signing in...' : 'Log In' }}
        </button>
      </form>

      <div class="auth-footer">
        <p>Don't have an account? 
          <router-link to="/auth/Register" class="auth-link">Register Now</router-link>
        </p>
      </div>
    </div>
</template>

<script>
// Script remains the same as before
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        email: '',
        password: ''
      };

      if (!this.email) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.errors.email = 'Please enter a valid email address';
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = 'Password is required';
        isValid = false;
      }

      return isValid;
    },
    async handleLogin() {
      if (!this.validateForm()) return;

      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Login attempted:', {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe
        });
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        this.isLoading = false;
      }
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
}

.auth-container {
  background: white;
  width: min(90%, 440px);
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

.input-icon,
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

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
}

.forgot-password {
  color: #8cc63e;
  font-size: 0.875rem;
  text-decoration: none;
  font-weight: 500;
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

@media (min-width: 640px) {
  .auth-container {
    padding: 2rem;
  }

  .form-actions {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .form-input {
    font-size: 1rem;
  }
}
</style>