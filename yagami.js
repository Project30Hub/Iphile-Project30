(function () {
  /* ─── STYLES ─── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    #yagami-btn {
      position: fixed;
      bottom: 28px;
      right: 24px;
      z-index: 99999;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0a84ff, #bf5af2);
      border: none;
      cursor: pointer;
      box-shadow: 0 0 0 0 rgba(10,132,255,0.5), 0 8px 32px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: yg-pulse 3s ease-in-out infinite;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    #yagami-btn:hover { transform: scale(1.12); }
    #yagami-btn svg { width: 26px; height: 26px; fill: white; }
    @keyframes yg-pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(10,132,255,0.45), 0 8px 32px rgba(0,0,0,0.5); }
      50%      { box-shadow: 0 0 0 10px rgba(10,132,255,0), 0 8px 32px rgba(0,0,0,0.5); }
    }

    #yagami-panel {
      position: fixed;
      bottom: 96px;
      right: 24px;
      z-index: 99999;
      width: 340px;
      max-height: 520px;
      background: rgba(10,10,18,0.92);
      backdrop-filter: blur(40px) saturate(180%);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08);
      opacity: 0;
      transform: translateY(20px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.35s cubic-bezier(0.34,1.2,0.64,1), transform 0.35s cubic-bezier(0.34,1.2,0.64,1);
    }
    #yagami-panel.yg-open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* Header */
    .yg-header {
      padding: 16px 18px 14px;
      background: linear-gradient(135deg, rgba(10,132,255,0.18), rgba(191,90,242,0.12));
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .yg-avatar {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0a84ff, #bf5af2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
      box-shadow: 0 4px 16px rgba(10,132,255,0.4);
    }
    .yg-info { flex: 1; }
    .yg-name {
      font-family: 'Syne', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.3px;
    }
    .yg-status {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      color: #30d158;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 1px;
    }
    .yg-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #30d158;
      animation: yg-blink 1.5s ease-in-out infinite;
    }
    @keyframes yg-blink {
      0%,100% { opacity:1; } 50% { opacity:0.4; }
    }
    .yg-close {
      background: rgba(255,255,255,0.08);
      border: none;
      border-radius: 50%;
      width: 28px; height: 28px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: rgba(235,235,245,0.6);
      font-size: 16px;
      transition: background 0.2s;
    }
    .yg-close:hover { background: rgba(255,255,255,0.15); color: white; }

    /* Messages */
    .yg-msgs {
      flex: 1;
      overflow-y: auto;
      padding: 14px 14px 6px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: none;
    }
    .yg-msgs::-webkit-scrollbar { display: none; }

    .yg-bubble {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 18px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13.5px;
      line-height: 1.55;
      animation: yg-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    @keyframes yg-pop {
      from { opacity:0; transform: scale(0.88) translateY(6px); }
      to   { opacity:1; transform: scale(1) translateY(0); }
    }
    .yg-bot {
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(235,235,245,0.9);
      align-self: flex-start;
      border-bottom-left-radius: 6px;
    }
    .yg-user {
      background: linear-gradient(135deg, #0a84ff, #0066cc);
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 6px;
    }

    /* Typing */
    .yg-typing { display: flex; gap: 5px; padding: 10px 14px; }
    .yg-typing span {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(235,235,245,0.4);
      animation: yg-bounce 1.2s ease-in-out infinite;
    }
    .yg-typing span:nth-child(2) { animation-delay: 0.2s; }
    .yg-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes yg-bounce {
      0%,60%,100% { transform: translateY(0); }
      30%          { transform: translateY(-6px); background: rgba(10,132,255,0.8); }
    }

    /* Input */
    .yg-footer {
      padding: 10px 12px 12px;
      border-top: 1px solid rgba(255,255,255,0.07);
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }
    .yg-input {
      flex: 1;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      color: white;
      font-family: 'DM Sans', sans-serif;
      font-size: 13.5px;
      padding: 9px 13px;
      outline: none;
      resize: none;
      min-height: 38px;
      max-height: 100px;
      line-height: 1.4;
      transition: border-color 0.2s;
    }
    .yg-input:focus { border-color: rgba(10,132,255,0.5); }
    .yg-input::placeholder { color: rgba(235,235,245,0.25); }
    .yg-send {
      width: 38px; height: 38px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0a84ff, #006ee6);
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: transform 0.2s, opacity 0.2s;
      box-shadow: 0 4px 14px rgba(10,132,255,0.4);
    }
    .yg-send:hover { transform: scale(1.08); }
    .yg-send:active { transform: scale(0.94); }
    .yg-send svg { width: 16px; height: 16px; fill: white; }
    .yg-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    @media (max-width: 420px) {
      #yagami-panel { width: calc(100vw - 32px); right: 16px; }
      #yagami-btn { right: 16px; bottom: 20px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── HTML ─── */
  const panel = document.createElement('div');
  panel.id = 'yagami-panel';
  panel.innerHTML = `
    <div class="yg-header">
      <div class="yg-avatar">🤖</div>
      <div class="yg-info">
        <div class="yg-name">Yagami</div>
        <div class="yg-status"><span class="yg-dot"></span>Online · Ask me anything</div>
      </div>
      <button class="yg-close" id="yg-close-btn">✕</button>
    </div>
    <div class="yg-msgs" id="yg-msgs"></div>
    <div class="yg-footer">
      <textarea class="yg-input" id="yg-input" placeholder="Ask Yagami…" rows="1"></textarea>
      <button class="yg-send" id="yg-send-btn">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  `;

  const btn = document.createElement('button');
  btn.id = 'yagami-btn';
  btn.title = 'Chat with Yagami';
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;

  document.body.appendChild(panel);
  document.body.appendChild(btn);
  btn.style.opacity = '0';
  btn.style.transform = 'scale(0)';
  btn.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
  setTimeout(function(){
    btn.style.opacity = '1';
    btn.style.transform = 'scale(1)';
  }, 3000);

  /* ─── STATE ─── */
  const SYSTEM = `You are Yagami, a sharp and friendly AI assistant on Iphile Akho Selana's developer portfolio. Iphile is a Junior Full-Stack Developer based in Johannesburg, South Africa, specialising in HTML/CSS/JS, React, Node.js, Supabase, and AI integration (Claude API). He is currently completing an NQF Level 4 Full Stack Development qualification at ITvarsity/FNB App Academy. His projects include MadaKop (cannabis club platform), an iPhone-style dev portfolio, and various AI-powered web apps. Keep answers concise, warm, and technically confident. If asked about hiring or collaboration, encourage the visitor to use the Contact app on the portfolio. Speak in first person as Yagami.`;

  let history = [];
  let thinking = false;

  const msgsEl = document.getElementById('yg-msgs');
  const inputEl = document.getElementById('yg-input');
  const sendEl = document.getElementById('yg-send-btn');

  /* ─── HELPERS ─── */
  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = `yg-bubble ${role === 'user' ? 'yg-user' : 'yg-bot'}`;
    div.textContent = text;
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'yg-bubble yg-bot yg-typing';
    div.id = 'yg-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('yg-typing');
    if (t) t.remove();
  }

  /* ─── SEND ─── */
  async function send() {
    const text = inputEl.value.trim();
    if (!text || thinking) return;

    addMsg(text, 'user');
    history.push({ role: 'user', content: text });
    inputEl.value = '';
    inputEl.style.height = 'auto';
    thinking = true;
    sendEl.disabled = true;
    showTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: history
        })
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || 'Sorry, I hit a snag. Try again!';
      hideTyping();
      addMsg(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch {
      hideTyping();
      addMsg('Connection error — please try again.', 'bot');
    }

    thinking = false;
    sendEl.disabled = false;
  }

  /* ─── EVENTS ─── */
  btn.addEventListener('click', () => {
    panel.classList.toggle('yg-open');
    if (panel.classList.contains('yg-open') && msgsEl.children.length === 0) {
      addMsg("Hey 👋 I'm Yagami, Iphile's AI assistant. Ask me about his skills, projects, or how to hire him!", 'bot');
    }
    setTimeout(() => inputEl.focus(), 350);
  });

  document.getElementById('yg-close-btn').addEventListener('click', () => {
    panel.classList.remove('yg-open');
  });

  sendEl.addEventListener('click', send);

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
  });
})();
