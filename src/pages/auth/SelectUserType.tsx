import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  UserCircleIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const userTypes = [
  {
    id: 'driver',
    name: 'راننده',
    description: 'به عنوان راننده به تبلیغران بپیوندید و درآمد کسب کنید',
    icon: UserCircleIcon,
    href: '/register/driver',
  },
  {
    id: 'brand',
    name: 'شرکت',
    description: 'به عنوان شرکت یا برند به تبلیغران بپیوندید و خدمات تبلیغاتی دریافت کنید',
    icon: BuildingOfficeIcon,
    href: '/register/brand',
  },
];

export default function SelectUserType() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 sm:px-6 lg:px-8">
      <motion.div
        initial="initial"
        animate="animate"
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            انتخاب نوع کاربری
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            لطفاً نوع کاربری خود را انتخاب کنید
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {userTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-indigo-50 p-3">
                    <type.icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mt-6 text-center text-xl font-semibold text-gray-900">
                  {type.name}
                </h3>
                <p className="mt-4 flex-1 text-center text-gray-500">
                  {type.description}
                </p>
                <div className="mt-8">
                  <Link
                    to={type.href}
                    className="block w-full rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                  >
                    انتخاب
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            قبلاً ثبت‌نام کرده‌اید؟{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              وارد شوید
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
} 