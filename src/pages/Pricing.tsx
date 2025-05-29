import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    name: 'پایه',
    description: 'مناسب برای کسب و کارهای کوچک',
    price: '۲,۵۰۰,۰۰۰',
    features: [
      '۵ خودرو تبلیغاتی',
      'مسیرهای محدود',
      'گزارش‌گیری ساده',
      'پشتیبانی تلفنی',
      'مدت زمان: ۱ ماه'
    ],
    cta: 'شروع کنید',
    popular: false
  },
  {
    name: 'حرفه‌ای',
    description: 'مناسب برای کسب و کارهای متوسط',
    price: '۵,۰۰۰,۰۰۰',
    features: [
      '۱۵ خودرو تبلیغاتی',
      'مسیرهای نامحدود',
      'گزارش‌گیری پیشرفته',
      'پشتیبانی ۲۴/۷',
      'مدت زمان: ۳ ماه',
      'بهینه‌سازی هوشمند مسیر'
    ],
    cta: 'شروع کنید',
    popular: true
  },
  {
    name: 'سازمانی',
    description: 'مناسب برای شرکت‌های بزرگ',
    price: '۱۰,۰۰۰,۰۰۰',
    features: [
      '۳۰ خودرو تبلیغاتی',
      'مسیرهای نامحدود',
      'گزارش‌گیری حرفه‌ای',
      'پشتیبانی اختصاصی',
      'مدت زمان: ۶ ماه',
      'بهینه‌سازی هوشمند مسیر',
      'تحلیل داده‌های پیشرفته',
      'مدیریت کمپین اختصاصی'
    ],
    cta: 'شروع کنید',
    popular: false
  }
];

const Pricing: React.FC = () => {
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
              <span className="block">تعرفه‌های تبلیغران</span>
              <span className="block text-indigo-600">انتخاب پلن مناسب برای کسب و کار شما</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              با انتخاب پلن مناسب، تبلیغات خودرویی خود را بهینه‌سازی کنید
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    محبوب
                  </span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500"> تومان</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                      </div>
                      <p className="mr-3 text-base text-gray-500">{feature}</p>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-8 block w-full rounded-md px-6 py-3 text-center text-base font-medium ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              سوالات متداول درباره تعرفه‌ها
            </h2>
            <div className="mt-12 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">آیا امکان تغییر پلن وجود دارد؟</h3>
                <p className="mt-2 text-gray-500">
                  بله، شما می‌توانید در هر زمان پلن خود را ارتقا دهید. هزینه اضافی بر اساس مدت زمان باقی‌مانده محاسبه می‌شود.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">آیا تخفیف برای پلن‌های طولانی‌مدت وجود دارد؟</h3>
                <p className="mt-2 text-gray-500">
                  بله، برای پلن‌های ۶ ماهه و بیشتر، تخفیف‌های ویژه در نظر گرفته شده است. برای اطلاع از جزئیات با کارشناسان ما تماس بگیرید.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">آیا امکان پرداخت اقساطی وجود دارد؟</h3>
                <p className="mt-2 text-gray-500">
                  بله، برای پلن‌های حرفه‌ای و سازمانی، امکان پرداخت اقساطی فراهم است. شرایط پرداخت اقساطی در زمان ثبت‌نام به شما اعلام می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
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
                نیاز به مشاوره دارید؟
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-indigo-100">
                کارشناسان ما آماده پاسخگویی به سوالات شما و ارائه مشاوره رایگان هستند.
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

export default Pricing; 