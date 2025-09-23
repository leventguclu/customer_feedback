import { useState, useEffect } from "react";

const AIResponseModal = ({ feedbackId, feedback, isOpen, onClose, onSent }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [editedResponse, setEditedResponse] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [step, setStep] = useState("generate"); // 'generate', 'edit', 'preview'

  useEffect(() => {
    if (isOpen && feedbackId) {
      setStep("generate");
      setAiResponse("");
      setEditedResponse("");
      setAdminNotes("");
    }
  }, [isOpen, feedbackId]);

  const generateAIResponse = async () => {
    if (!feedbackId) return;

    setIsGenerating(true);
    try {
      const response = await fetch(`/api/generate-response/${feedbackId}`);
      const data = await response.json();

      if (data.success) {
        setAiResponse(data.data.aiResponse);
        setEditedResponse(data.data.aiResponse);
        setStep("edit");
      } else {
        console.error("AI response generation failed:", data.message);
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sendResponse = async () => {
    if (!feedbackId || !editedResponse.trim()) return;

    setIsSending(true);
    try {
      const response = await fetch(`/api/send-response/${feedbackId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          response: editedResponse,
          adminNotes: adminNotes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSent && onSent();
        onClose();
      } else {
        console.error("Response sending failed:", data.message);
      }
    } catch (error) {
      console.error("Error sending response:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            AI Yanıt Üretici
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="py-4">
          {/* Feedback Details */}
          {feedback && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Müşteri Geri Bildirimi
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Müşteri:</span> {feedback.name}
                </div>
                <div>
                  <span className="font-medium">E-posta:</span> {feedback.email}
                </div>
                <div>
                  <span className="font-medium">Konu:</span> {feedback.subject}
                </div>
                <div>
                  <span className="font-medium">Öncelik:</span>{" "}
                  {feedback.priority}
                </div>
              </div>
              <div className="mt-3">
                <span className="font-medium">Mesaj:</span>
                <p className="mt-1 text-gray-700">{feedback.message}</p>
              </div>
            </div>
          )}

          {/* Step 1: Generate AI Response */}
          {step === "generate" && (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-primary-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                AI Yanıt Üret
              </h4>
              <p className="text-gray-600 mb-6">
                Bu geri bildirime uygun bir yanıt oluşturmak için AI'ı kullanın.
              </p>
              <button
                onClick={generateAIResponse}
                disabled={isGenerating}
                className={`btn-primary ${
                  isGenerating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Yanıt üretiliyor...
                  </>
                ) : (
                  "AI Yanıt Üret"
                )}
              </button>
            </div>
          )}

          {/* Step 2: Edit AI Response */}
          {step === "edit" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI Tarafından Üretilen Yanıt
                </label>
                <textarea
                  value={editedResponse}
                  onChange={(e) => setEditedResponse(e.target.value)}
                  rows="12"
                  className="form-textarea text-sm"
                  placeholder="AI yanıtı buraya gelecek..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Notları (İsteğe bağlı)
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows="3"
                  className="form-textarea text-sm"
                  placeholder="İç kullanım için notlarınızı buraya yazabilirsiniz..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setStep("preview")}
                  disabled={!editedResponse.trim()}
                  className="btn-secondary"
                >
                  Önizleme
                </button>
                <button
                  onClick={sendResponse}
                  disabled={!editedResponse.trim() || isSending}
                  className={`btn-primary ${
                    !editedResponse.trim() || isSending
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSending ? "Gönderiliyor..." : "Yanıtı Gönder"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === "preview" && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                  E-posta Önizlemesi
                </h4>
                <div className="bg-white p-4 border rounded">
                  <div className="text-sm text-gray-600 mb-4">
                    <div>
                      <strong>Kime:</strong> {feedback?.email}
                    </div>
                    <div>
                      <strong>Konu:</strong> Re: {feedback?.subject}
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap text-gray-900">
                    {editedResponse}
                  </div>
                </div>
              </div>

              {adminNotes && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Admin Notları
                  </h4>
                  <p className="text-gray-700">{adminNotes}</p>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setStep("edit")}
                  className="btn-secondary"
                >
                  Düzenle
                </button>
                <button
                  onClick={sendResponse}
                  disabled={isSending}
                  className={`btn-primary ${
                    isSending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSending ? "Gönderiliyor..." : "Yanıtı Gönder"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResponseModal;
