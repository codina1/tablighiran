import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const slides = [
  {
    id: 1,
    title: 'تبلیغات هوشمند خودرویی',
    description: 'با استفاده از هوش مصنوعی، تبلیغات خودرویی خود را بهینه کنید',
    image: '/images/hero.svg',
    cta: 'شروع کنید',
    link: '/register',
    badge: 'جدیدترین پلتفرم تبلیغات خودرویی'
  },
  {
    id: 2,
    title: 'مدیریت هوشمند ناوگان',
    description: 'مدیریت ناوگان تبلیغاتی خود را به صورت هوشمند انجام دهید',
    image: '/images/hero2.svg',
    cta: 'بیشتر بدانید',
    link: '/features',
    badge: 'مدیریت یکپارچه'
  },
  {
    id: 3,
    title: 'گزارش‌گیری پیشرفته',
    description: 'با گزارش‌های دقیق و تحلیلی، عملکرد تبلیغات خود را بهبود دهید',
    image: '/images/hero3.svg',
    cta: 'مشاهده نمونه',
    link: '/demo',
    badge: 'تحلیل هوشمند'
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const HeroSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);

  const paginate = (newDirection: number) => {
    setPage([(page + newDirection + slides.length) % slides.length, newDirection]);
  };

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [page, isPlaying]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-right">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-6"
                >
                  {slides[page].badge}
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                  {slides[page].title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-600 mb-8"
                >
                  {slides[page].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4"
                >
                  <Link
                    to={slides[page].link}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {slides[page].cta}
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    تماس با ما
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={floatAnimation}
                  className="relative"
                >
                  <img
                    src={slides[page].image}
                    alt={slides[page].title}
                    className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent rounded-full blur-3xl" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
        onClick={() => {
          setIsPlaying(false);
          paginate(-1);
        }}
      >
        <ChevronLeftIcon className="w-6 h-6 text-indigo-600" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
        onClick={() => {
          setIsPlaying(false);
          paginate(1);
        }}
      >
        <ChevronRightIcon className="w-6 h-6 text-indigo-600" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsPlaying(false);
              setPage([index, index > page ? 1 : -1]);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === page 
                ? 'bg-indigo-600 scale-125' 
                : 'bg-gray-300 hover:bg-indigo-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider; 