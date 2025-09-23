## 📋 Faz 1: Planlama ve Altyapı

## 1.2 Airtable Veritabanı Yapısı

```
📊 TABLO: Geri_Bildirimler
- ID (Auto number)
- Ad (Single line text)
- Email (Email)
- Telefon (Phone number)
- Konu (Single select: Talep/Şikayet/Övgü)
- Mesaj (Long text)
- Tarih (Created time)
- Durum (Single select: Yeni/İnceleme/Yanıtlandı/Kapalı)
- Öncelik (Single select: Düşük/Orta/Yüksek/Acil)
- Admin_Notları (Long text)
- AI_Yanıt_Taslağı (Long text)
- Gönderilen_Yanıt (Long text)
- Yanıt_Tarihi (Date)
- Admin_Kullanıcı (Single line text)
```

## 🔧 Faz 2: Backend & N8N Workflows

### 2.1 N8N Workflow 1: Form Verisi İşleme

```
[Webhook Trigger]
    ↓
[Data Validation & Cleaning]
    ↓
[Sentiment Analysis] (OpenAI)
    ↓
[Auto Priority Setting]
    ↓
[Airtable Insert]
    ↓
[Admin Notification] (Email/Slack)
    ↓
[Customer Confirmation] (Email)
```

**Webhook Ayarları:**

- Method: POST
- URL: `/webhook/feedback`
- Response: JSON success message

**OpenAI Sentiment Node:**

```javascript
// Prompt for sentiment analysis
"Bu müşteri mesajını analiz et ve 1-10 arası öncelik puanı ver: {{$json.message}}";
```

### 2.2 N8N Workflow 2: AI Yanıt Üretimi

```
[HTTP Request Trigger] (Admin panel'den)
    ↓
[Airtable Get Record]
    ↓
[OpenAI Response Generation]
    ↓
[Airtable Update] (AI taslağı kaydet)
    ↓
[Return to Admin Panel]
```

**OpenAI Prompt Template:**

```
Müşteri: {{$json.ad}}
Konu: {{$json.konu}}
Mesaj: {{$json.mesaj}}

Bu müşteri geri bildirimine profesyonel, samimi ve çözüm odaklı bir yanıt hazırla.
Yanıt Türkçe olmalı ve şirket temsilcisi tonunda yazılmalı.
```

### 2.3 N8N Workflow 3: Email Gönderimi

```
[HTTP Request Trigger] (Admin onayı)
    ↓
[Airtable Get Record]
    ↓
[Email Send] (SendGrid/SMTP)
    ↓
[Airtable Update] (Durum: Yanıtlandı)
    ↓
[Admin Notification]
```

---
