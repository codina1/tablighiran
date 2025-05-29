import { motion } from 'framer-motion';
import { TruckIcon, ChartBarIcon, MapIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const services = [
  {
    title: 'تبلیغات سیار',
    description: 'با استفاده از ناوگان گسترده رانندگان، پیام تبلیغاتی شما را به تمام نقاط شهر می‌رسانیم.',
    icon: TruckIcon,
  },
  {
    title: 'تحلیل و گزارش‌گیری',
    description: 'با داشتن پنل مدیریتی پیشرفته، می‌توانید عملکرد تبلیغات خود را به صورت لحظه‌ای بررسی کنید.',
    icon: ChartBarIcon,
  },
  {
    title: 'بهینه‌سازی مسیر',
    description: 'با استفاده از هوش مصنوعی، بهترین مسیرها را برای تبلیغات شما انتخاب می‌کنیم.',
    icon: MapIcon,
  },
  {
    title: 'اپلیکیشن موبایل',
    description: 'با اپلیکیشن موبایل تبلیغران، مدیریت تبلیغات خود را در هر زمان و مکان انجام دهید.',
    icon: DevicePhoneMobileIcon,
  },
];

const Services: React.FC = () => {
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
            خدمات ما
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            با استفاده از خدمات متنوع تبلیغران، کسب و کار خود را به سطح بالاتری برسانید
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors duration-200">
                  <service.icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            چرا تبلیغران؟
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">۱۰۰۰+</div>
              <div className="text-gray-500">راننده فعال</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">۵۰+</div>
              <div className="text-gray-500">شهر تحت پوشش</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">۱۰۰۰۰+</div>
              <div className="text-gray-500">تبلیغ موفق</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services; 