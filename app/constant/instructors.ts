// Instructors data for the team page
export interface Instructor {
  id: number
  name: {
    en: string
    ar: string
    ru: string
  }
  designation: {
    en: string
    ar: string
    ru: string
  }
  description: {
    en: string
    ar: string
    ru: string
  }
  image: string
  profileUrl?: string
  socials: {
    platform: string
    url: string
    icon: string
  }[]
}

export const instructors: Instructor[] = [
  {
    id: 1,
    name: {
      en: 'Sheikh Ahmed Al-Mahmoud',
      ar: 'الشيخ أحمد المحمود',
      ru: 'Шейх Ахмед Аль-Махмуд'
    },
    designation: {
      en: 'Quran & Tajweed Teacher',
      ar: 'معلم القرآن والتجويد',
      ru: 'Учитель Корана и таджвида'
    },
    description: {
      en: 'Expert in Quranic recitation with 15+ years of teaching experience in Tajweed and memorization.',
      ar: 'خبير في تلاوة القرآن مع أكثر من 15 عامًا من الخبرة في تدريس التجويد والحفظ.',
      ru: 'Эксперт в чтении Корана с более чем 15-летним опытом преподавания таджвида и запоминания.'
    },
    image: '/img/team/team-22.webp',
    profileUrl: '#',
    socials: [
      { platform: 'Facebook', url: '#', icon: 'icon-facebook' },
      { platform: 'Twitter', url: '#', icon: 'icon-twitter' },
      { platform: 'LinkedIn', url: '#', icon: 'icon-linkedin2' }
    ]
  },
  {
    id: 2,
    name: {
      en: 'Ustadha Fatima Hassan',
      ar: 'الأستاذة فاطمة حسن',
      ru: 'Устаза Фатима Хассан'
    },
    designation: {
      en: 'Arabic Language Teacher',
      ar: 'معلمة اللغة العربية',
      ru: 'Учитель арабского языка'
    },
    description: {
      en: 'Specialized in teaching Arabic grammar and conversation with a focus on Quranic Arabic.',
      ar: 'متخصصة في تدريس قواعد اللغة العربية والمحادثة مع التركيز على العربية القرآنية.',
      ru: 'Специалист по преподаванию арабской грамматики и разговорной речи с акцентом на коранический арабский.'
    },
    image: '/img/team/team-23.webp',
    profileUrl: '#',
    socials: [
      { platform: 'Facebook', url: '#', icon: 'icon-facebook' },
      { platform: 'Twitter', url: '#', icon: 'icon-twitter' },
      { platform: 'LinkedIn', url: '#', icon: 'icon-linkedin2' }
    ]
  },
  {
    id: 3,
    name: {
      en: 'Dr. Ibrahim Al-Sayed',
      ar: 'د. إبراهيم السيد',
      ru: 'Др. Ибрагим Аль-Сайед'
    },
    designation: {
      en: 'Islamic Studies Teacher',
      ar: 'معلم الدراسات الإسلامية',
      ru: 'Учитель исламских наук'
    },
    description: {
      en: 'PhD in Islamic Studies with expertise in Fiqh, Hadith, and Islamic history.',
      ar: 'دكتوراه في الدراسات الإسلامية مع خبرة في الفقه والحديث والتاريخ الإسلامي.',
      ru: 'Кандидат исламских наук с опытом в фикхе, хадисах и исламской истории.'
    },
    image: '/img/team/team-24.webp',
    profileUrl: '#',
    socials: [
      { platform: 'Facebook', url: '#', icon: 'icon-facebook' },
      { platform: 'Twitter', url: '#', icon: 'icon-twitter' },
      { platform: 'LinkedIn', url: '#', icon: 'icon-linkedin2' }
    ]
  },
  {
    id: 4,
    name: {
      en: 'Sheikh Mohammed Al-Rashid',
      ar: 'الشيخ محمد الراشد',
      ru: 'Шейх Мохаммед Аль-Рашид'
    },
    designation: {
      en: 'Quran Memorization Teacher',
      ar: 'معلم حفظ القرآن',
      ru: 'Учитель запоминания Корана'
    },
    description: {
      en: 'Hafiz with proven track record in helping students complete Quran memorization efficiently.',
      ar: 'حافظ مع سجل حافل في مساعدة الطلاب على إكمال حفظ القرآن بكفاءة.',
      ru: 'Хафиз с подтвержденным опытом помощи студентам в эффективном заучивании Корана.'
    },
    image: '/img/teacher-section/team-5.png',
    profileUrl: '#',
    socials: [
      { platform: 'Facebook', url: '#', icon: 'icon-facebook' },
      { platform: 'Twitter', url: '#', icon: 'icon-twitter' },
      { platform: 'LinkedIn', url: '#', icon: 'icon-linkedin2' }
    ]
  },
  {
    id: 5,
    name: {
      en: 'Ustadha Aisha Al-Mansour',
      ar: 'الأستاذة عائشة المنصور',
      ru: 'Устаза Аиша Аль-Мансур'
    },
    designation: {
      en: 'Children Quran Teacher',
      ar: 'معلمة قرآن الأطفال',
      ru: 'Учитель Корана для детей'
    },
    description: {
      en: 'Experienced in teaching Quran to children with engaging and age-appropriate methods.',
      ar: 'خبيرة في تعليم القرآن للأطفال بطرق جذابة ومناسبة للعمر.',
      ru: 'Опыт преподавания Корана детям с использованием увлекательных и соответствующих возрасту методов.'
    },
    image: '/img/teacher-section/team-6.png',
    profileUrl: '#',
    socials: [
      { platform: 'Facebook', url: '#', icon: 'icon-facebook' },
      { platform: 'Twitter', url: '#', icon: 'icon-twitter' },
      { platform: 'LinkedIn', url: '#', icon: 'icon-linkedin2' }
    ]
  },
  {
    id: 6,
    name: {
      en: 'Sheikh Yusuf Al-Khalil',
      ar: 'الشيخ يوسف الخليل',
      ru: 'Шейх Юсуф Аль-Халиль'
    },
    designation: {
      en: 'Advanced Tajweed Teacher',
      ar: 'معلم التجويد المتقدم',
      ru: 'Учитель продвинутого таджвида'
    },
    description: {
      en: 'Master of Tajweed with Ijazah in multiple Quranic recitation styles (Qira\'at).',
      ar: 'خبير في التجويد مع إجازة في أساليب تلاوة القرآن المتعددة (القراءات).',
      ru: 'Мастер таджвида с иджазой в нескольких стилях чтения Корана (кыраат).'
    },
    image: '/img/teacher-section/team-7.png',
    profileUrl: '#',
    socials: [
      { platform: 'Facebook', url: '#', icon: 'icon-facebook' },
      { platform: 'Twitter', url: '#', icon: 'icon-twitter' },
      { platform: 'LinkedIn', url: '#', icon: 'icon-linkedin2' }
    ]
  }
]
