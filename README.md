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

## 📦 Kurulum

1. Projeyi klonlayın:
   \`\`\`bash
   git clone <repo-url>
   cd customer_feedback/frontend
   \`\`\`

2. Bağımlılıkları yükleyin:
   \`\`\`bash
   npm install
   \`\`\`

3. Ortam değişkenlerini ayarlayın:
   \`\`\`bash
   cp env.example .env.local
   \`\`\`

4. \`.env.local\` dosyasını düzenleyin:
   \`\`\`env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   \`\`\`

5. Geliştirme sunucusunu başlatın:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔑 Demo Hesap Bilgileri

**Admin Panel Girişi:**

- **E-posta:** admin@company.com
- **Şifre:** admin123

## 📱 Sayfalar

- **Ana Sayfa:** \`/\` - Müşteri geri bildirim formu
- **Admin Girişi:** \`/admin/login\` - Admin panel girişi
- **Admin Dashboard:** \`/admin/dashboard\` - Ana admin panel

## 🎨 Tasarım Özellikleri

- Modern ve temiz arayüz
- Fully responsive tasarım
- Tailwind CSS ile özelleştirilebilir tema
- Accessibility standartlarına uygun
- Loading states ve animasyonlar

## 📊 API Endpoints

### Müşteri API'ları

- \`POST /api/feedback\` - Geri bildirim gönderme

### Admin API'ları

- \`GET /api/admin/feedbacks\` - Geri bildirim listesi
- \`GET /api/generate-response/[id]\` - AI yanıt üretimi (mock)
- \`POST /api/send-response/[id]\` - Yanıt gönderimi (mock)

## 🔮 Gelecek Entegrasyonlar

Bu proje, gelecekte aşağıdaki teknolojilerle entegre edilmek üzere hazırlanmıştır:

- **N8N:** Workflow otomasyonu
- **Airtable:** Veritabanı yönetimi
- **OpenAI:** AI yanıt üretimi
- **SendGrid:** E-posta gönderimi

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Değişikliklerinizi commit edin (\`git commit -m 'Add amazing feature'\`)
4. Branch'inizi push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Levent Güçlü**

---

💡 **Not:** Bu sistem sadece frontend kısmını içermektedir. N8N, Airtable ve OpenAI entegrasyonları roadmap'te belirtildiği üzere ileriki aşamalarda eklenecektir.
