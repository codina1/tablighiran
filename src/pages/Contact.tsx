import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const contactInfo = [
  {
    title: 'تلفن تماس',
    value: '۰۲۱-۱۲۳۴۵۶۷۸',
    icon: PhoneIcon,
  },
  {
    title: 'ایمیل',
    value: 'info@tablighran.com',
    icon: EnvelopeIcon,
  },
  {
    title: 'آدرس',
    value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    icon: MapPinIcon,
  },
];

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
            تماس با ما
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            برای ارتباط با ما می‌توانید از طریق فرم زیر یا اطلاعات تماس، با ما در ارتباط باشید
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">فرم تماس</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full pr-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full pr-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  پیام
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full pr-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="پیام خود را وارد کنید"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                ارسال پیام
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-medium text-gray-900">{info.title}</h3>
                    <p className="mt-1 text-gray-500">{info.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">ساعات کاری</h3>
              <div className="space-y-2">
                <p className="text-gray-500">شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر</p>
                <p className="text-gray-500">پنجشنبه: ۹ صبح تا ۱ بعد از ظهر</p>
                <p className="text-gray-500">جمعه: تعطیل</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 