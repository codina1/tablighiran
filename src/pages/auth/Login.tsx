import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { login } from '../../utils/auth';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const inputStyles = {
  base: "block w-full rounded-lg border px-4 py-3 text-gray-900 shadow-sm transition-all duration-200",
  focus: "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50",
  error: "border-red-300 focus:border-red-500 focus:ring-red-500",
  success: "border-green-300 focus:border-green-500 focus:ring-green-500",
  default: "border-gray-300",
};

const labelStyles = {
  base: "block text-sm font-medium text-gray-700 mb-1",
  error: "text-red-600",
  success: "text-green-600",
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loginError, setLoginError] = useState<string>('');

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (validateForm()) {
      const user = login(formData.email, formData.password);
      if (user) {
        // هدایت کاربر به داشبورد مناسب
        if (user.role === 'driver') {
          navigate('/driver/dashboard');
        } else {
          navigate('/brand/dashboard');
        }
      } else {
        setLoginError('ایمیل یا رمز عبور اشتباه است');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const getInputClassName = (fieldName: keyof FormData) => {
    if (!touched[fieldName]) return `${inputStyles.base} ${inputStyles.default} ${inputStyles.focus}`;
    if (errors[fieldName]) return `${inputStyles.base} ${inputStyles.error} ${inputStyles.focus}`;
    return `${inputStyles.base} ${inputStyles.success} ${inputStyles.focus}`;
  };

  const getLabelClassName = (fieldName: keyof FormData) => {
    if (!touched[fieldName]) return labelStyles.base;
    if (errors[fieldName]) return `${labelStyles.base} ${labelStyles.error}`;
    return `${labelStyles.base} ${labelStyles.success}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="mx-auto max-w-md px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-12 w-12 rounded-full bg-indigo-100 p-2"
          >
            <UserCircleIcon className="h-8 w-8 text-indigo-600" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ورود به تبلیغران
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            به حساب کاربری خود وارد شوید
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md bg-red-50 p-4"
            >
              <div className="flex">
                <XCircleIcon className="h-5 w-5 text-red-400 ml-2" />
                <div className="mr-3">
                  <h3 className="text-sm font-medium text-red-800">خطا در ورود</h3>
                  <div className="mt-2 text-sm text-red-700">{loginError}</div>
                </div>
              </div>
            </motion.div>
          )}

          <div>
            <label htmlFor="email" className={getLabelClassName('email')}>
              ایمیل
            </label>
            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${getInputClassName('email')} pl-10`}
                placeholder="example@email.com"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <EnvelopeIcon className="h-5 w-5" />
              </div>
              {touched.email && !errors.email && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 flex items-center text-sm text-red-600"
                >
                  <XCircleIcon className="ml-1 h-4 w-4" />
                  {errors.email}
                </motion.div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className={getLabelClassName('password')}>
              رمز عبور
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${getInputClassName('password')} pl-10`}
                placeholder="رمز عبور خود را وارد کنید"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <LockClosedIcon className="h-5 w-5" />
              </div>
              {touched.password && !errors.password && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 flex items-center text-sm text-red-600"
                >
                  <XCircleIcon className="ml-1 h-4 w-4" />
                  {errors.password}
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                مرا به خاطر بسپار
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                فراموشی رمز عبور؟
              </Link>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
          >
            ورود
          </motion.button>
        </motion.form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            حساب کاربری ندارید؟{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              ثبت‌نام کنید
            </Link>
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-medium text-gray-900">اطلاعات ورود نمونه:</h3>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-gray-500">ورود به عنوان راننده:</p>
              <p className="text-sm font-medium text-gray-900">ایمیل: driver@example.com</p>
              <p className="text-sm font-medium text-gray-900">رمز عبور: 123456</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ورود به عنوان شرکت:</p>
              <p className="text-sm font-medium text-gray-900">ایمیل: brand@example.com</p>
              <p className="text-sm font-medium text-gray-900">رمز عبور: 123456</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 