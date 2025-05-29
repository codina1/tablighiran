import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const posts = [
  {
    id: 1,
    title: 'راهنمای جامع تبلیغات خودرویی در سال ۱۴۰۳',
    excerpt: 'در این مقاله به بررسی روش‌های نوین تبلیغات خودرویی و تأثیر آن بر کسب و کارها می‌پردازیم.',
    image: '/images/blog/post1.svg',
    author: 'علی محمدی',
    date: '۱۴۰۳/۰۱/۱۵',
    category: 'تبلیغات',
    readTime: '۵ دقیقه'
  },
  {
    id: 2,
    title: 'تأثیر هوش مصنوعی بر تبلیغات خودرویی',
    excerpt: 'هوش مصنوعی چگونه می‌تواند به بهینه‌سازی تبلیغات خودرویی کمک کند؟',
    image: '/images/blog/post2.svg',
    author: 'سارا احمدی',
    date: '۱۴۰۳/۰۱/۱۰',
    category: 'هوش مصنوعی',
    readTime: '۷ دقیقه'
  },
  {
    id: 3,
    title: 'نکات کلیدی برای رانندگان تبلیغاتی',
    excerpt: 'چگونه می‌توانید به عنوان راننده تبلیغاتی، درآمد بیشتری کسب کنید؟',
    image: '/images/blog/post3.svg',
    author: 'محمد کریمی',
    date: '۱۴۰۳/۰۱/۰۵',
    category: 'رانندگان',
    readTime: '۴ دقیقه'
  },
  {
    id: 4,
    title: 'آینده تبلیغات خودرویی در ایران',
    excerpt: 'تحلیل روندهای آینده تبلیغات خودرویی و فرصت‌های پیش رو',
    image: '/images/blog/post4.svg',
    author: 'علی محمدی',
    date: '۱۴۰۲/۱۲/۲۵',
    category: 'آینده‌نگری',
    readTime: '۶ دقیقه'
  },
  {
    id: 5,
    title: 'بهینه‌سازی مسیرهای تبلیغاتی',
    excerpt: 'چگونه می‌توان مسیرهای تبلیغاتی را برای حداکثر تأثیر بهینه کرد؟',
    image: '/images/blog/post5.svg',
    author: 'سارا احمدی',
    date: '۱۴۰۲/۱۲/۲۰',
    category: 'بهینه‌سازی',
    readTime: '۵ دقیقه'
  },
  {
    id: 6,
    title: 'استراتژی‌های بازاریابی برای کسب و کارها',
    excerpt: 'راهنمای جامع استفاده از تبلیغات خودرویی برای رشد کسب و کار',
    image: '/images/blog/post6.svg',
    author: 'محمد کریمی',
    date: '۱۴۰۲/۱۲/۱۵',
    category: 'بازاریابی',
    readTime: '۸ دقیقه'
  }
];

const categories = [
  'همه مقالات',
  'تبلیغات',
  'هوش مصنوعی',
  'رانندگان',
  'آینده‌نگری',
  'بهینه‌سازی',
  'بازاریابی'
];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('همه مقالات');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = selectedCategory === 'همه مقالات'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">بلاگ تبلیغران</span>
              <span className="block text-indigo-600">آخرین مقالات و اخبار</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              با جدیدترین مقالات و اخبار حوزه تبلیغات خودرویی و فناوری‌های نوین آشنا شوید.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 ml-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 ml-1" />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-500 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <TagIcon className="h-4 w-4 ml-1" />
                    {post.category}
                  </div>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ادامه مطلب
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}
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
                در خبرنامه ما عضو شوید
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-indigo-100">
                با عضویت در خبرنامه ما، از آخرین مقالات و اخبار حوزه تبلیغات خودرویی باخبر شوید.
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
                  placeholder="آدرس ایمیل خود را وارد کنید"
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
              <p className="mt-3 text-sm text-indigo-100">
                با عضویت در خبرنامه، با <a href="#" className="font-medium text-white underline">قوانین و مقررات</a> موافقت می‌کنید.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 