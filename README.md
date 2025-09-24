# Müşteri Geri Bildirim Yönetim Sistemi

AI destekli müşteri geri bildirim yönetim sistemi. Next.js ile geliştirilmiş, responsive ve modern bir web uygulaması.

## 🚀 Özellikler

### Müşteri Tarafı
- ✅ Responsive geri bildirim formu
- ✅ Real-time form validasyonu
- ✅ Başarı/hata mesajları
- ✅ Modern ve kullanıcı dostu tasarım

### Admin Tarafı
- ✅ Güvenli admin panel girişi
- ✅ Dashboard ile özet istatistikler
- ✅ Gelişmiş filtreleme ve arama
- ✅ AI yanıt modal sistemi (mock)
- ✅ Durum ve öncelik yönetimi
- ✅ Responsive tablo tasarımı

## 🛠 Teknoloji Stack

- **Frontend:** Next.js 14, React 18
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **State Management:** React Hooks
- **Integration:** N8N Webhook with fallback API

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd customer_feedback/frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Ortam değişkenlerini ayarlayın:
```bash
cp env.example .env.local
```

4. `.env.local` dosyasını düzenleyin:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/feedback-form
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 🔑 Demo Hesap Bilgileri

**Admin Panel Girişi:**
- **E-posta:** admin@company.com
- **Şifre:** admin123

## 📱 Sayfalar

- **Ana Sayfa:** `/` - Müşteri geri bildirim formu
- **Admin Girişi:** `/admin/login` - Admin panel girişi
- **Admin Dashboard:** `/admin/dashboard` - Ana admin panel

## 🎨 Tasarım Özellikleri

- Modern ve temiz arayüz
- Fully responsive tasarım
- Tailwind CSS ile özelleştirilebilir tema
- Accessibility standartlarına uygun
- Loading states ve animasyonlar

## 📊 API Endpoints

### Müşteri API'ları
- `POST /api/feedback` - Geri bildirim gönderme (N8N webhook proxy)

### Admin API'ları
- `GET /api/admin/feedbacks` - Geri bildirim listesi
- `GET /api/generate-response/[id]` - AI yanıt üretimi (mock)
- `POST /api/send-response/[id]` - Yanıt gönderimi (mock)

## 🔮 N8N Webhook Integration

### Development
Form önce N8N webhook'unu dener, başarısız olursa API route'unu kullanır.

### Production
Form API route'unu kullanır, API route N8N webhook'una proxy yapar.

```
Frontend → /api/feedback → N8N Webhook → Airtable
```

## 🚀 Deployment

### Vercel Environment Variables:
```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-production-secret
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/feedback-form
```

## 🔧 N8N Webhook Configuration

N8N'de webhook node kurulumu:
1. Webhook node ekleyin
2. Method: POST
3. Path: `/webhook/feedback-form`
4. Response: JSON

Beklenen data formatı:
```json
{
  "name": "Müşteri Adı",
  "email": "musteri@email.com",
  "phone": "0555 123 45 67",
  "subject": "Talep/Şikayet/Övgü",
  "message": "Müşteri mesajı",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "website_form"
}
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Levent Güçlü**

---

💡 **Son Güncelleme:** CORS hatası çözüldü, N8N webhook entegrasyonu tamamlandı!