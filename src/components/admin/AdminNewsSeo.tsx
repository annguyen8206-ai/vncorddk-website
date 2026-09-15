import React, { useState, useEffect, useRef } from 'react';
import { NewsArticle } from '../../types';
import { loadArticles, saveArticles, resetArticles } from '../../store/apiStore';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Edit3,
  Globe,
  Sparkles,
  ArrowLeft,
  Save,
  Tag,
  Calendar,
  User,
  Clock,
  Image as ImageIcon,
  Upload,
  Share2,
  RotateCcw,
  Heading2,
  List,
  Quote,
  Check,
  X,
  Smartphone,
  Monitor,
  ExternalLink,
} from 'lucide-react';

// Curated high-resolution medical stock images suitable for stem cell banking
const MEDICAL_IMAGE_PRESETS = [
  {
    title: 'Phòng Lab Tế Bào Vi Sinh',
    category: 'Công nghệ & Lab',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200',
    alt: 'Phòng xét nghiệm và nuôi cấy tế bào gốc vi sinh đạt chuẩn sạch',
  },
  {
    title: 'Bác Sĩ & Mạng Lưới Bệnh Viện',
    category: 'Liên kết bệnh viện',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    alt: 'Bác sĩ và chuyên viên thu thập mẫu tế bào gốc cuống rốn tại bệnh viện phụ sản',
  },
  {
    title: 'Tế Bào Miễn Dịch NK',
    category: 'Miễn dịch học',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200',
    alt: 'Nuôi cấy và hoạt hóa tế bào miễn dịch tự nhiên Natural Killer NK',
  },
  {
    title: 'Tư Vấn Mẹ Bầu Trước Sinh',
    category: 'Cẩm nang sản phụ',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
    alt: 'Bác sĩ sản khoa tư vấn thủ tục lưu trữ tế bào gốc cho mẹ bầu',
  },
  {
    title: 'Hệ Thống Bình Trữ Nitơ -196°C',
    category: 'Bảo quản sinh học',
    url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200',
    alt: 'Bình trữ nitơ lỏng âm 196 độ C bảo quản tế bào gốc lâu dài',
  },
  {
    title: 'Kính Hiển Vi Quang Học & Tế Bào',
    category: 'Nghiên cứu khoa học',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    alt: 'Quan sát và định lượng tế bào gốc sống dưới kính hiển vi',
  },
  {
    title: 'Bộ Kít Vô Trùng Phòng Sinh',
    category: 'Thu thập mẫu',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    alt: 'Bộ kít chuyên dụng thu thập máu và mô dây rốn vô trùng',
  },
  {
    title: 'Đội Ngũ Bác Sĩ & Chuyên Gia',
    category: 'Chuyên môn Y khoa',
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200',
    alt: 'Hội đồng cố vấn y khoa và chuyên gia công nghệ tế bào gốc',
  },
];

export const AdminNewsSeo: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(loadArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Partial<NewsArticle> | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [previewTab, setPreviewTab] = useState<'google' | 'social'>('google');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [showPresetGallery, setShowPresetGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setArticles(loadArticles());
    };
    window.addEventListener('vncord_articles_updated', handleUpdate);
    return () => window.removeEventListener('vncord_articles_updated', handleUpdate);
  }, []);

  const categories = [
    'Nghiên cứu & Ứng dụng',
    'Hợp tác y tế',
    'Công nghệ tế bào',
    'Cẩm nang sản phụ',
    'Tin tức y sinh',
  ];

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleCreateNew = () => {
    const defaultImg = MEDICAL_IMAGE_PRESETS[0];
    setActiveArticle({
      id: `news-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Nghiên cứu & Ứng dụng',
      date: new Date().toLocaleDateString('vi-VN'),
      readTime: '5 phút đọc',
      summary: '',
      author: 'Ban Cố vấn Y khoa VNCORD-DK',
      tags: ['Lưu trữ tế bào gốc', 'Ngân hàng mô', 'Máu cuống rốn'],
      content: [
        '## 1. Tầm quan trọng của việc lưu trữ tế bào gốc',
        'Tế bào gốc từ dây rốn của trẻ sơ sinh là nguồn tài nguyên sinh học quý giá nhất mà mẹ có thể dành tặng cho con ngay tại thời điểm chào đời. Các nghiên cứu lâm sàng đã chứng minh hiệu quả vượt trội trong điều trị hơn 80 bệnh lý nguy hiểm.',
        '## 2. Ứng dụng lâm sàng và y học tái tạo',
        'Khác với các tế bào trưởng thành, tế bào gốc trung mô (MSC) và tế bào tạo máu (HSC) có khả năng tự tái tạo và biệt hóa thành nhiều loại tế bào chức năng khác nhau trong cơ thể, giúp phục hồi các tổn thương mô và điều hòa miễn dịch.',
        '> Lời khuyên từ chuyên gia: "Việc lưu trữ tế bào gốc cuống rốn cần được đăng ký trước tuần thai thứ 36 để bộ kít vô trùng có mặt kịp thời tại phòng sinh khi chuyển dạ."',
      ],
      featured: false,
      metaTitle: '',
      metaDescription: '',
      focusKeyword: 'Lưu trữ tế bào gốc',
      coverImage: defaultImg.url,
      coverImageAlt: 'Quy trình lưu trữ tế bào gốc cuống rốn chuẩn y khoa tại VNCORD-DK',
      coverImageCaption: 'Hệ thống phòng sạch và thiết bị hiện đại tại Ngân hàng mô VNCORD-DK',
      seoScore: 85,
      published: true,
    });
    setIsEditing(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setActiveArticle({
      ...article,
      slug: article.slug || generateSlug(article.title),
      metaTitle: article.metaTitle || `${article.title.slice(0, 55)} | VNCORD-DK`,
      metaDescription: article.metaDescription || article.summary.slice(0, 155),
      focusKeyword: article.focusKeyword || article.tags?.[0] || 'tế bào gốc',
      coverImage: article.coverImage || MEDICAL_IMAGE_PRESETS[0].url,
      coverImageAlt: article.coverImageAlt || article.title,
      coverImageCaption: article.coverImageCaption || '',
      published: article.published !== false,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      const updated = articles.filter((a) => a.id !== id);
      setArticles(updated);
      saveArticles(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Khôi phục danh sách 4 bài viết mẫu chuẩn SEO kèm ảnh đại diện chất lượng cao?')) {
      const restored = resetArticles();
      setArticles(restored);
      setSaveSuccessMessage('Đã khôi phục dữ liệu bài viết mẫu thành công!');
      setTimeout(() => setSaveSuccessMessage(''), 3000);
    }
  };

  const handleTitleChange = (val: string) => {
    if (!activeArticle) return;
    const newSlug = generateSlug(val);
    setActiveArticle((prev) => ({
      ...prev,
      title: val,
      slug: prev?.slug && prev.slug !== generateSlug(prev?.title || '') ? prev.slug : newSlug,
      metaTitle: prev?.metaTitle ? prev.metaTitle : `${val.slice(0, 55)} | VNCORD-DK`,
    }));
  };

  // Smart 1-Click SEO Auto-Optimizer
  const handleAutoOptimizeSeo = () => {
    if (!activeArticle?.title) {
      alert('Vui lòng nhập tiêu đề bài viết trước khi tối ưu SEO.');
      return;
    }
    const kw = (activeArticle.focusKeyword || activeArticle.tags?.[0] || 'tế bào gốc').trim();
    const title = activeArticle.title;
    const summary = activeArticle.summary || '';
    const generatedSlug = generateSlug(title);

    // Ensure keyword is nicely formatted into meta tags
    let metaT = `${title.slice(0, 50)} | VNCORD-DK`;
    if (kw && !metaT.toLowerCase().includes(kw.toLowerCase())) {
      metaT = `${title.slice(0, 35)} - ${kw} | VNCORD-DK`;
    }

    let metaD = summary.slice(0, 155);
    if (!metaD) {
      metaD = `Tìm hiểu về ${kw} tại VNCORD-DK: quy trình chuẩn y khoa, an toàn sinh học và ứng dụng y học tái tạo bảo vệ sức khỏe gia đình.`;
    } else if (kw && !metaD.toLowerCase().includes(kw.toLowerCase())) {
      metaD = `${metaD.slice(0, 120)} - Thông tin ${kw} chuẩn y sinh VNCORD-DK.`;
    }

    const autoAlt = activeArticle.coverImageAlt || `${kw} - ${title.slice(0, 40)} tại VNCORD-DK`;

    setActiveArticle((prev) => ({
      ...prev,
      slug: prev?.slug || generatedSlug,
      metaTitle: metaT,
      metaDescription: metaD,
      coverImageAlt: autoAlt,
    }));
  };

  // Handle local image file upload (converts to base64 data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn một tệp hình ảnh hợp lệ (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert('Kích thước ảnh nên nhỏ hơn 4MB để tối ưu tốc độ tải trang.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setActiveArticle((prev) => ({
        ...prev,
        coverImage: dataUrl,
        coverImageAlt: prev?.coverImageAlt || `Ảnh bài viết: ${prev?.title || 'VNCORD-DK'}`,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Insert content block helper
  const insertContentBlock = (type: 'h2' | 'h3' | 'list' | 'quote' | 'cta') => {
    if (!activeArticle) return;
    const current = activeArticle.content || [];
    let newBlock = '';

    switch (type) {
      case 'h2':
        newBlock = `## Tiêu đề phụ H2 chứa từ khóa: ${(activeArticle.focusKeyword || 'Y học tái tạo')}`;
        break;
      case 'h3':
        newBlock = `### Tiêu đề con H3 phân tích chi tiết`;
        break;
      case 'list':
        newBlock = `• Ưu điểm 1: Đạt tiêu chuẩn quốc tế\n• Ưu điểm 2: Quy trình thu thập vô trùng 24/7\n• Ưu điểm 3: Bảo hiểm sinh học trọn đời`;
        break;
      case 'quote':
        newBlock = `> Lời khuyên bác sĩ: "Lưu trữ tế bào gốc ngay khi sinh là cơ hội duy nhất không thể lặp lại trong đời."`;
        break;
      case 'cta':
        newBlock = `[CTA] Đăng ký nhận tư vấn chuyên sâu cùng Bác sĩ VNCORD-DK qua hotline 24/7: 1900 292 988.`;
        break;
    }

    setActiveArticle((prev) => ({
      ...prev,
      content: [...(prev?.content || []), newBlock],
    }));
  };

  // Full 10-criteria SEO Audit Calculation
  const runSeoAudit = () => {
    if (!activeArticle) {
      return {
        score: 0,
        checks: [],
        wordCount: 0,
        density: 0,
        occurrences: 0,
      };
    }

    const kw = (activeArticle.focusKeyword || '').toLowerCase().trim();
    const title = (activeArticle.title || '').toLowerCase();
    const metaTitle = (activeArticle.metaTitle || '').toLowerCase();
    const metaDesc = (activeArticle.metaDescription || '').toLowerCase();
    const slug = (activeArticle.slug || '').toLowerCase();
    const summary = (activeArticle.summary || '').toLowerCase();
    const contentText = (activeArticle.content || []).join(' ');
    const fullTextLower = `${summary} ${contentText}`.toLowerCase();

    // Word count (Vietnamese / English words)
    const words = fullTextLower.trim() ? fullTextLower.trim().split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    // Keyword density
    let occurrences = 0;
    if (kw) {
      const regex = new RegExp(kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
      const matches = fullTextLower.match(regex);
      occurrences = matches ? matches.length : 0;
    }
    const kwWords = kw ? kw.split(/\s+/).length : 1;
    const density = wordCount > 0 && occurrences > 0 ? ((occurrences * kwWords) / wordCount) * 100 : 0;

    // Checks list
    const checks = [
      {
        id: 'h1',
        title: 'Tiêu đề H1 chứa từ khóa chính',
        passed: !!(kw && title.includes(kw)),
        points: 15,
        tip: 'Đặt từ khóa chính trong tiêu đề bài viết để Google nhận diện chủ đề cốt lõi.',
      },
      {
        id: 'meta_title',
        title: 'Meta Title chuẩn SEO (40 - 65 ký tự, chứa từ khóa)',
        passed: !!(kw && metaTitle.includes(kw) && metaTitle.length >= 35 && metaTitle.length <= 65),
        points: 10,
        tip: `Hiện tại: ${metaTitle.length}/65 ký tự. Độ dài lý tưởng là 40-65 ký tự để không bị cắt bớt trên Google.`,
      },
      {
        id: 'meta_desc',
        title: 'Meta Description thu hút (120 - 165 ký tự, chứa từ khóa)',
        passed: !!(kw && metaDesc.includes(kw) && metaDesc.length >= 110 && metaDesc.length <= 165),
        points: 10,
        tip: `Hiện tại: ${metaDesc.length}/165 ký tự. Đoạn mô tả hiển thị tốt nhất trên kết quả tìm kiếm khi đạt 120-160 ký tự.`,
      },
      {
        id: 'slug',
        title: 'Đường dẫn tĩnh (Slug URL) ngắn gọn, chứa từ khóa',
        passed: !!(slug && (!kw || slug.includes(generateSlug(kw)))),
        points: 10,
        tip: 'URL thân thiện SEO không dấu, phân tách bằng gạch ngang và chứa từ khóa chính.',
      },
      {
        id: 'intro',
        title: 'Từ khóa xuất hiện trong đoạn mở bài (Sapo)',
        passed: !!(kw && summary.includes(kw)),
        points: 10,
        tip: 'Google đánh giá cao bài viết giới thiệu ngay từ khóa trong 100 từ đầu tiên.',
      },
      {
        id: 'cover_image',
        title: 'Có Ảnh Đại Diện (Featured Image) tỉ lệ chuẩn',
        passed: !!(activeArticle.coverImage && activeArticle.coverImage.trim().length > 5),
        points: 10,
        tip: 'Ảnh đại diện giúp tăng CTR trên Google Discover, mạng xã hội và cải thiện trải nghiệm đọc.',
      },
      {
        id: 'image_alt',
        title: 'Thẻ Alt của ảnh đại diện chứa từ khóa (Google Image SEO)',
        passed: !!(
          activeArticle.coverImage &&
          activeArticle.coverImageAlt &&
          kw &&
          activeArticle.coverImageAlt.toLowerCase().includes(kw)
        ),
        points: 10,
        tip: 'Google bot không "nhìn" được ảnh, thẻ Alt mô tả ảnh giúp bài viết xếp hạng trên Google Hình Ảnh.',
      },
      {
        id: 'headings',
        title: 'Cấu trúc bài viết có phân mục Tiêu đề phụ (H2/H3)',
        passed: (activeArticle.content || []).some((p) => p.startsWith('## ') || p.startsWith('### ')),
        points: 10,
        tip: 'Chia nhỏ bài viết bằng các thẻ H2 (##) giúp người đọc dễ theo dõi và Google hiểu cấu trúc bài.',
      },
      {
        id: 'density',
        title: 'Mật độ từ khóa đạt chuẩn tự nhiên (1.0% - 3.0%)',
        passed: density >= 0.8 && density <= 3.5,
        points: 10,
        tip: `Mật độ hiện tại: ${density.toFixed(1)}% (${occurrences} lần). Dưới 0.8% là hơi ít, trên 3.5% dễ bị phạt nhồi từ khóa.`,
      },
      {
        id: 'content_length',
        title: 'Độ dài bài viết đạt chuẩn Y học YMYL (> 200 từ)',
        passed: wordCount >= 180,
        points: 5,
        tip: `Độ dài hiện tại: ${wordCount} từ. Bài viết y khoa chuyên sâu nên từ 300 - 800 từ để được xếp hạng cao.`,
      },
    ];

    const score = checks.reduce((sum, c) => (c.passed ? sum + c.points : sum), 0);

    return {
      score: Math.min(100, Math.max(0, score)),
      checks,
      wordCount,
      density,
      occurrences,
    };
  };

  const auditResult = runSeoAudit();

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle?.title?.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết!');
      return;
    }

    const calculatedScore = auditResult.score;
    const articleToSave: NewsArticle = {
      id: activeArticle.id || `news-${Date.now()}`,
      title: activeArticle.title || 'Bài viết chưa đặt tên',
      slug: activeArticle.slug || generateSlug(activeArticle.title || ''),
      category: activeArticle.category || 'Nghiên cứu & Ứng dụng',
      date: activeArticle.date || new Date().toLocaleDateString('vi-VN'),
      readTime: activeArticle.readTime || `${Math.max(2, Math.ceil(auditResult.wordCount / 180))} phút đọc`,
      summary: activeArticle.summary || '',
      author: activeArticle.author || 'Ban Cố vấn Y khoa VNCORD-DK',
      tags:
        typeof activeArticle.tags === 'string'
          ? (activeArticle.tags as string).split(',').map((t: string) => t.trim())
          : activeArticle.tags || ['Y học tái tạo'],
      content:
        Array.isArray(activeArticle.content) && activeArticle.content.length > 0
          ? activeArticle.content
          : [activeArticle.summary || 'Nội dung chi tiết đang được cập nhật.'],
      featured: !!activeArticle.featured,
      metaTitle: activeArticle.metaTitle || `${activeArticle.title} | VNCORD-DK`,
      metaDescription: activeArticle.metaDescription || activeArticle.summary?.slice(0, 155) || '',
      focusKeyword: activeArticle.focusKeyword || '',
      seoScore: calculatedScore,
      published: activeArticle.published !== false,
      coverImage: activeArticle.coverImage || MEDICAL_IMAGE_PRESETS[0].url,
      coverImageAlt: activeArticle.coverImageAlt || activeArticle.title,
      coverImageCaption: activeArticle.coverImageCaption || '',
    };

    const existingIndex = articles.findIndex((a) => a.id === articleToSave.id);
    let updated: NewsArticle[];
    if (existingIndex >= 0) {
      updated = [...articles];
      updated[existingIndex] = articleToSave;
    } else {
      updated = [articleToSave, ...articles];
    }

    setArticles(updated);
    saveArticles(updated);
    setIsEditing(false);
    setActiveArticle(null);
    setSaveSuccessMessage('Đã lưu và xuất bản bài viết chuẩn SEO thành công!');
    setTimeout(() => setSaveSuccessMessage(''), 3500);
  };

  const filteredArticles = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.tags && a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* VIEW 1: ARTICLE LIST */}
      {!isEditing ? (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Quản Lý Tin Tức & Bài Viết SEO</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {articles.length} bài
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Hệ thống biên tập bài viết chuẩn SEO y tế YMYL 2025: Quản lý ảnh đại diện, tối ưu thẻ meta và bộ lọc Google
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition-all cursor-pointer"
                title="Khôi phục 4 bài viết mẫu chuẩn SEO kèm ảnh chất lượng cao"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi Phục Mẫu</span>
              </button>
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Viết Bài Chuẩn SEO Mới</span>
              </button>
            </div>
          </div>

          {saveSuccessMessage && (
            <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {/* Filters Bar */}
          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết, từ khóa, tag..."
                className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-400 text-xs rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Tất cả ({articles.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Table of Articles with Cover Image Thumbnail */}
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 uppercase font-bold tracking-wider">
                    <th className="py-3 px-4 w-28">Ảnh đại diện</th>
                    <th className="py-3 px-4">Bài viết & Tiêu đề</th>
                    <th className="py-3 px-4">Chuyên mục</th>
                    <th className="py-3 px-4 text-center">Điểm SEO</th>
                    <th className="py-3 px-4">Từ khóa chính</th>
                    <th className="py-3 px-4">Ngày đăng</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-slate-400">
                        Không tìm thấy bài viết nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredArticles.map((article) => {
                      const score = article.seoScore || 85;
                      const hasImage = !!article.coverImage;
                      return (
                        <tr key={article.id} className="hover:bg-slate-50/80 transition-colors group">
                          {/* Thumbnail Column */}
                          <td className="py-3 px-4">
                            <div className="w-20 h-13 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative shadow-2xs">
                              {hasImage ? (
                                <img
                                  src={article.coverImage}
                                  alt={article.coverImageAlt || article.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-amber-500 bg-amber-50 text-[9px] font-bold p-1 text-center">
                                  <AlertCircle className="w-4 h-4 mb-0.5" />
                                  <span>Thiếu ảnh</span>
                                </div>
                              )}
                              {article.featured && (
                                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white" title="Tiêu điểm" />
                              )}
                            </div>
                          </td>

                          {/* Title & Slug */}
                          <td className="py-3 px-4 max-w-sm">
                            <div
                              onClick={() => handleEdit(article)}
                              className="font-bold text-slate-900 line-clamp-2 hover:text-sky-600 cursor-pointer"
                            >
                              {article.title}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 font-mono flex items-center gap-1">
                              <span>/tin-tuc/{article.slug || generateSlug(article.title)}</span>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                              {article.category}
                            </span>
                          </td>

                          {/* SEO Score */}
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                score >= 85
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : score >= 70
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>{score}/100</span>
                            </span>
                          </td>

                          {/* Focus Keyword */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="text-slate-700 font-medium bg-teal-50 text-teal-800 px-2 py-0.5 rounded-sm border border-teal-100 text-[11px]">
                              {article.focusKeyword || article.tags?.[0] || 'Tế bào gốc'}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                            {article.date}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleEdit(article)}
                                className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-md transition-colors cursor-pointer"
                                title="Chỉnh sửa bài viết & SEO"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                                title="Xóa bài viết"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* VIEW 2: COMPLETE SEO ARTICLE EDITOR & PREVIEW */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Quay lại danh sách"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{activeArticle?.id?.startsWith('news-') && !articles.some((a) => a.id === activeArticle.id) ? 'Soạn Thảo Bài Viết Chuẩn SEO Mới' : 'Chỉnh Sửa & Tối Ưu SEO Bài Viết'}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    auditResult.score >= 85 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    SEO {auditResult.score}/100
                  </span>
                </h1>
                <p className="text-xs text-slate-400">
                  Tích hợp kiểm định 10 tiêu chuẩn Google YMYL, quản lý ảnh đại diện và xem trước kết quả tìm kiếm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAutoOptimizeSeo}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-semibold rounded-lg border border-teal-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Tự động tối ưu Meta Tags và Alt ảnh theo từ khóa chính"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Tự Động Tối Ưu SEO</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveArticle}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu & Xuất Bản Bài Viết</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2 COLUMNS: CONTENT & FEATURED IMAGE & SEO METAS */}
            <div className="lg:col-span-2 space-y-6">
              {/* SECTION 1: FEATURED IMAGE (ẢNH ĐẠI DIỆN) */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-sky-600" />
                    <span>Ảnh Đại Diện Bài Viết (Featured Image) *</span>
                  </h2>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                    Khuyến nghị: 1200 x 630 px (16:9)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Left: Image Live Preview Box */}
                  <div className="sm:col-span-1">
                    <div className="aspect-video w-full rounded-xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 relative group flex items-center justify-center">
                      {activeArticle?.coverImage ? (
                        <>
                          <img
                            src={activeArticle.coverImage}
                            alt={activeArticle.coverImageAlt || 'Ảnh đại diện bài viết'}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => setShowPresetGallery(true)}
                              className="p-1.5 bg-white/90 text-slate-800 rounded-md text-[11px] font-bold shadow-xs hover:bg-white"
                            >
                              Đổi ảnh
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveArticle((p) => ({ ...p, coverImage: '' }))}
                              className="p-1.5 bg-rose-600 text-white rounded-md text-[11px] font-bold shadow-xs hover:bg-rose-700"
                            >
                              Xóa
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-3">
                          <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                          <p className="text-[11px] font-bold text-slate-500">Chưa có ảnh đại diện</p>
                          <p className="text-[10px] text-slate-400">Chọn hoặc tải ảnh lên</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Controls to select / upload / enter URL */}
                  <div className="sm:col-span-2 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Button to open Presets Gallery */}
                      <button
                        type="button"
                        onClick={() => setShowPresetGallery(!showPresetGallery)}
                        className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                        <span>Kho Ảnh Y Tế Bản Quyền ({MEDICAL_IMAGE_PRESETS.length} ảnh)</span>
                      </button>

                      {/* Button to upload from local machine */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-slate-600" />
                        <span>Tải ảnh từ máy tính</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>

                    {/* Image URL Input */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Hoặc dán đường dẫn ảnh (Image URL) trực tiếp:
                      </label>
                      <input
                        type="text"
                        value={activeArticle?.coverImage || ''}
                        onChange={(e) => setActiveArticle((p) => ({ ...p, coverImage: e.target.value }))}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-1.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono"
                      />
                    </div>

                    {/* Image Alt Text & Caption */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Thẻ Alt ảnh (Google Image SEO) *</span>
                          <button
                            type="button"
                            onClick={() => {
                              const kw = activeArticle?.focusKeyword || 'Tế bào gốc';
                              setActiveArticle((p) => ({
                                ...p,
                                coverImageAlt: `${kw} - ${activeArticle?.title?.slice(0, 45) || 'VNCORD-DK'}`,
                              }));
                            }}
                            className="text-sky-600 hover:underline text-[10px] font-normal"
                          >
                            Tự điền theo từ khóa
                          </button>
                        </div>
                        <input
                          type="text"
                          value={activeArticle?.coverImageAlt || ''}
                          onChange={(e) => setActiveArticle((p) => ({ ...p, coverImageAlt: e.target.value }))}
                          placeholder="Mô tả hình ảnh chứa từ khóa chính..."
                          className="w-full px-3 py-1.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Chú thích ảnh (Caption hiển thị)
                        </label>
                        <input
                          type="text"
                          value={activeArticle?.coverImageCaption || ''}
                          onChange={(e) => setActiveArticle((p) => ({ ...p, coverImageCaption: e.target.value }))}
                          placeholder="Ảnh: Phòng sạch kiểm định đạt chuẩn..."
                          className="w-full px-3 py-1.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preset Gallery Dropdown / Modal Grid */}
                {showPresetGallery && (
                  <div className="pt-3 border-t border-slate-100 animate-in fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">
                        Nhấp vào ảnh để chọn làm Ảnh đại diện bài viết:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPresetGallery(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs"
                      >
                        Đóng lại ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {MEDICAL_IMAGE_PRESETS.map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setActiveArticle((p) => ({
                              ...p,
                              coverImage: preset.url,
                              coverImageAlt: preset.alt,
                              coverImageCaption: preset.title,
                            }));
                            setShowPresetGallery(false);
                          }}
                          className={`group rounded-lg overflow-hidden border transition-all cursor-pointer relative bg-slate-100 ${
                            activeArticle?.coverImage === preset.url
                              ? 'ring-2 ring-sky-500 border-sky-500'
                              : 'border-slate-200 hover:border-sky-400'
                          }`}
                        >
                          <div className="aspect-video w-full overflow-hidden">
                            <img
                              src={preset.url}
                              alt={preset.alt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-1.5 bg-white text-[10px]">
                            <div className="font-bold text-slate-800 truncate">{preset.title}</div>
                            <div className="text-slate-400 text-[9px] truncate">{preset.category}</div>
                          </div>
                          {activeArticle?.coverImage === preset.url && (
                            <div className="absolute top-1 right-1 bg-sky-600 text-white rounded-full p-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: PRIMARY ARTICLE CONTENT (TIÊU ĐỀ & NỘI DUNG) */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200 space-y-5">
                <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>Nội Dung Bài Viết & Cấu Trúc Headings (H1, H2, H3)</span>
                </h2>

                {/* Title (H1) */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <label className="font-bold text-slate-700">
                      Tiêu Đề Bài Viết (Thẻ H1 chính) *
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {(activeArticle?.title || '').length} ký tự
                    </span>
                  </div>
                  <input
                    type="text"
                    value={activeArticle?.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="VD: Hội thảo khoa học: Bước tiến mới trong lưu trữ tế bào gốc dây rốn..."
                    className="w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-semibold"
                  />
                </div>

                {/* Slug URL */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Đường dẫn tĩnh thân thiện SEO (Slug URL)</span>
                  </label>
                  <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden bg-slate-50 text-xs">
                    <span className="px-3 text-slate-400 bg-slate-100 border-r border-slate-300 py-2.5 select-none">
                      https://vncorddk.com/tin-tuc/
                    </span>
                    <input
                      type="text"
                      value={activeArticle?.slug || ''}
                      onChange={(e) => setActiveArticle((prev) => ({ ...prev, slug: e.target.value }))}
                      className="grow px-3 py-2 text-slate-800 bg-white font-mono focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Chuyên Mục Y Tế
                    </label>
                    <select
                      value={activeArticle?.category || 'Nghiên cứu & Ứng dụng'}
                      onChange={(e) => setActiveArticle((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Thời Gian Đọc Ước Tính
                    </label>
                    <input
                      type="text"
                      value={activeArticle?.readTime || '5 phút đọc'}
                      onChange={(e) => setActiveArticle((prev) => ({ ...prev, readTime: e.target.value }))}
                      className="w-full px-3 py-2 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Summary (Sapo / Mở đầu 100 từ) */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <label className="font-bold text-slate-700">
                      Đoạn Mở Bài / Sapo Bài Viết (Quan trọng cho SEO 100 từ đầu tiên) *
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {(activeArticle?.summary || '').split(/\s+/).filter(Boolean).length} từ
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={activeArticle?.summary || ''}
                    onChange={(e) => setActiveArticle((prev) => ({ ...prev, summary: e.target.value }))}
                    placeholder="Mô tả ngắn gọn nội dung cốt lõi của bài viết trong 2-3 câu, chứa từ khóa chính ngay đoạn đầu..."
                    className="w-full px-3 py-2 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 leading-relaxed"
                  />
                </div>

                {/* Content Editor with Formatting Helpers */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-700">
                      Nội Dung Bài Viết Chi Tiết (Phân tách các đoạn bằng 2 lần xuống dòng)
                    </label>
                    {/* Toolbar buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => insertContentBlock('h2')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title="Chèn tiêu đề phụ Heading 2"
                      >
                        <Heading2 className="w-3.5 h-3.5 text-sky-600" />
                        <span>+ Tiêu đề H2</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertContentBlock('list')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title="Chèn danh sách gạch đầu dòng"
                      >
                        <List className="w-3.5 h-3.5 text-emerald-600" />
                        <span>+ Danh sách</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertContentBlock('quote')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title="Chèn trích dẫn ý kiến chuyên gia y tế"
                      >
                        <Quote className="w-3.5 h-3.5 text-amber-600" />
                        <span>+ Trích dẫn</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={10}
                    value={(activeArticle?.content || []).join('\n\n')}
                    onChange={(e) =>
                      setActiveArticle((prev) => ({
                        ...prev,
                        content: e.target.value.split('\n\n').filter((p) => p.trim() !== ''),
                      }))
                    }
                    placeholder="Nhập nội dung bài viết chi tiết... Sử dụng ## ở đầu dòng để tạo Tiêu đề phụ Heading 2."
                    className="w-full px-3.5 py-3 text-xs leading-relaxed text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-sans"
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5">
                    <span>Thống kê: {auditResult.wordCount} từ | Mật độ từ khóa: {auditResult.density.toFixed(1)}%</span>
                    <span>Hỗ trợ: ## Tiêu đề H2 | ### Tiêu đề H3 | &gt; Trích dẫn</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: SEO META TAGS & SERP PREVIEW */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>Cấu Hình Thẻ Meta SEO & Xem Trước Hiển Thị</span>
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('google')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                        previewTab === 'google' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Google SERP
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('social')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                        previewTab === 'social' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Facebook / Zalo
                    </button>
                  </div>
                </div>

                {/* Focus Keyword */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Từ Khóa Chính Cần Xếp Hạng (Focus Keyword) *
                  </label>
                  <input
                    type="text"
                    value={activeArticle?.focusKeyword || ''}
                    onChange={(e) => setActiveArticle((prev) => ({ ...prev, focusKeyword: e.target.value }))}
                    placeholder="VD: lưu trữ tế bào gốc, tế bào gốc msc, ngân hàng mô cuống rốn..."
                    className="w-full px-3 py-2 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-bold text-teal-800"
                  />
                </div>

                {/* Meta Title */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <label className="font-bold text-slate-700">Meta Title (Tiêu đề Google Tìm Kiếm)</label>
                    <span
                      className={`text-[11px] font-mono ${
                        (activeArticle?.metaTitle || '').length > 60
                          ? 'text-amber-600 font-bold'
                          : (activeArticle?.metaTitle || '').length < 35
                          ? 'text-slate-400'
                          : 'text-emerald-600 font-bold'
                      }`}
                    >
                      {(activeArticle?.metaTitle || '').length}/65 ký tự (Lý tưởng: 45 - 60)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={activeArticle?.metaTitle || ''}
                    onChange={(e) => setActiveArticle((prev) => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="Tiêu đề hiển thị trên Google..."
                    className="w-full px-3 py-2 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <label className="font-bold text-slate-700">Meta Description (Mô tả tóm tắt tìm kiếm)</label>
                    <span
                      className={`text-[11px] font-mono ${
                        (activeArticle?.metaDescription || '').length > 165
                          ? 'text-amber-600 font-bold'
                          : (activeArticle?.metaDescription || '').length < 110
                          ? 'text-slate-400'
                          : 'text-emerald-600 font-bold'
                      }`}
                    >
                      {(activeArticle?.metaDescription || '').length}/165 ký tự (Lý tưởng: 120 - 160)
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={activeArticle?.metaDescription || ''}
                    onChange={(e) => setActiveArticle((prev) => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="Mô tả tóm tắt thu hút người tìm kiếm nhấp vào bài viết..."
                    className="w-full px-3 py-2 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 leading-relaxed"
                  />
                </div>

                {/* VISUAL PREVIEW: GOOGLE SERP OR SOCIAL SHARE */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {previewTab === 'google' ? 'Xem trước kết quả Google (SERP Preview)' : 'Xem trước chia sẻ Facebook / Zalo'}
                    </span>
                    {previewTab === 'google' && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewDevice('mobile')}
                          className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-slate-200 text-slate-800' : 'text-slate-400'}`}
                          title="Giao diện di động"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewDevice('desktop')}
                          className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-slate-200 text-slate-800' : 'text-slate-400'}`}
                          title="Giao diện máy tính"
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Google Preview with Thumbnail */}
                  {previewTab === 'google' ? (
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs font-sans space-y-1.5">
                      <div className="text-[12px] text-slate-600 flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px] font-bold">V</div>
                        <span className="font-medium text-slate-900">VNCORD-DK</span>
                        <span>›</span>
                        <span>tin-tuc</span>
                        <span>›</span>
                        <span className="truncate text-slate-500">{activeArticle?.slug || 'tieu-de-bai-viet'}</span>
                      </div>

                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-1 leading-snug">
                            {activeArticle?.metaTitle || activeArticle?.title || 'Tiêu đề bài viết hiển thị trên Google'}
                          </div>
                          <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {activeArticle?.metaDescription || activeArticle?.summary || 'Mô tả bài viết sẽ xuất hiện ở đây khi hiển thị trên trang tìm kiếm Google...'}
                          </div>
                        </div>

                        {/* Google SERP Thumbnail */}
                        {activeArticle?.coverImage && (
                          <div className="w-20 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                            <img
                              src={activeArticle.coverImage}
                              alt={activeArticle.coverImageAlt || 'Thumbnail'}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Social Share Preview (Facebook / Zalo) */
                    <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-2xs max-w-md mx-auto">
                      <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                        {activeArticle?.coverImage ? (
                          <img
                            src={activeArticle.coverImage}
                            alt={activeArticle.coverImageAlt || 'Cover'}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            Chưa có ảnh chia sẻ
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-slate-50 border-t border-slate-200">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">VNCORD-DK.VN</div>
                        <div className="text-sm font-bold text-slate-900 line-clamp-2 mt-0.5">
                          {activeArticle?.metaTitle || activeArticle?.title || 'Tiêu đề bài viết'}
                        </div>
                        <div className="text-xs text-slate-600 line-clamp-2 mt-1">
                          {activeArticle?.metaDescription || activeArticle?.summary || 'Tóm tắt bài viết chia sẻ...'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: REAL-TIME SEO AUDIT & PUBLISHING META */}
            <div className="space-y-6">
              {/* REAL-TIME SEO AUDIT CARD */}
              <div className="bg-white rounded-xl shadow-xl p-5 border border-slate-200 sticky top-4">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <h3 className="text-sm font-bold text-slate-800">Kiểm Định Điểm SEO</h3>
                  </div>
                  <span
                    className={`text-base font-black px-3 py-0.5 rounded-full ${
                      auditResult.score >= 85
                        ? 'bg-emerald-100 text-emerald-800'
                        : auditResult.score >= 70
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {auditResult.score} / 100
                  </span>
                </div>

                {/* Score Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full transition-all duration-300 ${
                      auditResult.score >= 85
                        ? 'bg-emerald-500'
                        : auditResult.score >= 70
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${auditResult.score}%` }}
                  />
                </div>

                {/* Audit Checklist */}
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Danh Sách 10 Tiêu Chí Chuẩn YMYL
                  </div>

                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {auditResult.checks.map((check) => (
                      <div
                        key={check.id}
                        className={`p-2.5 rounded-lg border text-xs transition-colors ${
                          check.passed
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {check.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          <div className="grow">
                            <div className="font-bold flex items-center justify-between">
                              <span>{check.title}</span>
                              <span className="text-[10px] font-normal text-slate-400">+{check.points}đ</span>
                            </div>
                            {!check.passed && (
                              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                                {check.tip}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Author & Tag Publishing Info */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-700">Thông Tin Xuất Bản & Tác Giả</h4>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Tác Giả (Chuyên Môn Y Sinh)
                    </label>
                    <input
                      type="text"
                      value={activeArticle?.author || ''}
                      onChange={(e) => setActiveArticle((prev) => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-1.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Thẻ Tags (phân tách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(activeArticle?.tags)
                          ? activeArticle.tags.join(', ')
                          : activeArticle?.tags || ''
                      }
                      onChange={(e) =>
                        setActiveArticle((prev) => ({
                          ...prev,
                          tags: e.target.value.split(',').map((t) => t.trim()),
                        }))
                      }
                      placeholder="Tế bào gốc, Máu cuống rốn, Y học tái tạo"
                      className="w-full px-3 py-1.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeArticle?.featured || false}
                        onChange={(e) => setActiveArticle((prev) => ({ ...prev, featured: e.target.checked }))}
                        className="rounded-sm border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
                      />
                      <span>Đặt làm Bài viết Tiêu điểm (Featured)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
