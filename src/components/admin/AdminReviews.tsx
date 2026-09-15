import React, { useState, useEffect } from 'react';
import { ReviewItem } from '../../types';
import { loadReviews, saveReviews } from '../../store/apiStore';
import {
  Star,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Building2,
  User,
  MessageSquareQuote,
  Save,
  X,
} from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(loadReviews());
  const [notification, setNotification] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<ReviewItem | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setReviews(loadReviews());
    };
    window.addEventListener('vncord_reviews_updated', handleUpdate);
    return () => window.removeEventListener('vncord_reviews_updated', handleUpdate);
  }, []);

  const handleOpenAdd = () => {
    setCurrentReview({
      id: `rev-${Date.now()}`,
      author: '',
      role: 'Sản phụ',
      hospital: 'Bệnh viện Từ Dũ',
      date: new Date().toLocaleDateString('vi-VN'),
      rating: 5,
      comment: '',
      highlight: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (rev: ReviewItem) => {
    setCurrentReview(rev);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này không?')) {
      const updated = reviews.filter((r) => r.id !== id);
      setReviews(updated);
      saveReviews(updated);
      setNotification('Đã xóa đánh giá khách hàng thành công!');
      setTimeout(() => setNotification(''), 2500);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReview?.author || !currentReview.comment) {
      alert('Vui lòng điền họ tên và nội dung đánh giá');
      return;
    }

    const existingIdx = reviews.findIndex((r) => r.id === currentReview.id);
    let updated: ReviewItem[];
    if (existingIdx >= 0) {
      updated = [...reviews];
      updated[existingIdx] = currentReview;
    } else {
      updated = [currentReview, ...reviews];
    }

    setReviews(updated);
    saveReviews(updated);
    setIsModalOpen(false);
    setCurrentReview(null);
    setNotification('Đã lưu đánh giá khách hàng thành công!');
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Quản Lý Đánh Giá Khách Hàng</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {reviews.length} nhận xét
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cập nhật cảm nhận từ các gia đình và sản phụ đã lưu trữ tế bào gốc tại VNCORD-DK
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Đánh Giá Mới</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(rev)}
                    className="p-1 text-slate-400 hover:text-sky-600 rounded-md cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-4">
                "{rev.comment}"
              </p>

              {rev.highlight && (
                <div className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 line-clamp-1">
                  {rev.highlight}
                </div>
              )}
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900">{rev.author}</div>
                <div className="text-[11px] text-slate-500">{rev.hospital}</div>
              </div>
              <span className="text-[10px] text-slate-400">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Review */}
      {isModalOpen && currentReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-amber-50 to-sky-50 border-b border-amber-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-amber-700" />
                <h3 className="font-bold text-slate-900">
                  {reviews.some((r) => r.id === currentReview.id) ? 'Chỉnh Sửa Đánh Giá' : 'Thêm Đánh Giá Mới'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Họ tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={currentReview.author}
                    onChange={(e) => setCurrentReview({ ...currentReview, author: e.target.value })}
                    placeholder="Chị Hoàng Yến"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vai trò</label>
                  <input
                    type="text"
                    value={currentReview.role}
                    onChange={(e) => setCurrentReview({ ...currentReview, role: e.target.value })}
                    placeholder="Sản phụ tuần thai 36"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bệnh viện sinh</label>
                  <input
                    type="text"
                    value={currentReview.hospital}
                    onChange={(e) => setCurrentReview({ ...currentReview, hospital: e.target.value })}
                    placeholder="Bệnh viện Từ Dũ"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Đánh giá sao</label>
                  <select
                    value={currentReview.rating}
                    onChange={(e) => setCurrentReview({ ...currentReview, rating: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Sao)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Sao)</option>
                    <option value={3}>⭐⭐⭐ (3 Sao)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Điểm nổi bật (Highlight)</label>
                <input
                  type="text"
                  value={currentReview.highlight}
                  onChange={(e) => setCurrentReview({ ...currentReview, highlight: e.target.value })}
                  placeholder="Kỹ thuật viên túc trực phòng sinh rất chu đáo"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung cảm nhận *</label>
                <textarea
                  rows={3}
                  required
                  value={currentReview.comment}
                  onChange={(e) => setCurrentReview({ ...currentReview, comment: e.target.value })}
                  placeholder="Chia sẻ trải nghiệm thực tế về dịch vụ..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Đánh Giá</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
