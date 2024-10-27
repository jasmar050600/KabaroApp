<template>
    <div class="auth-page">
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
    </div>
  </template>
  
  <script>
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
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          console.log('Login attempted:', {
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe
          });
          
          // Handle successful login here
          
        } catch (error) {
          console.error('Login error:', error);
          // Handle error here
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
    width: 100%;
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
  }
  
  .form-input {
    width: 100%;
    padding: 0.875rem 1rem;
    padding-right: 2.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #f8fafc;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #8cc63e;
    background-color: white;
    box-shadow: 0 0 0 4px rgba(140, 198, 62, 0.1);
  }
  
  .form-input.error {
    border-color: #ef4444;
    background-color: #fef2f2;
  }
  
  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: block;
  }
  
  .input-icon,
  .password-toggle {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.95rem;
    cursor: pointer;
  }
  
  .remember-me input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 4px;
    border: 2px solid #e2e8f0;
    cursor: pointer;
  }
  
  .forgot-password {
    color: #8cc63e;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .forgot-password:hover {
    color: #7ab52f;
    text-decoration: underline;
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
  
  .auth-footer {
    text-align: center;
    color: #64748b;
    font-size: 1rem;
  }
  
  .auth-link {
    color: #8cc63e;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .auth-link:hover {
    color: #7ab52f;
    text-decoration: underline;
  }
  
  @media (max-width: 640px) {
    .auth-container {
      padding: 2rem 1.5rem;
      margin: 1rem;
    }
  
    .auth-header h1 {
      font-size: 1.75rem;
    }
  
    .form-actions {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
  </style>