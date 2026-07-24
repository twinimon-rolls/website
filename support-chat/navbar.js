document.addEventListener('DOMContentLoaded', () => {
  const navbarStyle = `
  .app-layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #111;
    overflow: hidden;
  }

  .sidebar {
    width: 280px;
    min-width: 280px;
    padding: 24px 18px 18px;
    background: #111;
    border-right: 1px solid #181818;
    display: flex;
    flex-direction: column;
    gap: 18px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    z-index: 15;
    transform: translateX(0);
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.35);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .sidebar-title {
    font-size: 0.97rem;
    color: #d1d5db;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .sidebar-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sidebar-btn {
    width: 100%;
    padding: 12px 14px;
    background: #171717;
    border: 1px solid #1f1f1f;
    border-radius: 10px;
    color: #e5e7eb;
    text-align: left;
    font-size: 0.96rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .sidebar-btn:hover,
  .sidebar-btn:focus {
    background: #1f1f1f;
    border-color: #2c2c2c;
    color: #fff;
    outline: none;
  }

  .sidebar-link {
    text-decoration: none;
    color: inherit;
    border-bottom: none;
  }

  .sidebar-btn.sidebar-link:hover,
  .sidebar-btn.sidebar-link:focus {
    color: #fff;
    outline: none;
  }

  .sidebar-toggle {
    display: none;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1px solid #202020;
    background: #111;
    color: #d1d5db;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .sidebar-toggle:hover,
  .sidebar-toggle:focus {
    background: #181818;
    border-color: #2c2c2c;
    outline: none;
  }

  .sidebar-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sidebar-section h2 {
    font-size: 0.95rem;
    color: #aaa;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .sidebar-section p {
    color: #bbb;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .chat-header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 14;
  }

  .sidebar-overlay.active {
    display: block;
  }

  @media (max-width: 960px) {
    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      transform: translateX(-100%);
      width: 260px;
      min-width: auto;
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .sidebar-toggle {
      display: inline-flex;
    }

    .chat-container {
      width: 100%;
    }

    .chat-header {
      padding: 18px 18px;
    }

    .chat-body {
      padding: 24px 18px;
    }

    .chat-footer {
      padding: 18px 18px;
    }
  }

  @media (max-width: 640px) {
    .chat-header {
      padding: 14px 16px;
    }

    .chat-body {
      padding: 18px 14px;
    }

    .chat-footer {
      padding: 14px 14px;
    }

    .sidebar {
      width: 100%;
      max-width: 320px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = navbarStyle;
  document.head.appendChild(styleEl);

  const appLayout = document.querySelector('.app-layout');
  if (!appLayout) return;

  const navbarHtml = `
    <div class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-title">Twinimon Support</div>
        <button class="sidebar-toggle" id="sidebar-close" aria-label="Close menu">×</button>
      </div>
      <div class="sidebar-actions">
        <button class="sidebar-btn" id="restart-chat-btn">Restart Chat</button>
        <a href="changelog.txt" class="sidebar-btn sidebar-link">Changelog</a>
        <a href="../index.html" class="sidebar-btn sidebar-link">Back to Home</a>
      </div>
      <div class="sidebar-section">
        <h2>Information</h2>
        <p>Ver1.2.1</p>
      </div>
    </div>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `;

  appLayout.insertAdjacentHTML('afterbegin', navbarHtml);

  const sidebar = document.getElementById('sidebar');
  const sidebarOpen = document.getElementById('sidebar-open');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const restartChatBtn = document.getElementById('restart-chat-btn');

  function resetChat() {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;
    chatBody.innerHTML = `
      <div class="message-wrapper bot">
        <div class="sender-label">Twinimon Support</div>
        <div class="message bot-message">
          Hello. Our New Chat Begins!
        </div>
      </div>
    `;
  }

  sidebarOpen?.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
  });

  sidebarClose?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  });

  sidebarOverlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  });

  restartChatBtn?.addEventListener('click', () => {
    resetChat();
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  });
});
