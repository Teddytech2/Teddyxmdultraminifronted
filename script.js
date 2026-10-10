// =====================================================
// TEDDY-XMD ULTRA — EDIT YOUR LINKS HERE
// =====================================================

const CONFIG = {
  // Server 1–5 currently all use your supplied Heroku server.
  // Replace individual URLs whenever you have different servers.
  servers: [
    "https://teddytech-374dcd019c6d.herokuapp.com/",
    "https://teddytech-374dcd019c6d.herokuapp.com/",
    "https://teddytech-374dcd019c6d.herokuapp.com/",
    "https://teddytech-374dcd019c6d.herokuapp.com/",
    "https://teddytech-374dcd019c6d.herokuapp.com/"
  ],

  github: "https://github.com/Teddyxmd/TEDDY-XMD",

  // Replace these placeholders with your actual Telegram / WhatsApp
  // contact links whenever you are ready.
  socials: [
    {
      icon: "💬",
      name: "My WhatsApp",
      detail: "Direct WhatsApp contact",
      url: "https://wa.me/254799963583"
    },
    {
      icon: "👥",
      name: "WhatsApp Group",
      detail: "Join the Teddy Tech community",
      url: "https://chat.whatsapp.com/CLClgqJIC59GrcI4sRzLu8"
    },
    {
      icon: "📣",
      name: "WhatsApp Channel",
      detail: "News, releases & updates",
      url: "https://whatsapp.com/channel/0029Vb6NveDBPzjPa4vIRt3n"
    },
    {
      icon: "✈️",
      name: "Telegram Group",
      detail: "Community discussion",
      url: "https://t.me/xdbot1"
    },
    {
      icon: "📢",
      name: "Telegram Channel",
      detail: "Updates & announcements",
      url: "https://t.me/xdbot1"
    },
    {
      icon: "👨‍💻",
      name: "Contact Developer",
      detail: "Support & development",
      url: "https://wa.me/254799963583"
    }
  ]
};

const serverGrid = document.getElementById("serverGrid");
CONFIG.servers.forEach((url, index) => {
  const card = document.createElement("article");
  card.className = "server";
  card.innerHTML = `
    <div class="num">SERVER ${index + 1}</div>
    <h3>TEDDY-XMD ${index + 1}</h3>
    <p>Pairing server • Online</p>
    <a href="${url}" target="_blank" rel="noopener">Open Server →</a>
  `;
  serverGrid.appendChild(card);
});

const socialGrid = document.getElementById("socialGrid");
CONFIG.socials.forEach(item => {
  const card = document.createElement("a");
  card.className = "social";
  card.href = item.url;
  card.target = "_blank";
  card.rel = "noopener";
  card.innerHTML = `
    <span class="sicon">${item.icon}</span>
    <span><strong>${item.name}</strong><small>${item.detail}</small></span>
  `;
  socialGrid.appendChild(card);
});

document.getElementById("githubBtn").href = CONFIG.github;
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Website AI chat uses a same-origin Vercel function to call the shared Neosoft Gemini API.
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const chatSend = document.getElementById('chatSend');

function addChatMessage(role, text, typing = false) {
  const row = document.createElement('div');
  row.className = `chat-message ${role}`;
  const avatar = document.createElement('span');
  avatar.className = 'message-avatar';
  avatar.textContent = role === 'user' ? '●' : '✦';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  if (typing) {
    bubble.innerHTML = '<span class="typing-dots" aria-label="Teddy AI is thinking"><i></i><i></i><i></i></span>';
  } else {
    bubble.textContent = text;
  }
  row.append(avatar, bubble);
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return { row, bubble };
}

async function askTeddy(message) {
  addChatMessage('user', message);
  const pending = addChatMessage('assistant', '', true);
  chatInput.value = '';
  chatSend.disabled = true;
  chatInput.disabled = true;
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'The AI service is unavailable. Please try again.');
    pending.bubble.textContent = data.answer || 'I did not receive a readable answer. Please try again.';
  } catch (error) {
    pending.bubble.textContent = error.message || 'Connection failed. Please try again.';
  } finally {
    chatSend.disabled = false;
    chatInput.disabled = false;
    chatInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

chatForm?.addEventListener('submit', event => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (message && !chatSend.disabled) askTeddy(message);
});

document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => {
    if (!chatSend.disabled) askTeddy(button.dataset.prompt);
  });
});

chatInput?.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});
