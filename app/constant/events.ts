// Event posts data for the events page
export interface EventPost {
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
  time: {
    en: string
    ar: string
    ru: string
  }
  location: {
    en: string
    ar: string
    ru: string
  }
  registrationStatus: 'open' | 'closed' | 'full' | 'soon'
  price: number // 0 for free events
  badge?: 'hot' | 'new' // Optional promotional badge
  slug: string
}

export const eventPosts: EventPost[] = [
  {
    id: 1,
    title: {
      en: 'Advanced Tajweed Masterclass',
      ar: 'دورة متقدمة في التجويد',
      ru: 'Мастер-класс по продвинутому таджвиду'
    },
    category: {
      en: 'Workshop',
      ar: 'ورشة عمل',
      ru: 'Мастер-класс'
    },
    excerpt: {
      en: 'Master advanced Tajweed rules with renowned scholars. Learn intricate pronunciation techniques and refine your Quranic recitation skills.',
      ar: 'أتقن قواعد التجويد المتقدمة مع علماء مشهورين. تعلم تقنيات النطق المعقدة وحسّن مهارات تلاوة القرآن.',
      ru: 'Освойте продвинутые правила таджвида с известными учеными. Изучите сложные техники произношения и усовершенствуйте навыки чтения Корана.'
    },
    image: '/img/events/event-01.jpg',
    date: '2024-12-15T00:00:00Z',
    time: {
      en: '10:00 AM - 4:00 PM',
      ar: '10:00 صباحاً - 4:00 مساءً',
      ru: '10:00 - 16:00'
    },
    location: {
      en: 'Online',
      ar: 'عبر الإنترنت',
      ru: 'Онлайн'
    },
    registrationStatus: 'open',
    price: 0,
    badge: 'hot',
    slug: 'advanced-tajweed-masterclass'
  },
  {
    id: 2,
    title: {
      en: 'Quran Memorization Intensive Program',
      ar: 'برنامج مكثف لحفظ القرآن',
      ru: 'Интенсивная программа заучивания Корана'
    },
    category: {
      en: 'Webinar',
      ar: 'ندوة عبر الإنترنت',
      ru: 'Вебинар'
    },
    excerpt: {
      en: 'Join our 3-month intensive program designed to help you memorize and retain Quranic verses using proven techniques and personalized guidance.',
      ar: 'انضم إلى برنامجنا المكثف لمدة 3 أشهر المصمم لمساعدتك على حفظ والاحتفاظ بآيات القرآن باستخدام تقنيات مثبتة وإرشادات شخصية.',
      ru: 'Присоединяйтесь к нашей 3-месячной интенсивной программе, разработанной для помощи в заучивании и сохранении коранических аятов с использованием проверенных техник.'
    },
    image: '/img/events/event-02.jpg',
    date: '2025-01-05T00:00:00Z',
    time: {
      en: '6:00 PM - 8:00 PM',
      ar: '6:00 مساءً - 8:00 مساءً',
      ru: '18:00 - 20:00'
    },
    location: {
      en: 'Online',
      ar: 'عبر الإنترنت',
      ru: 'Онлайн'
    },
    registrationStatus: 'open',
    price: 49,
    badge: 'new',
    slug: 'quran-memorization-intensive'
  },
  {
    id: 3,
    title: {
      en: 'Arabic Grammar for Quran Students',
      ar: 'النحو العربي لطلاب القرآن',
      ru: 'Арабская грамматика для студентов Корана'
    },
    category: {
      en: 'Conference',
      ar: 'مؤتمر',
      ru: 'Конференция'
    },
    excerpt: {
      en: 'Comprehensive workshop covering essential Arabic grammar concepts needed for deeper understanding of the Quran. Perfect for intermediate learners.',
      ar: 'ورشة عمل شاملة تغطي مفاهيم النحو العربي الأساسية اللازمة لفهم القرآن بشكل أعمق. مثالية للمتعلمين المتوسطين.',
      ru: 'Комплексный семинар, охватывающий основные концепции арабской грамматики, необходимые для более глубокого понимания Корана. Идеально для учащихся среднего уровня.'
    },
    image: '/img/events/event-03.jpg',
    date: '2024-12-20T00:00:00Z',
    time: {
      en: '9:00 AM - 5:00 PM',
      ar: '9:00 صباحاً - 5:00 مساءً',
      ru: '9:00 - 17:00'
    },
    location: {
      en: 'Al-Amal Academy Center, Dubai',
      ar: 'مركز أكاديمية الأمل، دبي',
      ru: 'Центр Академии Аль-Амаль, Дубай'
    },
    registrationStatus: 'open',
    price: 75,
    slug: 'arabic-grammar-workshop'
  },
  {
    id: 4,
    title: {
      en: 'Family Quran Study Circle',
      ar: 'حلقة دراسة القرآن العائلية',
      ru: 'Семейный кружок изучения Корана'
    },
    category: {
      en: 'Study Circle',
      ar: 'حلقة دراسية',
      ru: 'Учебный круг'
    },
    excerpt: {
      en: 'Bring your family together for weekly Quran study sessions. Learn, reflect, and grow spiritually as a family unit with guided discussions.',
      ar: 'اجمع عائلتك معاً لجلسات دراسة القرآن الأسبوعية. تعلم وتأمل وانمو روحياً كوحدة عائلية مع مناقشات موجهة.',
      ru: 'Соберите свою семью для еженедельных занятий по изучению Корана. Учитесь, размышляйте и растите духовно всей семьей с управляемыми дискуссиями.'
    },
    image: '/img/events/event-04.jpg',
    date: '2024-12-01T00:00:00Z',
    time: {
      en: '7:00 PM - 8:30 PM',
      ar: '7:00 مساءً - 8:30 مساءً',
      ru: '19:00 - 20:30'
    },
    location: {
      en: 'Online',
      ar: 'عبر الإنترنت',
      ru: 'Онлайн'
    },
    registrationStatus: 'open',
    price: 0,
    slug: 'family-quran-study-circle'
  },
  {
    id: 5,
    title: {
      en: 'Islamic Calligraphy & Quranic Art Workshop',
      ar: 'ورشة الخط الإسلامي والفن القرآني',
      ru: 'Мастерская исламской каллиграфии и коранического искусства'
    },
    category: {
      en: 'Workshop',
      ar: 'ورشة عمل',
      ru: 'Мастер-класс'
    },
    excerpt: {
      en: 'Explore the beautiful art of Islamic calligraphy while deepening your connection with Quranic verses. No prior art experience required.',
      ar: 'استكشف الفن الجميل للخط الإسلامي بينما تعمق علاقتك بآيات القرآن. لا تتطلب خبرة فنية مسبقة.',
      ru: 'Исследуйте прекрасное искусство исламской каллиграфии, углубляя свою связь с кораническими аятами. Предварительный опыт в искусстве не требуется.'
    },
    image: '/img/events/event-05.jpg',
    date: '2025-01-10T00:00:00Z',
    time: {
      en: '2:00 PM - 5:00 PM',
      ar: '2:00 مساءً - 5:00 مساءً',
      ru: '14:00 - 17:00'
    },
    location: {
      en: 'Al-Amal Academy Center, Dubai',
      ar: 'مركز أكاديمية الأمل، دبي',
      ru: 'Центр Академии Аль-Амаль, Дубай'
    },
    registrationStatus: 'soon',
    price: 35,
    badge: 'new',
    slug: 'islamic-calligraphy-workshop'
  },
  {
    id: 6,
    title: {
      en: 'Understanding Tafsir: Deep Dive into Surah Al-Baqarah',
      ar: 'فهم التفسير: غوص عميق في سورة البقرة',
      ru: 'Понимание тафсира: глубокое погружение в суру Аль-Бакара'
    },
    category: {
      en: 'Seminar',
      ar: 'ندوة',
      ru: 'Семинар'
    },
    excerpt: {
      en: 'A comprehensive 8-week seminar exploring the meanings, context, and lessons from Surah Al-Baqarah with renowned Islamic scholar Dr. Ahmed.',
      ar: 'ندوة شاملة لمدة 8 أسابيع تستكشف معاني وسياق ودروس سورة البقرة مع العالم الإسلامي الشهير د. أحمد.',
      ru: '8-недельный семинар, исследующий значения, контекст и уроки из суры Аль-Бакара с известным исламским ученым доктором Ахмедом.'
    },
    image: '/img/events/event-06.jpg',
    date: '2024-12-08T00:00:00Z',
    time: {
      en: '5:00 PM - 7:00 PM',
      ar: '5:00 مساءً - 7:00 مساءً',
      ru: '17:00 - 19:00'
    },
    location: {
      en: 'Online',
      ar: 'عبر الإنترنت',
      ru: 'Онлайн'
    },
    registrationStatus: 'full',
    price: 89,
    badge: 'hot',
    slug: 'tafsir-surah-al-baqarah'
  },
  {
    id: 7,
    title: {
      en: 'Youth Quran Competition 2024',
      ar: 'مسابقة القرآن للشباب 2024',
      ru: 'Молодежный конкурс Корана 2024'
    },
    category: {
      en: 'Conference',
      ar: 'مؤتمر',
      ru: 'Конференция'
    },
    excerpt: {
      en: 'Annual Quran recitation and memorization competition for youth aged 10-18. Prizes, certificates, and valuable feedback from expert judges.',
      ar: 'مسابقة سنوية للتلاوة والحفظ للشباب من عمر 10-18. جوائز وشهادات وملاحظات قيمة من قضاة خبراء.',
      ru: 'Ежегодный конкурс чтения и заучивания Корана для молодежи 10-18 лет. Призы, сертификаты и ценные отзывы от экспертов.'
    },
    image: '/img/events/event-07.jpg',
    date: '2025-02-14T00:00:00Z',
    time: {
      en: '9:00 AM - 6:00 PM',
      ar: '9:00 صباحاً - 6:00 مساءً',
      ru: '9:00 - 18:00'
    },
    location: {
      en: 'Grand Hall, Dubai Islamic Center',
      ar: 'القاعة الكبرى، مركز دبي الإسلامي',
      ru: 'Большой зал, Исламский центр Дубая'
    },
    registrationStatus: 'open',
    price: 0,
    slug: 'youth-quran-competition'
  },
  {
    id: 8,
    title: {
      en: 'Ramadan Preparation: Spiritual & Practical Guide',
      ar: 'الاستعداد لرمضان: دليل روحي وعملي',
      ru: 'Подготовка к Рамадану: духовное и практическое руководство'
    },
    category: {
      en: 'Webinar',
      ar: 'ندوة عبر الإنترنت',
      ru: 'Вебинар'
    },
    excerpt: {
      en: 'Get ready for the blessed month of Ramadan with practical tips, spiritual reflections, and Quranic guidance to maximize your blessings.',
      ar: 'استعد لشهر رمضان المبارك بنصائح عملية وتأملات روحية وإرشادات قرآنية لتعظيم بركاتك.',
      ru: 'Подготовьтесь к благословенному месяцу Рамадан с практическими советами, духовными размышлениями и кораническим руководством для максимизации благословений.'
    },
    image: '/img/events/event-08.jpg',
    date: '2025-02-20T00:00:00Z',
    time: {
      en: '8:00 PM - 9:30 PM',
      ar: '8:00 مساءً - 9:30 مساءً',
      ru: '20:00 - 21:30'
    },
    location: {
      en: 'Online',
      ar: 'عبر الإنترنت',
      ru: 'Онлайн'
    },
    registrationStatus: 'soon',
    price: 0,
    badge: 'new',
    slug: 'ramadan-preparation-guide'
  },
  {
    id: 9,
    title: {
      en: 'Arabic Conversation Club for Beginners',
      ar: 'نادي المحادثة العربية للمبتدئين',
      ru: 'Клуб арабской разговорной речи для начинающих'
    },
    category: {
      en: 'Study Circle',
      ar: 'حلقة دراسية',
      ru: 'Учебный круг'
    },
    excerpt: {
      en: 'Practice your Arabic speaking skills in a supportive, friendly environment. Weekly sessions with native speakers and beginner-friendly content.',
      ar: 'مارس مهارات التحدث بالعربية في بيئة داعمة وودية. جلسات أسبوعية مع متحدثين أصليين ومحتوى مناسب للمبتدئين.',
      ru: 'Практикуйте свои навыки разговорного арабского в поддерживающей, дружественной среде. Еженедельные занятия с носителями языка и контентом для начинающих.'
    },
    image: '/img/events/event-09.jpg',
    date: '2024-12-05T00:00:00Z',
    time: {
      en: '4:00 PM - 5:30 PM',
      ar: '4:00 مساءً - 5:30 مساءً',
      ru: '16:00 - 17:30'
    },
    location: {
      en: 'Online',
      ar: 'عبر الإنترنت',
      ru: 'Онлайн'
    },
    registrationStatus: 'open',
    price: 0,
    slug: 'arabic-conversation-club'
  },
  {
    id: 10,
    title: {
      en: 'Women in Islam: Quranic Perspective',
      ar: 'المرأة في الإسلام: منظور قرآني',
      ru: 'Женщины в исламе: коранический взгляд'
    },
    category: {
      en: 'Seminar',
      ar: 'ندوة',
      ru: 'Семинар'
    },
    excerpt: {
      en: 'Explore the honored status of women in Islam through Quranic verses and prophetic traditions. A sisters-only event with Q&A session.',
      ar: 'استكشف المكانة الكريمة للمرأة في الإسلام من خلال الآيات القرآنية والأحاديث النبوية. فعالية خاصة بالأخوات مع جلسة أسئلة وأجوبة.',
      ru: 'Исследуйте почетный статус женщин в исламе через коранические аяты и пророческие традиции. Мероприятие только для сестер с сессией вопросов и ответов.'
    },
    image: '/img/events/event-01.jpg',
    date: '2025-01-18T00:00:00Z',
    time: {
      en: '3:00 PM - 6:00 PM',
      ar: '3:00 مساءً - 6:00 مساءً',
      ru: '15:00 - 18:00'
    },
    location: {
      en: 'Al-Amal Academy Center, Dubai',
      ar: 'مركز أكاديمية الأمل، دبي',
      ru: 'Центр Академии Аль-Амаль, Дубай'
    },
    registrationStatus: 'open',
    price: 25,
    slug: 'women-in-islam-quran'
  },
  {
    id: 11,
    title: {
      en: 'Teaching Quran to Children: Best Practices',
      ar: 'تعليم القرآن للأطفال: أفضل الممارسات',
      ru: 'Обучение детей Корану: лучшие практики'
    },
    category: {
      en: 'Workshop',
      ar: 'ورشة عمل',
      ru: 'Мастер-класс'
    },
    excerpt: {
      en: 'Learn effective methods and creative techniques to teach Quran to children. Ideal for parents, teachers, and youth mentors.',
      ar: 'تعلم أساليب فعالة وتقنيات إبداعية لتعليم القرآن للأطفال. مثالية للآباء والمعلمين ومرشدي الشباب.',
      ru: 'Изучите эффективные методы и творческие техники обучения детей Корану. Идеально для родителей, учителей и наставников молодежи.'
    },
    image: '/img/events/event-02.jpg',
    date: '2024-12-28T00:00:00Z',
    time: {
      en: '10:00 AM - 1:00 PM',
      ar: '10:00 صباحاً - 1:00 مساءً',
      ru: '10:00 - 13:00'
    },
    location: {
      en: 'Online',
      ar: 'عبر الإنترنت',
      ru: 'Онлайн'
    },
    registrationStatus: 'open',
    price: 40,
    badge: 'hot',
    slug: 'teaching-quran-children'
  },
  {
    id: 12,
    title: {
      en: 'Prophetic Medicine & Wellness from Quran',
      ar: 'الطب النبوي والعافية من القرآن',
      ru: 'Пророческая медицина и здоровье из Корана'
    },
    category: {
      en: 'Conference',
      ar: 'مؤتمر',
      ru: 'Конференция'
    },
    excerpt: {
      en: 'Discover the healing wisdom of prophetic medicine and wellness practices mentioned in the Quran and authentic traditions.',
      ar: 'اكتشف الحكمة العلاجية للطب النبوي وممارسات العافية المذكورة في القرآن والأحاديث الصحيحة.',
      ru: 'Откройте для себя целебную мудрость пророческой медицины и практик здоровья, упомянутых в Коране и достоверных традициях.'
    },
    image: '/img/events/event-03.jpg',
    date: '2025-01-25T00:00:00Z',
    time: {
      en: '11:00 AM - 5:00 PM',
      ar: '11:00 صباحاً - 5:00 مساءً',
      ru: '11:00 - 17:00'
    },
    location: {
      en: 'Dubai Health Convention Center',
      ar: 'مركز دبي للمؤتمرات الصحية',
      ru: 'Дубайский центр здоровья и конференций'
    },
    registrationStatus: 'closed',
    price: 95,
    slug: 'prophetic-medicine-wellness'
  }
]

// Helper function to get paginated events
export const getPaginatedEvents = (page: number = 1, perPage: number = 9): {
  events: EventPost[]
  totalPages: number
  currentPage: number
  totalEvents: number
} => {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedEvents = eventPosts.slice(startIndex, endIndex)

  return {
    events: paginatedEvents,
    totalPages: Math.ceil(eventPosts.length / perPage),
    currentPage: page,
    totalEvents: eventPosts.length
  }
}

// Helper function to get event by slug
export const getEventBySlug = (slug: string): EventPost | undefined => {
  return eventPosts.find(event => event.slug === slug)
}

// Helper function to get events by category
export const getEventsByCategory = (category: string, locale: 'en' | 'ar' | 'ru' = 'en'): EventPost[] => {
  return eventPosts.filter(event =>
    event.category[locale].toLowerCase() === category.toLowerCase()
  )
}

// Helper function to get events by registration status
export const getEventsByStatus = (status: 'open' | 'closed' | 'full' | 'soon'): EventPost[] => {
  return eventPosts.filter(event => event.registrationStatus === status)
}
