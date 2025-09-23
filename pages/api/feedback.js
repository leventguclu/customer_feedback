// API route for handling customer feedback submission
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Gerekli alanlar eksik",
        error: "Missing required fields",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Geçersiz e-posta adresi",
        error: "Invalid email format",
      });
    }

    // Prepare data for processing
    const feedbackData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      subject,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: "Yeni",
      priority: "Orta", // Default priority
    };

    // TODO: Here you would normally send data to N8N webhook
    // Since we're not implementing N8N integration, we'll just log it
    console.log("Feedback received:", feedbackData);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    res.status(200).json({
      success: true,
      message: "Geri bildiriminiz başarıyla alındı",
      data: {
        id: Date.now(), // Simulate generated ID
        status: "received",
      },
    });
  } catch (error) {
    console.error("Feedback API Error:", error);
    res.status(500).json({
      success: false,
      message: "Sunucu hatası oluştu",
      error: "Internal server error",
    });
  }
}
