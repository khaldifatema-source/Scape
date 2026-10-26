import { MLStage, QuestionChallenge, GameSettings } from '../types/game';

export const DEFAULT_CHALLENGE_1: QuestionChallenge = {
  id: 'lock-1',
  lockNumber: 1,
  title: 'سر البيانات',
  scenario: 'دُرّب نموذج ذكاء اصطناعي على صور الزهور فقط، ثم طُلب منه التعرف على الأشجار. ما المشكلة الأساسية؟',
  options: [
    { id: 'a', text: 'أ. البيانات لا تمثل المهمة المطلوبة.' },
    { id: 'b', text: 'ب. النموذج يحتاج إلى شاشة أكبر.' },
    { id: 'c', text: 'ج. يجب تغيير لون واجهة البرنامج.' },
  ],
  correctOptionId: 'a',
  successMessage: 'ممتاز! اكتشفتِ سر البيانات، فُتح القفل الأول.',
  hintMessage: 'تلميح ذكي: فكّري في طبيعة البيانات التي تعلّم منها النموذج! إذا رأى الحاسوب زهورًا فقط، فهل يملك أي خبرة أو خصائص تمكّنه من التعرف على الأشجار؟ جودة وملاءمة البيانات هي الأساس.',
  educationalNote: 'جودة البيانات وتمثيلها للمهمة المطلوبة (Data Representativeness) شرط أساسي لنجاح نموذج الذكاء الاصطناعي، فالنموذج يتعلم فقط مما يقدَّم له من بيانات.',
};

export const DEFAULT_ML_STAGES: MLStage[] = [
  {
    id: 'stage-collect',
    name: 'جمع البيانات',
    description: 'الحصول على البيانات الخام المتنوعة المتعلقة بالمشكلة من مصادر موثوقة.',
    correctIndex: 0,
  },
  {
    id: 'stage-preprocess',
    name: 'معالجة البيانات وتجهيزها',
    description: 'تنظيف البيانات وإزالة الأخطاء وتحويلها لصيغة رقمية يفهمها النموذج.',
    correctIndex: 1,
  },
  {
    id: 'stage-train',
    name: 'تدريب النموذج',
    description: 'تغذية الخوارزمية بالبيانات لتتعلم الأنماط والعلاقات والميزات.',
    correctIndex: 2,
  },
  {
    id: 'stage-evaluate',
    name: 'تقييم النموذج',
    description: 'اختبار دقة النموذج باستخدام بيانات جديدة لم يرها أثناء التدريب.',
    correctIndex: 3,
  },
];

export const DEFAULT_CHALLENGE_3: QuestionChallenge = {
  id: 'lock-3',
  lockNumber: 3,
  title: 'اختبار الذكاء',
  scenario: 'حقق نموذج تعلم الآلة نتائج جيدة أثناء التدريب، لكنه أخطأ في التعرف على صور جديدة لم يرها من قبل. ما الإجراء الأنسب؟',
  options: [
    { id: 'a', text: 'أ. اعتماد النموذج دون اختباره.' },
    { id: 'b', text: 'ب. تقييم النموذج باستخدام بيانات اختبار مناسبة، ثم تحليل النتائج وتحسينه عند الحاجة.' },
    { id: 'c', text: 'ج. حذف جميع البيانات.' },
  ],
  correctOptionId: 'b',
  successMessage: 'أحسنتِ! أثبتِّ قدرتك على تقييم النموذج.',
  hintMessage: 'تلميح ذكي: عندما ينجح النموذج في التدريب ويفشل مع بيانات جديدة (ظاهرة فرط التخصيص)، الإجراء السليم يكمن في اختبار أدائه بموضوعية، وتشخيص نقاط الضعف لإعادة ضبطه وتحسينه.',
  educationalNote: 'التقييم المستمر للنموذج (Model Evaluation) باستخدام بيانات اختبار مستقلة (Testing Data) يضمن قدرته على التعميم (Generalization) وحل المشكلات الحقيقية بدقة.',
};

export const DEFAULT_CHALLENGE_4: QuestionChallenge = {
  id: 'lock-4',
  lockNumber: 4,
  title: 'تطبيقات تعلم الآلة',
  scenario: 'في نظام التحكم النهائي للمختبر، عُثر على ابتكار ذكي يتمثل في «النظارات الذكية الناطقة» لمساعدة المكفوفين وضعاف البصر على التعرف على البيئة المحيطة ووصف الأشياء وتصنيفها بدقة. إلى أيٍّ من تطبيقات تعلم الآلة المعتمدة في كتاب التقنية الرقمية ينتمي هذا النظام؟',
  options: [
    { id: 'a', text: 'أ. التعرف على الصور (Image Recognition).' },
    { id: 'b', text: 'ب. الترجمة بمساعدة جهاز الحاسب (Computer-Assisted Translation).' },
    { id: 'c', text: 'ج. نماذج تعلم الآلة في التعليم (Machine Learning Models in Education).' },
    { id: 'd', text: 'د. ضغط الملفات الصوتية الرقمية.' },
  ],
  correctOptionId: 'a',
  successMessage: 'مذهل! أتقنتِ تطبيقات تعلم الآلة، وفُتح القفل الرابع والأخير!',
  hintMessage: 'تلميح ذكي: ارجعي لدرس تطبيقات تعلم الآلة في كتاب التقنية الرقمية؛ التقنية التي تعتمد على خوارزميات تصنيف محتويات الصور والكائنات ووصفها لمساعدة المكفوفين هي «التعرف على الصور» (Image Recognition).',
  educationalNote: 'وفقًا لكتاب التقنية الرقمية، يعتمد «التعرف على الصور (Image Recognition)» على خوارزميات تتعرف على محتويات الصور والكائنات وتصنيفها، وتُعد النظارات الذكية الناطقة لمساعدة المكفوفين من أبرز أمثلتها الواقعية.',
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  soundEnabled: true,
  timerMode: 'countdown',
  countdownDurationSeconds: 300, // 5 minutes
};
