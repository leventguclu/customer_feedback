// API route for generating AI response for a specific feedback
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "Feedback ID gerekli",
        error: "Missing feedback ID",
      });
    }

    // TODO: In real implementation, this would:
    // 1. Fetch feedback data from Airtable
    // 2. Trigger N8N workflow for AI response generation
    // 3. Return the AI-generated response

    // For now, we'll return mock AI response based on feedback type
    const mockAIResponses = {
      Şikayet: `Sayın Müşterimiz,

Öncelikle yaşadığınız sorunu duyduğumuz için üzgünüz. Memnuniyetsizliğinizi anlıyoruz ve bu durumu en kısa sürede çözmek için elimizden geleni yapacağız.

Detayları inceleyerek size geri dönüş yapacağız. Bu süreçte sabırınız için teşekkür ederiz.

Herhangi bir sorunuz olması durumunda bizimle iletişime geçmekten çekinmeyin.

Saygılarımızla,
Müşteri Hizmetleri Ekibi`,

      Talep: `Sayın Müşterimiz,

Talebiniz için teşekkür ederiz. Öneriniz bizim için değerli ve ilgili departmanımızla paylaşılacaktır.

Değerlendirme sürecinin ardından size bilgi vereceğiz. Bu süreçte sabrınız için teşekkür ederiz.

Başka bir konuda yardımcı olabileceğimiz bir konu varsa lütfen bize bildirin.

Saygılarımızla,
Müşteri Hizmetleri Ekibi`,

      Övgü: `Sayın Müşterimiz,

Memnuniyetinizi belirttiğiniz için çok teşekkür ederiz. Bu tür geri bildirimler bizim için çok değerli ve motivasyon kaynağıdır.

Sizlere daha iyi hizmet verebilmek için çalışmaya devam edeceğiz. Görüşlerinizi paylaştığınız için minnettarız.

İlerde de hizmetlerimizi tercih etmenizi umuyoruz.

Saygılarımızla,
Müşteri Hizmetleri Ekibi`,
    };

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return a random response type for demo
    const responseTypes = Object.keys(mockAIResponses);
    const randomType =
      responseTypes[Math.floor(Math.random() * responseTypes.length)];
    const aiResponse = mockAIResponses[randomType];

    res.status(200).json({
      success: true,
      data: {
        feedbackId: id,
        aiResponse: aiResponse,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Generate Response API Error:", error);
    res.status(500).json({
      success: false,
      message: "AI yanıt üretilirken hata oluştu",
      error: "Internal server error",
    });
  }
}
