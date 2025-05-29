import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function BrandRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    economicCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    website: '',
    instagram: '',
    telegram: '',
  });
  const [errors, setErrors] = useState({
    companyName: '',
    economicCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    website: '',
    instagram: '',
    telegram: '',
  });
  const [documents, setDocuments] = useState({
    businessLicense: null as File | null,
    logo: null as File | null,
  });

  const validateForm = () => {
    const newErrors = {
      companyName: '',
      economicCode: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      website: '',
      instagram: '',
      telegram: '',
    };
    let isValid = true;

    // Company name validation
    if (!formData.companyName) {
      newErrors.companyName = 'نام شرکت الزامی است';
      isValid = false;
    }

    // Economic code validation
    if (!formData.economicCode) {
      newErrors.economicCode = 'کد اقتصادی الزامی است';
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.economicCode)) {
      newErrors.economicCode = 'کد اقتصادی باید ۱۲ رقم باشد';
      isValid = false;
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'شماره تماس الزامی است';
      isValid = false;
    } else if (!/^0\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'شماره تماس نامعتبر است';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن مطابقت ندارند';
      isValid = false;
    }

    // Address validation
    if (!formData.address) {
      newErrors.address = 'آدرس الزامی است';
      isValid = false;
    }

    // Website validation (optional)
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'آدرس وب‌سایت نامعتبر است';
      isValid = false;
    }

    // Instagram validation (optional)
    if (formData.instagram && !/^@?[\w.]+$/.test(formData.instagram)) {
      newErrors.instagram = 'نام کاربری اینستاگرام نامعتبر است';
      isValid = false;
    }

    // Telegram validation (optional)
    if (formData.telegram && !/^@?[\w.]+$/.test(formData.telegram)) {
      newErrors.telegram = 'نام کاربری تلگرام نامعتبر است';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement registration logic
      console.log('Registration form submitted:', { ...formData, documents });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocuments((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          ثبت‌نام برند
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          یا{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            ورود به حساب کاربری
          </Link>
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                نام شرکت
              </label>
              <div className="mt-1">
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.companyName ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.companyName && (
                  <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="economicCode" className="block text-sm font-medium text-gray-700">
                کد اقتصادی
              </label>
              <div className="mt-1">
                <input
                  id="economicCode"
                  name="economicCode"
                  type="text"
                  required
                  value={formData.economicCode}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.economicCode ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.economicCode && (
                  <p className="mt-2 text-sm text-red-600">{errors.economicCode}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                شماره تماس
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                ایمیل
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                رمز عبور
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تکرار رمز عبور
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                آدرس
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                وب‌سایت (اختیاری)
              </label>
              <div className="mt-1">
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.website ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.website && (
                  <p className="mt-2 text-sm text-red-600">{errors.website}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                  اینستاگرام (اختیاری)
                </label>
                <div className="mt-1">
                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    value={formData.instagram}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.instagram ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.instagram && (
                    <p className="mt-2 text-sm text-red-600">{errors.instagram}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="telegram" className="block text-sm font-medium text-gray-700">
                  تلگرام (اختیاری)
                </label>
                <div className="mt-1">
                  <input
                    id="telegram"
                    name="telegram"
                    type="text"
                    value={formData.telegram}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.telegram ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.telegram && (
                    <p className="mt-2 text-sm text-red-600">{errors.telegram}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="businessLicense" className="block text-sm font-medium text-gray-700">
                  تصویر جواز کسب
                </label>
                <div className="mt-1">
                  <input
                    id="businessLicense"
                    name="businessLicense"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                  لوگوی شرکت
                </label>
                <div className="mt-1">
                  <input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                ثبت‌نام
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 