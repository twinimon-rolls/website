document.addEventListener("DOMContentLoaded", () => {
  const fontPreconnect1 = document.createElement("link");
  fontPreconnect1.rel = "preconnect";
  fontPreconnect1.href = "https://fonts.googleapis.com";

  const fontPreconnect2 = document.createElement("link");
  fontPreconnect2.rel = "preconnect";
  fontPreconnect2.href = "https://fonts.gstatic.com";
  fontPreconnect2.crossOrigin = "true";

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap";

  document.head.append(fontPreconnect1, fontPreconnect2, fontLink);

  const style = document.createElement("style");
  style.textContent = `
    :root {
      --bg-dark: #0a0a0f;
      --bg-card: rgba(25, 25, 35, 0.6);
      --discord-blue: #5865F2;
      --discord-hover: #4752C4;
      --accent-pink: #eb459e;
      --accent-purple: #8a2be2;
      --text-main: #ffffff;
      --text-muted: #a0a0b8;
      --nav-height: 80px;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      overflow-x: hidden;
      line-height: 1.6;
      scroll-behavior: smooth;
      padding-top: var(--nav-height);
    }

    body::-webkit-scrollbar {
      width: 13px;
      background: var(--bg-dark);
    }
    body::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, var(--discord-blue) 0%, var(--accent-pink) 80%);
      border-radius: 12px;
      border: 3px solid var(--bg-dark);
      min-height: 60px;
    }
    body::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, var(--discord-hover) 0%, var(--accent-pink) 90%);
    }
    body::-webkit-scrollbar-track {
      background: var(--bg-dark);
      border-radius: 12px;
    }
    html {
      scrollbar-color: var(--accent-pink) var(--bg-dark);
      scrollbar-width: thin;
    }

    .glow-orb {
      position: fixed;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(120px);
      z-index: -1;
      opacity: 0.35;
      animation: float 20s infinite alternate ease-in-out;
      pointer-events: none;
    }
    .glow-1 {
      top: -100px;
      left: -100px;
      background: white;
    }
    .glow-2 {
      bottom: -150px;
      right: -100px;
      background: var(--accent-pink);
      animation-delay: -10s;
    }
    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(150px, 100px) scale(1.2); }
    }

    nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--nav-height);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5%;
      z-index: 1000;
      transition: all 0.3s ease;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      background: transparent;
      /* Make fully transparent initially */
    }
    nav.scrolled {
      background: rgba(10, 10, 15, 0.85);
      backdrop-filter: blur(16px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #fff 0%, var(--text-muted) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1002;
    }
    .logo span {
      color: var(--accent-pink);
      -webkit-text-fill-color: var(--accent-pink);
    }
    .server-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      margin-right: 14px;
      box-shadow: 0 2px 8px 0 rgba(88,101,242,0.25);
      border: 2px solid var(--discord-blue);
      object-fit: cover;
      background: #fff;
    }
    .nav-links {
      display: flex;
      gap: 30px;
      list-style: none;
      align-items: center;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }
    .nav-links a:hover {
      color: var(--text-main);
    }
    .btn {
      padding: 12px 28px;
      border-radius: 50px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      border: none;
      font-size: 0.95rem;
    }
    .btn-discord {
      background-color: var(--discord-blue);
      color: white;
      box-shadow: 0 8px 25px rgba(88, 101, 242, 0.4);
    }
    .btn-discord:hover {
      background-color: var(--discord-hover);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 30px rgba(88, 101, 242, 0.6);
    }
    .btn-outline {
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
    }
    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      cursor: pointer;
      z-index: 1002;
    }
    .hamburger span {
      width: 100%;
      height: 3px;
      background-color: white;
      border-radius: 3px;
      transition: all 0.3s ease-in-out;
    }
    .hamburger.active span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }

    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(10, 10, 15, 0.95);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      z-index: 1001;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 40px;
      opacity: 0;
      pointer-events: none;
      transform: translateY(-20px);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mobile-menu.active {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0);
    }
    .mobile-close {
      position: absolute;
      top: 28px;
      right: 32px;
      font-size: 2.2rem;
      font-weight: 700;
      color: #fff;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 12px;
      z-index: 1100;
      line-height: 1;
      transition: color 0.15s;
    }
    .mobile-close:hover,
    .mobile-close:focus {
      color: var(--accent-pink);
      outline: none;
    }
    .mobile-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
    .mobile-links a {
      color: var(--text-main);
      text-decoration: none;
      font-size: 1.8rem;
      font-weight: 700;
      transition: color 0.2s ease;
    }
    .mobile-links a:hover {
      color: var(--accent-pink);
    }
    .mobile-menu .btn-discord {
      font-size: 1.1rem;
      padding: 16px 36px;
    }

    footer {
      text-align: center;
      padding: 50px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-top: auto;
    }

    @media (max-width: 768px) {
      .nav-links, 
      nav .btn-discord {
        display: none;
      }
      .hamburger {
        display: flex;
      }
      .server-icon {
        width: 36px;
        height: 36px;
        margin-right: 8px;
        border-radius: 8px;
      }
    }
  `;
  document.head.appendChild(style);

  const glow1 = document.createElement("div");
  glow1.className = "glow-orb glow-1";
  const glow2 = document.createElement("div");
  glow2.className = "glow-orb glow-2";
  document.body.prepend(glow2);
  document.body.prepend(glow1);

  const navContainer = document.createElement("div");
  navContainer.innerHTML = `
    <nav id="navbar">
      <img src="assets/favicon.png" alt="Discord Server Icon" class="server-icon" />
      <a href="index.html" class="logo">TWINIMON <span>ROLLS</span></a>
      
      <ul class="nav-links">
        <li><a href="index.html#about">About Us</a></li>
        <li><a href="index.html#features">Features</a></li>
        <li><a href="static-stats.html">Static Stats</a></li>
        <li><a href="card-central/dashboard.html">Card Central</a></li>
        <li><a href="index.html#community">Community</a></li>
      </ul>
      
      <a href="landing-page.html" class="btn btn-discord">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Discord
      </a>

      <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>

    <div class="mobile-menu" id="mobile-menu">
      <button class="mobile-close" id="mobile-close" aria-label="Close Menu">&times;</button>
      <ul class="mobile-links">
        <li><a href="index.html#about" class="mobile-link">About Us</a></li>
        <li><a href="index.html#features" class="mobile-link">Features</a></li>
        <li><a href="static-stats.html" class="mobile-link">Static Stats</a></li>
        <li><a href="card-central/dashboard.html" class="mobile-link">Card Central</a></li>
        <li><a href="index.html#community" class="mobile-link">Community</a></li>
      </ul>
      <a href="landing-page.html" class="btn btn-discord">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Discord
      </a>
    </div>
  `;
  
  while (navContainer.firstChild) {
    document.body.prepend(navContainer.lastChild);
  }

  const footer = document.createElement("footer");
  footer.innerHTML = `<p>&copy; 2026 Twinimon Rolls. All rights reserved. Not affiliated with Discord Inc.</p>`;
  document.body.appendChild(footer);

  const navbar = document.getElementById("navbar");
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  updateNavbar();
  window.addEventListener("scroll", updateNavbar);

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const mobileClose = document.getElementById("mobile-close");

  function toggleMenu() {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
  }

  if (hamburger) hamburger.addEventListener("click", toggleMenu);
  if (mobileClose) mobileClose.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) toggleMenu();
    });
  });
});