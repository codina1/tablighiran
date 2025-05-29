import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'تبلیغران چیست؟',
    answer: 'تبلیغران یک پلتفرم هوشمند تبلیغات خودرویی است که با استفاده از هوش مصنوعی، بهینه‌ترین مسیرها و زمان‌ها را برای تبلیغات شما پیشنهاد می‌دهد. این پلتفرم به کسب و کارها کمک می‌کند تا با هزینه کمتر، بازدهی بیشتری از تبلیغات خودرویی داشته باشند.'
  },
  {
    question: 'چگونه می‌توانم به عنوان راننده تبلیغاتی ثبت نام کنم؟',
    answer: 'برای ثبت نام به عنوان راننده تبلیغاتی، کافیست در سایت ثبت نام کنید، مدارک مورد نیاز (گواهینامه، کارت ملی و...) را آپلود کنید و پس از تأیید، می‌توانید در مسیرهای تبلیغاتی شرکت کنید.'
  },
  {
    question: 'هزینه تبلیغات خودرویی چقدر است؟',
    answer: 'هزینه تبلیغات خودرویی به عوامل مختلفی مانند مسیر، مدت زمان، تعداد خودروها و نوع تبلیغات بستگی دارد. برای اطلاع از قیمت دقیق، می‌توانید با کارشناسان ما تماس بگیرید یا از طریق سایت درخواست قیمت دهید.'
  },
  {
    question: 'آیا می‌توانم مسیر تبلیغاتی خودم را انتخاب کنم؟',
    answer: 'بله، شما می‌توانید مسیر دلخواه خود را انتخاب کنید. همچنین سیستم هوشمند ما با توجه به هدف تبلیغاتی شما، مسیرهای بهینه را پیشنهاد می‌دهد.'
  },
  {
    question: 'چگونه می‌توانم از تأثیر تبلیغات خود مطلع شوم؟',
    answer: 'پلتفرم تبلیغران دارای سیستم گزارش‌گیری پیشرفته است که به شما امکان می‌دهد تعداد بازدیدها، مناطق پوشش داده شده و سایر آمارهای مهم را مشاهده کنید.'
  },
  {
    question: 'آیا تبلیغات در تمام شهرها امکان‌پذیر است؟',
    answer: 'در حال حاضر تبلیغران در شهرهای بزرگ کشور فعال است و به تدریج در حال گسترش به سایر شهرها می‌باشد. برای اطلاع از شهرهای تحت پوشش، می‌توانید با کارشناسان ما تماس بگیرید.'
  },
  {
    question: 'مدت زمان تأیید درخواست تبلیغات چقدر است؟',
    answer: 'درخواست‌های تبلیغات معمولاً در کمتر از ۲۴ ساعت بررسی و تأیید می‌شوند. در صورت نیاز به تغییرات یا اطلاعات تکمیلی، کارشناسان ما با شما تماس خواهند گرفت.'
  },
  {
    question: 'آیا می‌توانم تبلیغات خود را در زمان‌های خاص اجرا کنم؟',
    answer: 'بله، شما می‌توانید زمان‌بندی دقیق تبلیغات خود را مشخص کنید. سیستم ما به شما امکان می‌دهد تا تبلیغات را در ساعات و روزهای خاص اجرا کنید.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              <span className="block">سوالات متداول</span>
              <span className="block text-indigo-600">پاسخ به پرسش‌های شما</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              پاسخ به سوالات پرتکرار شما درباره تبلیغران و خدمات آن
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-right flex items-center justify-between focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-500">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
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
                سوال دیگری دارید؟
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-indigo-100">
                اگر پاسخ سوال خود را نیافتید، با کارشناسان ما تماس بگیرید.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 lg:mt-0"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+982112345678"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  تماس با ما
                </a>
                <a
                  href="mailto:info@tablighran.com"
                  className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-600"
                >
                  ارسال ایمیل
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 