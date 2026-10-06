import { BookOpen, Sparkles, PenTool, Mic, BrainCircuit, Flame, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-500/20">
              C
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Coflish
              </span>
              <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-medium">
                IELTS 7.0 Mentor
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Chuỗi 1 ngày</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Đồng hành cùng AI free-tier thông minh</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Chinh phục mục tiêu <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">IELTS 7.0</span> với lộ trình tự học kỷ luật
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Học sâu, nhớ lâu với thuật toán Spaced Repetition (SM-2), chấm điểm Writing và Speaking theo chuẩn 4 tiêu chí, tự động gom lỗi sai vào sổ tay để ôn tập có chủ đích.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/25 active:scale-[0.98]"
            >
              <span>Bắt đầu ôn tập hôm nay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all"
            >
              <span>Xem sổ lỗi sai</span>
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Flashcard & SRS */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">Flashcard Spaced Repetition</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Thuật toán SM-2 tính toán chu kỳ lặp lại tối ưu cho từng từ vựng. Trích xuất từ mới tự động từ ảnh chụp tài liệu qua OCR.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hỗ trợ Collocations & Phiên âm IPA</span>
            </div>
          </div>

          {/* Card 2: Writing Grader */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5">
              <PenTool className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">Chấm Writing IELTS</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Chấm chi tiết Task 1 & Task 2 theo đúng 4 tiêu chí official band descriptors. Chỉ rõ từng lỗi ngữ pháp và gợi ý câu viết nâng band.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Xử lý bất đồng bộ qua BullMQ Queue</span>
            </div>
          </div>

          {/* Card 3: Speaking Coach */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-5">
              <Mic className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">Mock Test Speaking AI</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Luyện thi đủ 3 Parts cùng giám khảo ảo: TTS đọc câu hỏi, Whisper transcribe giọng nói và phân tích Fluency, Grammar, Lexical Resource.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ngân hàng câu hỏi theo Topic thực tế</span>
            </div>
          </div>

          {/* Card 4: Sổ lỗi sai */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">Sổ Lỗi Sai Thông Minh</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Tự động gom mọi lỗi từ trắc nghiệm, Writing và Speaking. Sinh đề quiz ôn luyện có trọng tâm để không lặp lại lỗi cũ.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Phân loại theo Criterion chi tiết</span>
            </div>
          </div>

          {/* Card 5: Thống kê & Kỷ luật */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
              <Flame className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">Theo Dõi Thói Quen (Streak)</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Thống kê số phút học, số từ ôn và bài nộp mỗi ngày. Duy trì chuỗi học tập đều đặn hướng tới mục tiêu band 7.0.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Biểu đồ đóng góp Heatmap theo ngày</span>
            </div>
          </div>

          {/* Card 6: AI Free-Tier Resilient */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">Hạ Tầng AI Tiết Kiệm</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Tối ưu chi phí tối đa: Gemini API primary, fallback sang Groq, kết quả câu hỏi tương tự được cache Redis trong 24 giờ.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zod Schema Validation & Rate Limiting</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Coflish — Hệ thống tự học IELTS 7.0 cùng AI.</p>
      </footer>
    </div>
  );
}
