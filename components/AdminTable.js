import { useState, useEffect } from "react";
import AIResponseModal from "./AIResponseModal";

const AdminTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  useEffect(() => {
    fetchFeedbacks();
  }, [filters]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.search) params.append("search", filters.search);

      const response = await fetch(`/api/admin/feedbacks?${params}`);
      const data = await response.json();

      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (feedbackId, newStatus) => {
    // TODO: Implement status update API call
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === feedbackId
          ? { ...feedback, status: newStatus }
          : feedback
      )
    );
  };

  const handleAIResponse = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status) => {
    const baseClass = "status-badge ";
    switch (status) {
      case "Yeni":
        return baseClass + "status-new";
      case "İnceleme":
        return baseClass + "status-review";
      case "Yanıtlandı":
        return baseClass + "status-responded";
      case "Kapalı":
        return baseClass + "status-closed";
      default:
        return baseClass + "status-new";
    }
  };

  const getPriorityBadgeClass = (priority) => {
    const baseClass = "status-badge ";
    switch (priority) {
      case "Düşük":
        return baseClass + "priority-low";
      case "Orta":
        return baseClass + "priority-medium";
      case "Yüksek":
        return baseClass + "priority-high";
      case "Acil":
        return baseClass + "priority-urgent";
      default:
        return baseClass + "priority-medium";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filtreler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durum
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="form-select"
            >
              <option value="">Tümü</option>
              <option value="Yeni">Yeni</option>
              <option value="İnceleme">İnceleme</option>
              <option value="Yanıtlandı">Yanıtlandı</option>
              <option value="Kapalı">Kapalı</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Öncelik
            </label>
            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priority: e.target.value }))
              }
              className="form-select"
            >
              <option value="">Tümü</option>
              <option value="Düşük">Düşük</option>
              <option value="Orta">Orta</option>
              <option value="Yüksek">Yüksek</option>
              <option value="Acil">Acil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arama
            </label>
            <input
              type="text"
              placeholder="Ad, e-posta veya mesajda ara..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Geri Bildirimler ({feedbacks.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Konu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Öncelik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {feedback.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {feedback.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {feedback.subject}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {feedback.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadgeClass(feedback.status)}>
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPriorityBadgeClass(feedback.priority)}>
                      {feedback.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(feedback.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleAIResponse(feedback)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      AI Yanıt
                    </button>
                    <select
                      value={feedback.status}
                      onChange={(e) =>
                        handleStatusChange(feedback.id, e.target.value)
                      }
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="Yeni">Yeni</option>
                      <option value="İnceleme">İnceleme</option>
                      <option value="Yanıtlandı">Yanıtlandı</option>
                      <option value="Kapalı">Kapalı</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {feedbacks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-4 4-4-4m8 0h2M6 13l4-4 4 4m-4-4v8"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Geri bildirim bulunamadı
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Henüz hiç geri bildirim alınmamış.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* AI Response Modal */}
      <AIResponseModal
        feedbackId={selectedFeedback?.id}
        feedback={selectedFeedback}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFeedback(null);
        }}
        onSent={() => {
          fetchFeedbacks(); // Refresh table after sending response
        }}
      />
    </div>
  );
};

export default AdminTable;
