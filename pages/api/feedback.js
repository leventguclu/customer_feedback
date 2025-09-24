// API route for handling customer feedback submission
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message, timestamp, source } = req.body;

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

    // Prepare data for N8N
    const feedbackData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      subject,
      message: message.trim(),
      timestamp: timestamp || new Date().toISOString(),
      source: source || "website_form",
      status: "Yeni",
      priority: "Orta", // Default priority
    };

    // Try to send to N8N webhook if available
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
    
    if (N8N_WEBHOOK_URL) {
      try {
        console.log('Sending to N8N webhook:', N8N_WEBHOOK_URL);
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedbackData)
        });

        if (n8nResponse.ok) {
          console.log('Successfully sent to N8N');
        } else {
          console.error('N8N webhook failed:', n8nResponse.status);
        }
      } catch (n8nError) {
        console.error('N8N webhook error:', n8nError);
        // Continue with fallback even if N8N fails
      }
    }

    // Log the feedback (fallback)
    console.log("Feedback received:", feedbackData);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

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