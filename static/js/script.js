// tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const id = btn.dataset.tab;
    document.getElementById(`tab-${id}`).classList.remove('hidden');
    document.getElementById(`tab-${id}`).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('bg-green-100','text-green-700'));
    btn.classList.add('bg-green-100','text-green-700');
  });
});

// prompt chips
document.querySelectorAll('.chip').forEach(c => {
  c.addEventListener('click', () => {
    document.getElementById('msg').value = c.textContent.trim();
    document.getElementById('send').click();
  });
});

// chat send
const chat = document.getElementById('chat');
document.getElementById('send').addEventListener('click', async () => {
  const input = document.getElementById('msg');
  const text = input.value.trim();
  if (!text) return;
  push(text, true);
  input.value = '';

  try {
    const res = await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    push(data.reply || (data.error ? `Error: ${data.error}` : 'No reply'), false);
  } catch (e) {
    push('Network error. Try again.', false);
  }
});

function push(text, isUser){
  const div = document.createElement('div');
  div.className = isUser ? 'user' : 'bot';
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// stock lookup
document.getElementById('lookup').addEventListener('click', async () => {
  const t = (document.getElementById('ticker').value || 'AAPL').toUpperCase();
  const box = document.getElementById('quote');
  box.textContent = 'Loading...';
  try {
    const res = await fetch(`/api/stock?t=${encodeURIComponent(t)}`);
    const data = await res.json();
    if (data.error) { box.textContent = `Error: ${data.error}`; return; }
    const p = data.price != null ? `$${Number(data.price).toFixed(2)}` : '—';
    const c = data.change_pct != null ? `${(data.change_pct*100).toFixed(2)}%` : '—';
    box.textContent = `${data.ticker}: ${p}  (${c} today)`;
  } catch {
    box.textContent = 'Network error.';
  }
});
