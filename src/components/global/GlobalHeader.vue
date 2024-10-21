<template>
    <header :class="['site-header', { 'header-scrolled': isScrolled }]">
      <nav class="navbar">
        <div class="navbar-brand">
          <router-link to="/">
            <img src="@/assets/images/kabaroapp-header.png" alt="Kabaro App Logo" class="logo" />
          </router-link>
        </div>
  
        <ul class="nav-links">
          <li><router-link to="/" class="nav-link">Home</router-link></li>
          <li><router-link to="/jobs" class="nav-link">Jobs</router-link></li>
          <li><router-link to="/news" class="nav-link">Maritime News</router-link></li>
          <li><router-link to="/contact" class="nav-link">Contact</router-link></li>
        </ul>
  
        <div class="nav-actions">
          <router-link to="/login" class="login-btn">Log In</router-link>
          <router-link to="/signup" class="signup-btn">Sign Up</router-link>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: "GlobalHeader",
    data() {
      return {
        isScrolled: false,
        lastScrollPosition: 0,
        scrollThreshold: 80
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        const currentScrollPosition = window.scrollY;
        this.isScrolled = currentScrollPosition > this.scrollThreshold;
        this.lastScrollPosition = currentScrollPosition;
      }
    }
  };
  </script>
  
  <style scoped>
  .site-header {
    background-color: rgba(255, 255, 255, 0.98);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    padding: 1.2rem 2rem;
  }
  
  .header-scrolled {
    padding: 0.6rem 2rem;
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .navbar {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    width: 180px;
    height: 40px;
    object-fit: contain;
    transition: all 0.3s ease;
  }
  
  .header-scrolled .logo {
    width: 150px;
    height: 35px;
  }
  
  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    color: #2c3e50;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem;
    transition: all 0.3s ease;
  }
  
  .header-scrolled .nav-link {
    font-size: 0.95rem;
  }
  
  .nav-link:hover, 
  .nav-link.router-link-active {
    color: #8cc63e;
  }
  
  .nav-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .login-btn, .signup-btn {
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .header-scrolled .login-btn,
  .header-scrolled .signup-btn {
    padding: 0.4rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .login-btn {
    background: transparent;
    border: 1px solid #8cc63e;
    color: #8cc63e;
  }
  
  .signup-btn {
    background: #8cc63e;
    border: 1px solid #8cc63e;
    color: white;
  }
  
  .login-btn:hover {
    background: rgba(140, 198, 62, 0.1);
  }
  
  .signup-btn:hover {
    background: #7ab52f;
    border-color: #7ab52f;
  }
  
  /* Add responsive design for smaller screens */
  @media (max-width: 768px) {
    .site-header {
      padding: 1rem;
    }
    
    .header-scrolled {
      padding: 0.5rem 1rem;
    }
    
    .nav-links {
      gap: 1.5rem;
    }
    
    .nav-link {
      font-size: 0.9rem;
    }
    
    .login-btn, .signup-btn {
      padding: 0.4rem 1rem;
      font-size: 0.85rem;
    }
  }
  
  /* Add styles for very small screens - you might want to add a mobile menu button here */
  @media (max-width: 640px) {
    .nav-links {
      display: none;
    }
    
    .logo {
      width: 140px;
    }
    
    .header-scrolled .logo {
      width: 120px;
    }
  }
  </style>