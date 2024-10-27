<template>
  <header :class="['site-header', { 'header-scrolled': isScrolled }]">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/">
          <img src="@/assets/images/kabaroapp-header.png" alt="Kabaro App Logo" class="logo" />
        </router-link>
      </div>

      <!-- Hamburger Menu Button -->
      <button class="hamburger-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" v-if="isMobileMenuOpen" @click="closeMobileMenu"></div>

      <!-- Navigation Links (Desktop & Mobile) -->
      <div :class="['nav-container', { 'mobile-menu-active': isMobileMenuOpen }]">
        <ul class="nav-links">
          <li><router-link to="/" class="nav-link" @click="closeMobileMenu">Home</router-link></li>
          <li><router-link to="/jobs/jobboard" class="nav-link" @click="closeMobileMenu">Jobs</router-link></li>
          <li class="dropdown-container" 
              @click="toggleDropdown"
              @mouseenter="!isMobile && (isDropdownOpen = true)"
              @mouseleave="!isMobile && (isDropdownOpen = false)">
            <a href="#" class="nav-link">Community</a>
            <ul class="dropdown-menu" v-show="isDropdownOpen || (isMobileMenuOpen && isMobileDropdownOpen)">
              <li><router-link to="/community/community" class="dropdown-item" @click="closeMobileMenu">Community Posts</router-link></li>
              <li><router-link to="/community/userfeed" class="dropdown-item" @click="closeMobileMenu">User Feed</router-link></li>
            </ul>
          </li>
          <li><router-link to="/maritimenews/maritimenews" class="nav-link" @click="closeMobileMenu">Maritime News</router-link></li>
          <li><router-link to="/about/aboutus" class="nav-link" @click="closeMobileMenu">About Us</router-link></li>
        </ul>

        <div class="nav-actions">
          <router-link to="/auth/login" class="login-btn" @click="closeMobileMenu">Log In</router-link>
          <router-link to="/auth/register" class="signup-btn" @click="closeMobileMenu">Sign Up</router-link>
        </div>
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
      isDropdownOpen: false,
      isMobileMenuOpen: false,
      isMobileDropdownOpen: false,
      isMobile: false,
      lastScrollPosition: 0,
      scrollThreshold: 80
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.checkMobile);
    this.checkMobile();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      this.isScrolled = currentScrollPosition > this.scrollThreshold;
      this.lastScrollPosition = currentScrollPosition;
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 900;
      if (!this.isMobile) {
        this.closeMobileMenu();
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (!this.isMobileMenuOpen) {
        this.isMobileDropdownOpen = false;
      }
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
      this.isMobileDropdownOpen = false;
      document.body.style.overflow = '';
    },
    toggleDropdown() {
      if (this.isMobile) {
        this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
      }
    }
  }
};
</script>

<style scoped>
/* Base Header Styles */
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

/* Navbar Styles */
.navbar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

/* Logo Styles */
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

/* Navigation Links */
.nav-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.header-scrolled .nav-link {
  font-size: 0.95rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #8cc63e;
}

/* Dropdown Styles */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 180px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  list-style: none;
  opacity: 1;
  transition: all 0.2s ease;
  z-index: 1001;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #2c3e50;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(140, 198, 62, 0.1);
  color: #8cc63e;
}

/* Action Buttons */
.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.login-btn,
.signup-btn {
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

/* Hamburger Button Styles */
.hamburger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
  position: relative;
}

.hamburger-line {
  display: block;
  width: 25px;
  height: 2px;
  background-color: #2c3e50;
  margin: 5px 0;
  transition: all 0.3s ease;
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

/* Responsive Styles */
@media (max-width: 900px) {
  .site-header {
    padding: 1rem;
  }

  .header-scrolled {
    padding: 0.8rem 1rem;
  }

  .hamburger-btn {
    display: block;
  }

  .mobile-menu-overlay {
    display: block;
  }

  .nav-container {
    position: fixed;
    top: 0;
    right: -300px;
    width: 280px;
    height: 100vh;
    background-color: white;
    padding: 80px 20px 20px;
    transition: right 0.3s ease;
    z-index: 999;
    overflow-y: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  .nav-container.mobile-menu-active {
    right: 0;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }

  .nav-links {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }

  .nav-link {
    display: block;
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 1.1rem;
  }

  .dropdown-container {
    width: 100%;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    padding-left: 20px;
    margin-top: 0;
    border-radius: 0;
    width: 100%;
    background-color: rgba(140, 198, 62, 0.05);
  }

  .dropdown-item {
    padding: 12px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .nav-actions {
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    width: 100%;
  }

  .login-btn,
  .signup-btn {
    width: 100%;
    text-align: center;
    padding: 0.8rem 1rem;
  }

  /* Hamburger Animation */
  .mobile-menu-active ~ .hamburger-btn .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-menu-active ~ .hamburger-btn .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-active ~ .hamburger-btn .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }
}

/* Additional Mobile Optimizations */
@media (max-width: 640px) {
  .site-header {
    padding: 0.8rem;
  }

  .header-scrolled {
    padding: 0.6rem;
  }

  .logo {
    width: 140px;
    height: 35px;
  }

  .header-scrolled .logo {
    width: 120px;
    height: 30px;
  }

  .nav-container {
    width: 100%;
    max-width: 300px;
  }

  .hamburger-btn {
    padding: 8px;
  }

  .hamburger-line {
    width: 22px;
  }
}

/* Fix for iOS Safari 100vh issue */
@supports (-webkit-touch-callout: none) {
  .nav-container {
    height: -webkit-fill-available;
  }
}
</style>