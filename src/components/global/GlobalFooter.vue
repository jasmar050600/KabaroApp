<template>
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>About Kabaro App</h3>
          <p>Your trusted platform for maritime careers and industry news.</p>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/jobs">Find Jobs</router-link></li>
            <li><router-link to="/news">Maritime News</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Legal</h3>
          <ul class="footer-links">
            <li><router-link to="/privacy">Privacy Policy</router-link></li>
            <li><router-link to="/terms">Terms of Service</router-link></li>
            <li><router-link to="/cookies">Cookie Policy</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Connect With Us</h3>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Kabaro App. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "GlobalFooter"
  };
  </script>
  
  <style scoped>
  .site-footer {
    background-color: #1e2124;
    color: #fff;
    padding: 4rem 2rem 2rem;
    position: relative;
    z-index: 10;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin-bottom: 3rem;
  }
  
  .footer-section h3 {
    color: #8cc63e;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  .footer-section p {
    color: #b0b0b0;
    line-height: 1.6;
    font-size: 0.95rem;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.8rem;
  }
  
  .footer-links a {
    color: #b0b0b0;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.95rem;
  }
  
  .footer-links a:hover {
    color: #8cc63e;
  }
  
  .social-links {
    display: flex;
    gap: 1.2rem;
  }
  
  .social-links a {
    color: #b0b0b0;
    font-size: 1.3rem;
    transition: color 0.3s ease;
  }
  
  .social-links a:hover {
    color: #8cc63e;
  }
  
  .footer-bottom {
    text-align: center;
    border-top: 1px solid #333;
    padding-top: 2rem;
    color: #b0b0b0;
    font-size: 0.9rem;
  }
  </style>