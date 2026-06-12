export default class ChatPage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.chatId = null;

    this.querySelector('#send-btn')?.addEventListener('click', () => this.sendMessage());
    this.querySelector('#message-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
    });
    this.querySelector('#back-to-dashboard')?.addEventListener('click', () => slice.router.navigate('/dashboard'));
  }

  async init() {
    this.shell = await slice.build('AppShell', { activePage: 'chat' });
    this.shell.querySelector('#shell-content').appendChild(this);
    document.querySelector('#app').appendChild(this.shell);

    this.refreshIcons();

    const loading = await this.getLoading();
    loading.start();

    try {
      const [planService, chatService] = await Promise.all([
        slice.getComponent('PlanService'),
        slice.getComponent('ChatService'),
      ]);

      const plan = await planService.getActivePlan();
      const chat = await chatService.createChat(plan._id);
      this.chatId = chat._id;

      this.addMessage('model', "Hi! I'm your AI Coach. I have access to your current training plan. How can I help you today?");
    } catch (err) {
      console.error(err);
      this.addMessage('model', 'Unable to load your plan. Please make sure you have an active plan.');
    } finally {
      loading.stop();
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  formatMarkdown(text) {
    let safe = this.escapeHtml(text);
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    const lines = safe.split('\n');
    let html = '';
    let inList = false;

    for (let line of lines) {
      const trimmed = line.trim();
      const isBullet = /^[\*\-]\s+/.test(trimmed);

      if (isBullet) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${trimmed.replace(/^[\*\-]\s+/, '')}</li>`;
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        if (trimmed) html += `<p>${trimmed}</p>`;
      }
    }
    if (inList) html += '</ul>';

    return html || `<p>${safe}</p>`;
  }

  addMessage(role, content) {
    const container = this.querySelector('#messages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `message ${role === 'model' ? 'message-ai' : 'message-user'}`;

    if (role === 'model') {
      div.innerHTML = `
        <div class="msg-avatar ai"><i data-lucide="bot" class="icon-sm"></i></div>
        <div class="msg-bubble">
          <p class="msg-name">AI Coach</p>
          <div class="msg-content">${this.formatMarkdown(content)}</div>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="msg-bubble">
          <div class="msg-content"><p>${this.escapeHtml(content)}</p></div>
        </div>
        <div class="msg-avatar user"><i data-lucide="user" class="icon-sm"></i></div>
      `;
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    this.refreshIcons();
    return div;
  }

  async sendMessage() {
    const input = this.querySelector('#message-input');
    const content = input?.value?.trim();
    if (!content || !this.chatId) return;

    input.value = '';
    this.addMessage('user', content);

    const typingDiv = this.addMessage('model', 'Thinking...');

    try {
      const chatService = await slice.getComponent('ChatService');
      const data = await chatService.sendMessage(this.chatId, content);
      typingDiv.querySelector('.msg-content').innerHTML = this.formatMarkdown(data.response);
    } catch (err) {
      typingDiv.querySelector('.msg-content').innerHTML = '<p>Sorry, there was an error. Please try again.</p>';
    }

    this.querySelector('#messages').scrollTop = this.querySelector('#messages').scrollHeight;
  }

  refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  async getLoading() {
    if (!slice.controller.getComponent('Loading')) {
      return await slice.build('Loading', { sliceId: 'Loading' });
    }
    return slice.controller.getComponent('Loading');
  }
}

customElements.define('chat-page', ChatPage);