// API route for sending response to customer
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { response, adminNotes } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Feedback ID gerekli",
        error: "Missing feedback ID",
      });
    }

    if (!response) {
      return res.status(400).json({
        message: "Yanıt metni gerekli",
        error: "Missing response text",
      });
    }

    // TODO: In real implementation, this would:
    // 1. Fetch customer email from Airtable record
    // 2. Send email via SendGrid/SMTP
    // 3. Update Airtable record with sent response and status
    // 4. Trigger N8N workflow for email sending

    // For now, we'll simulate the process
    console.log(`Sending response for feedback ${id}:`, {
      response,
      adminNotes,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful email send
    const emailResult = {
      messageId: `msg_${Date.now()}`,
      status: "sent",
      recipient: "customer@example.com", // This would come from feedback data
      sentAt: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      message: "Yanıt başarıyla gönderildi",
      data: {
        feedbackId: id,
        emailResult,
        updatedStatus: "Yanıtlandı",
        responseDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Send Response API Error:", error);
    res.status(500).json({
      success: false,
      message: "Yanıt gönderilirken hata oluştu",
      error: "Internal server error",
    });
  }
}
