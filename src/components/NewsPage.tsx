import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  Search,
  BookOpen,
  Share2,
} from 'lucide-react';
import { NewsArticle } from '../types';
import { loadNewsArticles } from '../store/adminStore';

interface NewsPageProps {
  onOpenConsultation: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onOpenConsultation }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(loadNewsArticles());
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => setArticles(loadNewsArticles());
    window.addEventListener('vncord_news_updated', handleUpdate);
    return () => window.removeEventListener('vncord_news_updated', handleUpdate);
  }, []);

  const categories = ['all', 'Nghiên cứu & Ứng dụng', 'Hợp tác y tế', 'Công nghệ tế bào', 'Cẩm nang sản phụ'];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const activeArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-br from-teal-50 via-sky-50/60 to-white text-slate-800 rounded-3xl p-8 sm:p-12 border border-teal-100 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-4 border border-teal-200 shadow-2xs">
              <Newspaper className="w-3.5 h-3.5 text-teal-700" />
              <span>Trung Tâm Thông Tin Y Sinh Học</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
              Tin Tức & Kiến Thức Tế Bào Gốc
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Cập nhật các tiến bộ khoa học mới nhất về y học tái tạo, hội nghị chuyên môn của VNCORD-DK và cẩm nang chuẩn bị sinh dành cho cha mẹ.
            </p>
          </div>
        </div>
      </div>

      {/* Modal/Detail view if an article is selected */}
      {activeArticle && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="text-xs font-bold text-teal-600 hover:text-teal-800 mb-6 flex items-center gap-1 cursor-pointer"
            >
              ← Quay lại danh sách tin tức
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 flex-wrap">
              <span className="bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {activeArticle.author}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 leading-snug">
              {activeArticle.title}
            </h2>

            {/* Featured Hero Cover Image */}
            {activeArticle.coverImage && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.coverImageAlt || activeArticle.title}
                  className="w-full max-h-[460px] object-cover"
                  referrerPolicy="no-referrer"
                />
                {activeArticle.coverImageCaption && (
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 italic text-center">
                    Ảnh: {activeArticle.coverImageCaption}
                  </div>
                )}
              </div>
            )}

            <div className="bg-teal-50/70 p-5 rounded-xl border-l-4 border-teal-600 text-sm italic text-slate-700 mb-8 leading-relaxed">
              <strong>Tóm tắt y khoa:</strong> {activeArticle.summary}
            </div>

            <div className="space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed mb-8">
              {activeArticle.content.map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-slate-900 pt-4 pb-1 text-teal-900 border-b border-teal-100">
                      {paragraph.replace('## ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-lg font-bold text-slate-800 pt-3 pb-1">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="p-4 my-3 bg-sky-50 border-l-4 border-sky-500 rounded-r-lg text-slate-700 italic text-sm">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-slate-400" />
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={onOpenConsultation}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Nhận tư vấn y khoa liên quan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'Tất cả chủ đề' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, chủ đề..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Article Cover Thumbnail */}
                <div
                  onClick={() => setSelectedArticleId(article.id)}
                  className="relative aspect-video w-full overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={article.coverImage || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800'}
                    alt={article.coverImageAlt || article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {article.category}
                    </span>
                  </div>
                  {article.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                        Tiêu điểm
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 pb-0">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedArticleId(article.id)}
                    className="font-bold text-slate-900 text-base mb-2.5 group-hover:text-teal-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedArticleId(article.id)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-teal-600 text-slate-700 hover:text-white font-bold text-xs rounded-xl border border-slate-200 hover:border-teal-600 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Đọc Toàn Bộ Bài Viết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
