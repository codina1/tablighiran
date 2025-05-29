import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
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

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'نام الزامی است';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
    }

    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }

    if (!formData.phone) {
      newErrors.phone = 'شماره موبایل الزامی است';
    } else if (!/^09[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'شماره موبایل نامعتبر است';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 8) {
      newErrors.password = 'رمز عبور باید حداقل 8 کاراکتر باشد';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن مطابقت ندارند';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // در اینجا می‌توانید اطلاعات را به سرور ارسال کنید
      // پس از موفقیت‌آمیز بودن ثبت‌نام، کاربر را به صفحه انتخاب نوع کاربری هدایت کنید
      navigate('/register/select-type');
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
            ثبت‌نام در تبلیغران
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            برای شروع، اطلاعات خود را وارد کنید
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={getLabelClassName('firstName')}>
                نام
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${getInputClassName('firstName')} pl-10`}
                  placeholder="نام خود را وارد کنید"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <UserCircleIcon className="h-5 w-5" />
                </div>
                {touched.firstName && !errors.firstName && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
                {errors.firstName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 flex items-center text-sm text-red-600"
                  >
                    <XCircleIcon className="ml-1 h-4 w-4" />
                    {errors.firstName}
                  </motion.div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className={getLabelClassName('lastName')}>
                نام خانوادگی
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${getInputClassName('lastName')} pl-10`}
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <UserCircleIcon className="h-5 w-5" />
                </div>
                {touched.lastName && !errors.lastName && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
                {errors.lastName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 flex items-center text-sm text-red-600"
                  >
                    <XCircleIcon className="ml-1 h-4 w-4" />
                    {errors.lastName}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

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
            <label htmlFor="phone" className={getLabelClassName('phone')}>
              شماره موبایل
            </label>
            <div className="relative mt-1">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${getInputClassName('phone')} pl-10`}
                placeholder="09xxxxxxxxx"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <PhoneIcon className="h-5 w-5" />
              </div>
              {touched.phone && !errors.phone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {errors.phone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 flex items-center text-sm text-red-600"
                >
                  <XCircleIcon className="ml-1 h-4 w-4" />
                  {errors.phone}
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
                placeholder="حداقل 8 کاراکتر"
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

          <div>
            <label htmlFor="confirmPassword" className={getLabelClassName('confirmPassword')}>
              تکرار رمز عبور
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${getInputClassName('confirmPassword')} pl-10`}
                placeholder="تکرار رمز عبور"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <LockClosedIcon className="h-5 w-5" />
              </div>
              {touched.confirmPassword && !errors.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {errors.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 flex items-center text-sm text-red-600"
                >
                  <XCircleIcon className="ml-1 h-4 w-4" />
                  {errors.confirmPassword}
                </motion.div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
          >
            ثبت‌نام
          </motion.button>
        </motion.form>

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