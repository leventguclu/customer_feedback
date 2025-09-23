import { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ad soyad zorunludur";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta zorunludur";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (!formData.subject) {
      newErrors.subject = "Konu seçiniz";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesaj zorunludur";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Geri Bildiriminizi Paylaşın
      </h2>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ad Soyad *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? "border-red-500" : ""}`}
            placeholder="Adınızı ve soyadınızı giriniz"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            E-posta Adresi *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "border-red-500" : ""}`}
            placeholder="ornek@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Telefon Numarası
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="0555 123 45 67"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Konu *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`form-select ${errors.subject ? "border-red-500" : ""}`}
          >
            <option value="">Konu seçiniz</option>
            <option value="Talep">Talep</option>
            <option value="Şikayet">Şikayet</option>
            <option value="Övgü">Övgü</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mesajınız *
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className={`form-textarea ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Mesajınızı buraya yazınız..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full btn-primary ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
