// Blog posts data for the blogs page
export interface BlogPost {
  id: number
  title: {
    en: string
    ar: string
    ru: string
  }
  category: {
    en: string
    ar: string
    ru: string
  }
  excerpt: {
    en: string
    ar: string
    ru: string
  }
  image: string
  date: string // ISO format date
  commentsCount: number
  author: {
    en: string
    ar: string
    ru: string
  }
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: {
      en: '10 Effective Tips for Quran Memorization',
      ar: '10 نصائح فعالة لحفظ القرآن الكريم',
      ru: '10 Эффективных Советов по Заучиванию Корана'
    },
    category: {
      en: 'Quran',
      ar: 'القرآن',
      ru: 'Коран'
    },
    excerpt: {
      en: 'Discover proven techniques to memorize the Quran more effectively with these practical tips from experienced scholars.',
      ar: 'اكتشف تقنيات مثبتة لحفظ القرآن بشكل أكثر فعالية مع هذه النصائح العملية من علماء ذوي خبرة.',
      ru: 'Откройте для себя проверенные методы более эффективного заучивания Корана с помощью этих практических советов от опытных ученых.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-10-15T10:00:00Z',
    commentsCount: 12,
    author: {
      en: 'Sheikh Ahmed Al-Mahmoud',
      ar: 'الشيخ أحمد المحمود',
      ru: 'Шейх Ахмед Аль-Махмуд'
    },
    slug: 'quran-memorization-tips'
  },
  {
    id: 2,
    title: {
      en: 'Understanding Tajweed: The Art of Quranic Recitation',
      ar: 'فهم التجويد: فن تلاوة القرآن',
      ru: 'Понимание Таджвида: Искусство Чтения Корана'
    },
    category: {
      en: 'Tajweed',
      ar: 'التجويد',
      ru: 'Таджвид'
    },
    excerpt: {
      en: 'Learn the fundamental rules of Tajweed and how they enhance the beauty and meaning of Quranic recitation.',
      ar: 'تعلم القواعد الأساسية للتجويد وكيف تعزز جمال ومعنى تلاوة القرآن.',
      ru: 'Изучите основные правила таджвида и то, как они усиливают красоту и смысл чтения Корана.'
    },
    image: '/img/blog/blog-02.jpg',
    date: '2024-10-12T14:30:00Z',
    commentsCount: 8,
    author: {
      en: 'Sheikh Yusuf Al-Khalil',
      ar: 'الشيخ يوسف الخليل',
      ru: 'Шейх Юсуф Аль-Халиль'
    },
    slug: 'understanding-tajweed-rules'
  },
  {
    id: 3,
    title: {
      en: 'Arabic Grammar Basics for Quran Students',
      ar: 'أساسيات النحو العربي لطلاب القرآن',
      ru: 'Основы Арабской Грамматики для Студентов Корана'
    },
    category: {
      en: 'Arabic',
      ar: 'العربية',
      ru: 'Арабский'
    },
    excerpt: {
      en: 'Master the essential Arabic grammar concepts that will help you understand the Quran more deeply.',
      ar: 'أتقن مفاهيم النحو العربي الأساسية التي ستساعدك على فهم القرآن بشكل أعمق.',
      ru: 'Освойте основные концепции арабской грамматики, которые помогут вам глубже понимать Коран.'
    },
    image: '/img/blog/blog-03.jpg',
    date: '2024-10-08T09:15:00Z',
    commentsCount: 15,
    author: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    slug: 'arabic-grammar-basics'
  },
  {
    id: 4,
    title: {
      en: 'The Spiritual Benefits of Daily Quran Recitation',
      ar: 'الفوائد الروحية لتلاوة القرآن اليومية',
      ru: 'Духовная Польза Ежедневного Чтения Корана'
    },
    category: {
      en: 'Quran',
      ar: 'القرآن',
      ru: 'Коран'
    },
    excerpt: {
      en: 'Explore how daily engagement with the Quran can transform your spiritual life and bring peace to your heart.',
      ar: 'استكشف كيف يمكن للتفاعل اليومي مع القرآن أن يحول حياتك الروحية ويجلب السلام لقلبك.',
      ru: 'Узнайте, как ежедневное взаимодействие с Кораном может преобразить вашу духовную жизнь и принести покой вашему сердцу.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-10-05T16:45:00Z',
    commentsCount: 20,
    author: {
      en: 'Dr. Ibrahim Al-Sayed',
      ar: 'د. إبراهيم السيد',
      ru: 'Др. Ибрагим Аль-Сайед'
    },
    slug: 'spiritual-benefits-quran-recitation'
  },
  {
    id: 5,
    title: {
      en: 'Common Mistakes in Quran Reading and How to Avoid Them',
      ar: 'الأخطاء الشائعة في قراءة القرآن وكيفية تجنبها',
      ru: 'Распространенные Ошибки при Чтении Корана и Как Их Избежать'
    },
    category: {
      en: 'Tajweed',
      ar: 'التجويد',
      ru: 'Таджвид'
    },
    excerpt: {
      en: 'Learn about the most common pronunciation errors in Quranic recitation and practical ways to correct them.',
      ar: 'تعرف على أكثر أخطاء النطق شيوعاً في تلاوة القرآن والطرق العملية لتصحيحها.',
      ru: 'Узнайте о наиболее распространенных ошибках произношения при чтении Корана и практических способах их исправления.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-10-01T11:20:00Z',
    commentsCount: 10,
    author: {
      en: 'Sheikh Yusuf Al-Khalil',
      ar: 'الشيخ يوسف الخليل',
      ru: 'Шейх Юсуф Аль-Халиль'
    },
    slug: 'common-quran-reading-mistakes'
  },
  {
    id: 6,
    title: {
      en: 'Learning Arabic Alphabet: A Step-by-Step Guide',
      ar: 'تعلم الأبجدية العربية: دليل خطوة بخطوة',
      ru: 'Изучение Арабского Алфавита: Пошаговое Руководство'
    },
    category: {
      en: 'Arabic',
      ar: 'العربية',
      ru: 'Арабский'
    },
    excerpt: {
      en: 'Start your Arabic learning journey with this comprehensive guide to mastering the Arabic alphabet and pronunciation.',
      ar: 'ابدأ رحلة تعلم اللغة العربية مع هذا الدليل الشامل لإتقان الأبجدية العربية والنطق.',
      ru: 'Начните свое путешествие по изучению арабского языка с этого всеобъемлющего руководства по освоению арабского алфавита и произношения.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-28T13:00:00Z',
    commentsCount: 18,
    author: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    slug: 'learning-arabic-alphabet-guide'
  },
  {
    id: 7,
    title: {
      en: 'The History of Quran Compilation and Preservation',
      ar: 'تاريخ تجميع القرآن وحفظه',
      ru: 'История Составления и Сохранения Корана'
    },
    category: {
      en: 'Islamic Studies',
      ar: 'الدراسات الإسلامية',
      ru: 'Исламские Науки'
    },
    excerpt: {
      en: 'Discover the remarkable journey of how the Quran was compiled and preserved throughout Islamic history.',
      ar: 'اكتشف الرحلة الرائعة لكيفية تجميع القرآن وحفظه عبر التاريخ الإسلامي.',
      ru: 'Откройте для себя замечательную историю того, как Коран был составлен и сохранен на протяжении исламской истории.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-25T08:30:00Z',
    commentsCount: 14,
    author: {
      en: 'Dr. Ibrahim Al-Sayed',
      ar: 'د. إبراهيم السيد',
      ru: 'Др. Ибрагим Аль-Сайед'
    },
    slug: 'quran-compilation-history'
  },
  {
    id: 8,
    title: {
      en: 'Teaching Quran to Children: Best Practices',
      ar: 'تعليم القرآن للأطفال: أفضل الممارسات',
      ru: 'Обучение Детей Корану: Лучшие Практики'
    },
    category: {
      en: 'Education',
      ar: 'التعليم',
      ru: 'Образование'
    },
    excerpt: {
      en: 'Expert guidance on effective methods to teach Quran to children in an engaging and age-appropriate way.',
      ar: 'إرشادات من الخبراء حول الأساليب الفعالة لتعليم القرآن للأطفال بطريقة جذابة ومناسبة للعمر.',
      ru: 'Экспертное руководство по эффективным методам обучения детей Корану увлекательным и соответствующим возрасту способом.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-20T15:10:00Z',
    commentsCount: 22,
    author: {
      en: 'Ustadha Aisha Al-Mansour',
      ar: 'الأستاذة عائشة المنصور',
      ru: 'Устаза Аиша Аль-Мансур'
    },
    slug: 'teaching-quran-to-children'
  },
  {
    id: 9,
    title: {
      en: 'Understanding Arabic Diacritics (Harakat) in Quran',
      ar: 'فهم الحركات العربية (التشكيل) في القرآن',
      ru: 'Понимание Арабских Диакритических Знаков в Коране'
    },
    category: {
      en: 'Arabic',
      ar: 'العربية',
      ru: 'Арабский'
    },
    excerpt: {
      en: 'Learn how to read and understand Arabic diacritical marks that are essential for correct Quran recitation.',
      ar: 'تعلم كيفية قراءة وفهم علامات التشكيل العربية الضرورية للتلاوة الصحيحة للقرآن.',
      ru: 'Научитесь читать и понимать арабские диакритические знаки, необходимые для правильного чтения Корана.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-15T10:45:00Z',
    commentsCount: 16,
    author: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    slug: 'understanding-arabic-diacritics'
  },
  {
    id: 10,
    title: {
      en: 'Understanding Arabic Diacritics (Harakat) in Quran',
      ar: 'فهم الحركات العربية (التشكيل) في القرآن',
      ru: 'Понимание Арабских Диакритических Знаков в Коране'
    },
    category: {
      en: 'Arabic',
      ar: 'العربية',
      ru: 'Арабский'
    },
    excerpt: {
      en: 'Learn how to read and understand Arabic diacritical marks that are essential for correct Quran recitation.',
      ar: 'تعلم كيفية قراءة وفهم علامات التشكيل العربية الضرورية للتلاوة الصحيحة للقرآن.',
      ru: 'Научитесь читать и понимать арабские диакритические знаки, необходимые для правильного чтения Корана.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-15T10:45:00Z',
    commentsCount: 16,
    author: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    slug: 'understanding-arabic-diacritics'
  },
  {
    id: 11,
    title: {
      en: 'Understanding Arabic Diacritics (Harakat) in Quran',
      ar: 'فهم الحركات العربية (التشكيل) في القرآن',
      ru: 'Понимание Арабских Диакритических Знаков в Коране'
    },
    category: {
      en: 'Arabic',
      ar: 'العربية',
      ru: 'Арабский'
    },
    excerpt: {
      en: 'Learn how to read and understand Arabic diacritical marks that are essential for correct Quran recitation.',
      ar: 'تعلم كيفية قراءة وفهم علامات التشكيل العربية الضرورية للتلاوة الصحيحة للقرآن.',
      ru: 'Научитесь читать и понимать арабские диакритические знаки, необходимые для правильного чтения Корана.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-15T10:45:00Z',
    commentsCount: 16,
    author: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    slug: 'understanding-arabic-diacritics'
  },
  {
    id: 12,
    title: {
      en: 'Understanding Arabic Diacritics (Harakat) in Quran',
      ar: 'فهم الحركات العربية (التشكيل) في القرآن',
      ru: 'Понимание Арабских Диакритических Знаков в Коране'
    },
    category: {
      en: 'Arabic',
      ar: 'العربية',
      ru: 'Арабский'
    },
    excerpt: {
      en: 'Learn how to read and understand Arabic diacritical marks that are essential for correct Quran recitation.',
      ar: 'تعلم كيفية قراءة وفهم علامات التشكيل العربية الضرورية للتلاوة الصحيحة للقرآن.',
      ru: 'Научитесь читать и понимать арабские диакритические знаки, необходимые для правильного чтения Корана.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-15T10:45:00Z',
    commentsCount: 16,
    author: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    slug: 'understanding-arabic-diacritics'
  },
  {
    id: 13,
    title: {
      en: 'Understanding Arabic Diacritics (Harakat) in Quran',
      ar: 'فهم الحركات العربية (التشكيل) في القرآن',
      ru: 'Понимание Арабских Диакритических Знаков в Коране'
    },
    category: {
      en: 'Arabic',
      ar: 'العربية',
      ru: 'Арабский'
    },
    excerpt: {
      en: 'Learn how to read and understand Arabic diacritical marks that are essential for correct Quran recitation. Learn how to read and understand Arabic diacritical marks that are essential for correct Quran recitation. Learn how to read and understand Arabic diacritical marks that are essential for correct Quran recitation',
      ar: 'تعلم كيفية قراءة وفهم علامات التشكيل العربية الضرورية للتلاوة الصحيحة للقرآن.',
      ru: 'Научитесь читать и понимать арабские диакритические знаки, необходимые для правильного чтения Корана.'
    },
    image: '/img/blog/blog-01.jpg',
    date: '2024-09-15T10:45:00Z',
    commentsCount: 16,
    author: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    slug: 'understanding-arabic-diacritics'
  }
]

// Helper function to get paginated blogs
export const getPaginatedBlogs = (page: number = 1, perPage: number = 9): {
  blogs: BlogPost[]
  totalPages: number
  currentPage: number
  totalBlogs: number
} => {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedBlogs = blogPosts.slice(startIndex, endIndex)

  return {
    blogs: paginatedBlogs,
    totalPages: Math.ceil(blogPosts.length / perPage),
    currentPage: page,
    totalBlogs: blogPosts.length
  }
}

// Helper function to get blog by slug
export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(blog => blog.slug === slug)
}

// Helper function to get blogs by category
export const getBlogsByCategory = (category: string, locale: 'en' | 'ar' | 'ru' = 'en'): BlogPost[] => {
  return blogPosts.filter(blog =>
    blog.category[locale].toLowerCase() === category.toLowerCase()
  )
}
