export default class ChatService {
  constructor(props) {
    this.baseUrl = 'http://localhost:5000/api';
  }

  async createChat(planId) {
    const res = await fetch(`${this.baseUrl}/chats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ planId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al crear chat');
    return data;
  }

  async sendMessage(chatId, content) {
    const res = await fetch(`${this.baseUrl}/chats/${chatId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al enviar mensaje');
    return data;
  }

  async getChat(chatId) {
    const res = await fetch(`${this.baseUrl}/chats/${chatId}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Chat no encontrado');
    return data;
  }
}