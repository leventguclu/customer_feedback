# Müşteri Geri Bildirim Yönetim Sistemi - Yol Haritası

## 🎯 Proje Genel Bakışı

**Hedef:** AI destekli müşteri geri bildirim yönetim sistemi
**Açıklama:** Websitedeki forma müşteri talep/şikayet/övgü yazdığında airtable'a tüm veriler transfer edilecek ve sonra Websitedeki (müşterinin göremeyeceği şekilde) hizmet sağlayıcı admin panelinden tüm verileri takip edeceği bir sistem olacak. Admin panelinden otomatik yanıt gönder butonuna admin bastığında yapay zeka destekli bir şekilde email yanıt taslağı oluşturulacam ve admin nihai onayı verirse bu yanıt müşteriye gönderilecek
**Teknoloji Stack:** React/Next.js + N8N + Airtable + OpenAI
**Not:** Bu kısımda N8N + Airtable + OpenAI teknolojileri ile ilgili adımlar uygulanmayacağından açıklamaları yapılmamıştır.

---

## 📋 Faz 1: Planlama ve Altyapı

### 1.1 Sistem Mimarisi Tasarımı

- **Frontend:** Next.js (SEO friendly, admin panel)
- **Backend:** N8N workflows + API endpoints
- **Database:** Airtable (kolay yönetim)
- **AI:** OpenAI GPT-4 (email yanıt üretimi)
- **Email:** SendGrid/Nodemailer
- **Auth:** NextAuth.js (admin girişi)

### 1.2 Airtable Veritabanı Yapısı

### 1.3 Proje Klasör Yapısı

```
project/
├── frontend/
│   ├── pages/
│   │   ├── index.js (Ana sayfa + Form)
│   │   ├── admin/
│   │   │   ├── dashboard.js
│   │   │   ├── feedback/[id].js
│   │   │   └── login.js
│   ├── components/
│   │   ├── FeedbackForm.js
│   │   ├── AdminTable.js
│   │   └── AIResponseModal.js
│   └── utils/
├── n8n/
│   └── workflows/
└── docs/
```

---

## 🔧 Faz 2: Backend & N8N Workflows

### 2.1 N8N Workflow 1: Form Verisi İşleme

### 2.2 N8N Workflow 2: AI Yanıt Üretimi

### 2.3 N8N Workflow 3: Email Gönderimi

## 💻 Faz 3: Frontend Geliştirme

### 3.1 Ana Sayfa & Müşteri Formu

```jsx
// components/FeedbackForm.js
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // Success handling
  };

  return (
    // Form JSX
  );
};
```

### 3.2 Admin Dashboard

```jsx
// pages/admin/dashboard.js
import { useSession } from "next-auth/react";
import AdminTable from "../../components/AdminTable";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <LoginForm />;

  return (
    <div className="admin-dashboard">
      <AdminTable />
    </div>
  );
}
```

### 3.3 AI Yanıt Modal Component

```jsx
// components/AIResponseModal.js
const AIResponseModal = ({ feedbackId, isOpen, onClose }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIResponse = async () => {
    setIsGenerating(true);
    const response = await fetch(`/api/generate-response/${feedbackId}`);
    const data = await response.json();
    setAiResponse(data.aiResponse);
    setIsGenerating(false);
  };

  const sendResponse = async () => {
    await fetch(`/api/send-response/${feedbackId}`, {
      method: 'POST',
      body: JSON.stringify({ response: aiResponse })
    });
    onClose();
  };

  return (
    // Modal JSX
  );
};
```

---

## 🔌 Faz 4: API Entegrasyonları

### 4.1 Next.js API Routes

```javascript
// pages/api/feedback.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // N8N webhook'a gönder
    const n8nResponse = await fetch('N8N_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    res.status(200).json({ success: true });
  }
}

// pages/api/admin/feedbacks.js
export default async function handler(req, res) {
  // Airtable'dan verileri çek
  const feedbacks = await airtable('Geri_Bildirimler').select().all();
  res.status(200).json(feedbacks);
}

// pages/api/generate-response/[id].js
export default async function handler(req, res) {
  const { id } = req.query;
  // N8N AI workflow tetikle
  const aiResponse = await fetch(`N8N_AI_WEBHOOK_URL/${id}`);
  res.status(200).json(aiResponse);
}
```

### 4.2 Airtable API Konfigürasyonu

```javascript
// utils/airtable.js
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

module.exports = base;
```

---

## 🎨 Faz 5: UI/UX & Güvenlik

### 5.1 Admin Panel Özellikleri

- **Dashboard:** Özet istatistikler, grafik
- **Geri Bildirim Listesi:** Filtreleme, arama, sayfalama
- **Detay Görünümü:** Müşteri bilgileri, mesaj, AI yanıt butonu
- **Yanıt Editörü:** AI taslağı düzenleme, önizleme, gönderme

### 5.2 Güvenlik Önlemleri

- NextAuth.js ile admin girişi
- API rate limiting
- Form validation (frontend + backend)
- XSS koruması
- CSRF token'ları

---

## 📱 Özellik Detayları

### Müşteri Tarafı:

✅ Responsive form tasarımı
✅ Real-time form validation
✅ Başarı/hata mesajları
✅ Loading states

### Admin Tarafı:

✅ Secure login system
✅ Real-time veri güncelleme
✅ AI yanıt üretimi butonu
✅ Yanıt editörü ve önizleme
✅ Bulk actions (toplu işlemler)
✅ Export özelliği (CSV/Excel)

---

### Test Senaryoları:

- Form gönderimi testi
- AI yanıt üretimi testi
- Email gönderim testi
- Admin panel fonksiyonları
- Güvenlik testleri

---
