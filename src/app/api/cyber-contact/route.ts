import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, contact, message, fps } = await request.json();
    const userAgent = request.headers.get('user-agent') || 'Unknown Device';
    const isMobile = /mobile/i.test(userAgent) ? '🫳 Mobile' : '🖥️ Desktop';

    // === НАСТРОЙКА КЛЮЧЕЙ TELEGRAM ===
    const TELEGRAM_BOT_TOKEN = '8776213651:AAFoAR2Txa0ingl0ciwLRRe6VjZTE_E5j7g'; 
    const TELEGRAM_CHAT_ID = '804867683'; 

    // КИБЕР-ШАБЛОН СООБЩЕНИЯ
    const telegramMessage = `
🛸 *НОВОЕ КВАНТОВОЕ ПОДКЛЮЧЕНИЕ*
────────────────────────
👤 *Оператор:* ${name}
📡 *Связь:* \`${contact}\`
💬 *Сообщение:* "${message}"
────────────────────────
📊 *МЕТРИКИ СИСТЕМЫ:*
⚙️ *Устройство:* ${isMobile}
🏎️ *Производительность:* ${fps} FPS
🧬 *Браузер:* ${userAgent.substring(0, 40)}...
────────────────────────
🛰️ _Aether Lab CRM Node v1.0_
    `;

    // АДРЕС СЕРВЕРА TELEGRAM API
    const url = `https://telegram.org{TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramRes.ok) {
      const errorData = await telegramRes.json();
      console.error('❌ Ошибка от Telegram API:', errorData);
      return NextResponse.json({ success: false, error: 'Telegram API rejected the request' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Критическая ошибка сервера:', error);
    return NextResponse.json({ success: false, error: 'Core transmission failed' }, { status: 500 });
  }
}
