import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function DriverRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    carModel: '',
    carColor: '',
    licensePlate: '',
    licenseNumber: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    carModel: '',
    carColor: '',
    licensePlate: '',
    licenseNumber: '',
  });
  const [documents, setDocuments] = useState({
    nationalCard: null as File | null,
    driverLicense: null as File | null,
    carDocument: null as File | null,
  });

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      nationalCode: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      carModel: '',
      carColor: '',
      licensePlate: '',
      licenseNumber: '',
    };
    let isValid = true;

    // Name validation
    if (!formData.firstName) {
      newErrors.firstName = 'نام الزامی است';
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
      isValid = false;
    }

    // National code validation
    if (!formData.nationalCode) {
      newErrors.nationalCode = 'کد ملی الزامی است';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.nationalCode)) {
      newErrors.nationalCode = 'کد ملی باید ۱۰ رقم باشد';
      isValid = false;
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'شماره موبایل الزامی است';
      isValid = false;
    } else if (!/^09\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'شماره موبایل نامعتبر است';
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

    // Car information validation
    if (!formData.carModel) {
      newErrors.carModel = 'مدل خودرو الزامی است';
      isValid = false;
    }
    if (!formData.carColor) {
      newErrors.carColor = 'رنگ خودرو الزامی است';
      isValid = false;
    }
    if (!formData.licensePlate) {
      newErrors.licensePlate = 'شماره پلاک الزامی است';
      isValid = false;
    }
    if (!formData.licenseNumber) {
      newErrors.licenseNumber = 'شماره گواهینامه الزامی است';
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
          ثبت‌نام راننده
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  نام
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  نام خانوادگی
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="nationalCode" className="block text-sm font-medium text-gray-700">
                کد ملی
              </label>
              <div className="mt-1">
                <input
                  id="nationalCode"
                  name="nationalCode"
                  type="text"
                  required
                  value={formData.nationalCode}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.nationalCode ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                />
                {errors.nationalCode && (
                  <p className="mt-2 text-sm text-red-600">{errors.nationalCode}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                شماره موبایل
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                  مدل خودرو
                </label>
                <div className="mt-1">
                  <input
                    id="carModel"
                    name="carModel"
                    type="text"
                    required
                    value={formData.carModel}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.carModel ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.carModel && (
                    <p className="mt-2 text-sm text-red-600">{errors.carModel}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="carColor" className="block text-sm font-medium text-gray-700">
                  رنگ خودرو
                </label>
                <div className="mt-1">
                  <input
                    id="carColor"
                    name="carColor"
                    type="text"
                    required
                    value={formData.carColor}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.carColor ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.carColor && (
                    <p className="mt-2 text-sm text-red-600">{errors.carColor}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
                  شماره پلاک
                </label>
                <div className="mt-1">
                  <input
                    id="licensePlate"
                    name="licensePlate"
                    type="text"
                    required
                    value={formData.licensePlate}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.licensePlate ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.licensePlate && (
                    <p className="mt-2 text-sm text-red-600">{errors.licensePlate}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                  شماره گواهینامه
                </label>
                <div className="mt-1">
                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    required
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border ${
                      errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                  />
                  {errors.licenseNumber && (
                    <p className="mt-2 text-sm text-red-600">{errors.licenseNumber}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="nationalCard" className="block text-sm font-medium text-gray-700">
                  تصویر کارت ملی
                </label>
                <div className="mt-1">
                  <input
                    id="nationalCard"
                    name="nationalCard"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700">
                  تصویر گواهینامه
                </label>
                <div className="mt-1">
                  <input
                    id="driverLicense"
                    name="driverLicense"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="carDocument" className="block text-sm font-medium text-gray-700">
                  تصویر سند خودرو
                </label>
                <div className="mt-1">
                  <input
                    id="carDocument"
                    name="carDocument"
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