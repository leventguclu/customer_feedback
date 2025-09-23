// API route for admin to fetch all feedbacks
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // TODO: In real implementation, this would fetch from Airtable
    // For now, we'll return mock data
    const mockFeedbacks = [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        phone: "0555 123 45 67",
        subject: "Şikayet",
        message:
          "Ürününüzle ilgili bir sorun yaşıyorum. Lütfen yardımcı olabilir misiniz?",
        date: "2024-01-15T10:30:00Z",
        status: "Yeni",
        priority: "Yüksek",
        adminNotes: "",
        aiResponseDraft: "",
        sentResponse: "",
        responseDate: null,
        adminUser: "",
      },
      {
        id: 2,
        name: "Zeynep Kaya",
        email: "zeynep@example.com",
        phone: "0532 987 65 43",
        subject: "Övgü",
        message: "Hizmetinizden çok memnunum. Teşekkür ederim.",
        date: "2024-01-14T14:15:00Z",
        status: "Yanıtlandı",
        priority: "Düşük",
        adminNotes: "Müşteri memnuniyeti yüksek",
        aiResponseDraft: "Memnuniyetinizi duyduğumuz için çok mutluyuz...",
        sentResponse:
          "Sayın Zeynep Hanım, memnuniyetinizi duyduğumuz için çok mutluyuz...",
        responseDate: "2024-01-14T16:00:00Z",
        adminUser: "admin@company.com",
      },
      {
        id: 3,
        name: "Mehmet Demir",
        email: "mehmet@example.com",
        phone: "",
        subject: "Talep",
        message:
          "Yeni özellik talebi: Mobil uygulama geliştirmenizi istiyorum.",
        date: "2024-01-13T09:20:00Z",
        status: "İnceleme",
        priority: "Orta",
        adminNotes: "Teknik ekiple görüşülecek",
        aiResponseDraft: "",
        sentResponse: "",
        responseDate: null,
        adminUser: "admin@company.com",
      },
    ];

    // Apply filters if provided
    const { status, priority, search } = req.query;
    let filteredFeedbacks = [...mockFeedbacks];

    if (status) {
      filteredFeedbacks = filteredFeedbacks.filter(
        (feedback) => feedback.status === status
      );
    }

    if (priority) {
      filteredFeedbacks = filteredFeedbacks.filter(
        (feedback) => feedback.priority === priority
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredFeedbacks = filteredFeedbacks.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(searchLower) ||
          feedback.email.toLowerCase().includes(searchLower) ||
          feedback.message.toLowerCase().includes(searchLower)
      );
    }

    res.status(200).json({
      success: true,
      data: filteredFeedbacks,
      total: filteredFeedbacks.length,
    });
  } catch (error) {
    console.error("Admin Feedbacks API Error:", error);
    res.status(500).json({
      success: false,
      message: "Sunucu hatası oluştu",
      error: "Internal server error",
    });
  }
}
