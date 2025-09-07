// ===============================
// FILE: lib/qa-data.js
// بيانات وهمية + أدوات مساعدة للتاريخ
// ===============================
const SAMPLE_QS = [
  "هل وصل الفريق في الوقت المحدد؟",
  "هل كان الفريق مهذباً ومحترفاً؟",
  "هل شرحوا كيفية استخدام الخدمة؟",
  "هل تركوا منزلك نظيفاً؟",
  "هل تعكس سرعة الإنترنت الخطة والخدمة المختارة؟",
  "قيّم جودة التركيب (1–5 نجوم)",
  "قيّم مدى تعاون الفريق (1–5 نجوم)",
  "هل توصي بخدمة JetFiber للآخرين؟ (نعم/لا)",
  "نص مفتوح: ما أكثر ما أعجبك؟",
  "نص مفتوح: ما الذي يمكن تحسينه؟",
  "ملاحظات إضافية",
];

function makeFeedback(id, customer, offsetDays) {
  const items = SAMPLE_QS.map((q, idx) => ({
    question: q,
    answer:
      idx === SAMPLE_QS.length - 1
        ? [
            "تم كل شيء بسلاسة، شكراً لكم!",
            "تأخير بسيط ولكن راضٍ بشكل عام.",
            "الفنيون كانوا مهذبين وفعّالين.",
          ][id % 3]
        : ["نعم", "لا"][(id + idx) % 2],
  }));
  const when = new Date();
  when.setDate(when.getDate() - offsetDays);
  return {
    id: id.toString().padStart(4, "0"),
    customerName: customer,
    timestamp: when.toISOString(),
    items,
  };
}

export const DUMMY_FEEDBACK = [
  makeFeedback(1, "دانا كوهين", 0),
  makeFeedback(2, "آفي ليفي", 1),
  makeFeedback(3, "مايا كاتس", 2),
  makeFeedback(4, "يوسف ن.", 3),
  makeFeedback(5, "ليؤور ح.", 4),
  makeFeedback(6, "سارة م.", 6),
  makeFeedback(7, "عمري ر.", 7),
  makeFeedback(8, "بلال ش.", 8),
  makeFeedback(9, "نوعا ب.", 10),
  makeFeedback(10, "حسن ع.", 12),
  makeFeedback(11, "ريفكا ك.", 13),
  makeFeedback(12, "نادية ب.", 15),
];
// replace your formatDate with this:
export function formatDate(iso) {
  const d = new Date(iso);
  // Force Arabic locale + LATIN digits so SSR and client match
  return new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
