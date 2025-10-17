interface Slide {
  title: string;
  desc: string;
  imgSrc?: string;
}

interface LocaleMessages {
  slides: Slide[];
}

export default {
  legacy: false,
  locale: "en",
  messages: {
    en: <LocaleMessages>{
      slides: [
        {
          title: "Connecting Hearts to the House of Allah",
          desc: "Interactive, Authentic, and Flexible Islamic Learning from Qualified Scholars. Explore Quran, Hadith, Fiqh",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-7.png"
        },
        {
          title: "Empowering the Next Generation of Believers",
          desc: "Gain knowledge rooted in faith with accessible, engaging, and structured Islamic courses for all ages.",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-8.png"
        },
        {
          title: "Your Journey of Faith and Knowledge Begins Here",
          desc: "Join our community to learn, grow, and connect with scholars dedicated to teaching authentic Islamic principles.",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-9.png"
        },
      ],
    },
    ar: <LocaleMessages>{
      slides: [
        {
          title: "ربط القلوب ببيت الله",
          desc: "تعلم إسلامي تفاعلي وموثوق ومرن من علماء مؤهلين. استكشف القرآن والحديث والفقه.",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-7.png"
        },
        {
          title: "تمكين الجيل القادم من المؤمنين",
          desc: "اكتسب المعرفة المستندة إلى الإيمان من خلال دورات إسلامية منظمة وجذابة لجميع الأعمار.",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-8.png"
        },
        {
          title: "رحلتك في الإيمان والمعرفة تبدأ من هنا",
          desc: "انضم إلى مجتمعنا لتتعلم وتنمو وتتواصل مع العلماء المكرسين لتعليم المبادئ الإسلامية الأصيلة.",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-9.png"
        },
      ],
    },
    ru: <LocaleMessages>{
      slides: [
        {
          title: "Соединяя сердца с Домом Аллаха",
          desc: "Интерактивное, подлинное и гибкое исламское обучение от квалифицированных учёных. Изучайте Коран, хадисы, фикх.",
        },
        {
          title: "Даем силу новому поколению верующих",
          desc: "Получайте знания, основанные на вере, через доступные и структурированные исламские курсы для всех возрастов.",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-8.png"
        },
        {
          title: "Ваш путь веры и знаний начинается здесь",
          desc: "Присоединяйтесь к нашему сообществу, чтобы учиться, развиваться и связываться с учёными, преданными исламским принципам.",
          imgSrc: "https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/image-9.png"
        },
      ],
    },
  },
};

