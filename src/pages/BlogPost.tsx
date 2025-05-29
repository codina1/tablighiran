import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const relatedPosts = [
  {
    id: 1,
    title: 'تأثیر هوش مصنوعی بر تبلیغات خودرویی',
    excerpt: 'هوش مصنوعی چگونه می‌تواند به بهینه‌سازی تبلیغات خودرویی کمک کند؟',
    image: '/images/blog/post2.svg',
    date: '۱۴۰۳/۰۱/۱۰',
    readTime: '۷ دقیقه'
  },
  {
    id: 2,
    title: 'نکات کلیدی برای رانندگان تبلیغاتی',
    excerpt: 'چگونه می‌توانید به عنوان راننده تبلیغاتی، درآمد بیشتری کسب کنید؟',
    image: '/images/blog/post3.svg',
    date: '۱۴۰۳/۰۱/۰۵',
    readTime: '۴ دقیقه'
  },
  {
    id: 3,
    title: 'آینده تبلیغات خودرویی در ایران',
    excerpt: 'تحلیل روندهای آینده تبلیغات خودرویی و فرصت‌های پیش رو',
    image: '/images/blog/post4.svg',
    date: '۱۴۰۲/۱۲/۲۵',
    readTime: '۶ دقیقه'
  }
];

const BlogPost: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <CalendarIcon className="h-5 w-5 ml-1" />
                ۱۴۰۳/۰۱/۱۵
              </span>
              <span className="flex items-center">
                <ClockIcon className="h-5 w-5 ml-1" />
                ۵ دقیقه
              </span>
              <span className="flex items-center">
                <UserIcon className="h-5 w-5 ml-1" />
                علی محمدی
              </span>
              <span className="flex items-center">
                <TagIcon className="h-5 w-5 ml-1" />
                تبلیغات
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              راهنمای جامع تبلیغات خودرویی در سال ۱۴۰۳
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              در این مقاله به بررسی روش‌های نوین تبلیغات خودرویی و تأثیر آن بر کسب و کارها می‌پردازیم.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose prose-indigo prose-lg mx-auto"
            >
              <img
                src="/images/blog/post1.svg"
                alt="تبلیغات خودرویی"
                className="w-full h-96 object-cover rounded-2xl mb-8"
              />
              <p>
                تبلیغات خودرویی یکی از مؤثرترین روش‌های بازاریابی در عصر حاضر است. با توجه به افزایش ترافیک و زمان‌های طولانی که مردم در خودروهای خود می‌گذرانند، این نوع تبلیغات می‌تواند تأثیر قابل توجهی بر مخاطبان داشته باشد.
              </p>
              <h2>مزایای تبلیغات خودرویی</h2>
              <p>
                تبلیغات خودرویی دارای مزایای متعددی است که آن را به گزینه‌ای جذاب برای کسب و کارها تبدیل می‌کند:
              </p>
              <ul>
                <li>پوشش گسترده جغرافیایی</li>
                <li>هزینه مقرون به صرفه</li>
                <li>تأثیرگذاری طولانی مدت</li>
                <li>قابلیت هدف‌گذاری دقیق</li>
                <li>انعطاف‌پذیری در طراحی</li>
              </ul>
              <h2>نکات کلیدی در طراحی تبلیغات خودرویی</h2>
              <p>
                برای طراحی یک تبلیغ خودرویی مؤثر، باید به نکات زیر توجه کرد:
              </p>
              <ul>
                <li>سادگی و خوانایی پیام</li>
                <li>رنگ‌های جذاب و متناسب با برند</li>
                <li>اندازه مناسب المان‌های تبلیغاتی</li>
                <li>مکان‌یابی مناسب روی خودرو</li>
                <li>استفاده از تصاویر با کیفیت</li>
              </ul>
              <h2>بهینه‌سازی مسیرهای تبلیغاتی</h2>
              <p>
                انتخاب مسیرهای مناسب برای تبلیغات خودرویی از اهمیت بالایی برخوردار است. با استفاده از هوش مصنوعی و تحلیل داده‌ها، می‌توان بهترین مسیرها را برای حداکثر تأثیرگذاری انتخاب کرد.
              </p>
            </motion.div>

            {/* Share and Bookmark */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-indigo-600">
                  <ShareIcon className="h-5 w-5 ml-1" />
                  اشتراک‌گذاری
                </button>
                <button className="flex items-center text-gray-500 hover:text-indigo-600">
                  <BookmarkIcon className="h-5 w-5 ml-1" />
                  ذخیره
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">مقالات مرتبط</h3>
              <div className="space-y-6">
                {relatedPosts.map((post) => (
                  <div key={post.id} className="flex items-start space-x-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 ml-1" />
                          {post.date}
                        </span>
                        <span className="flex items-center mr-4">
                          <ClockIcon className="h-4 w-4 ml-1" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                به خبرنامه ما بپیوندید
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-indigo-100">
                برای دریافت آخرین مقالات و اخبار تبلیغران، در خبرنامه ما عضو شوید.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 lg:mt-0"
            >
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  آدرس ایمیل
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                  placeholder="ایمیل خود را وارد کنید"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:mr-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                  >
                    عضویت
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 