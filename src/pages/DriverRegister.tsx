import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
};

const vehicleTypes = [
  { id: 'sedan', name: 'سدان' },
  { id: 'hatchback', name: 'هاچ‌بک' },
  { id: 'suv', name: 'شاسی بلند' },
  { id: 'van', name: 'ون' },
  { id: 'pickup', name: 'وانت' }
];

const cities = [
  { id: 'tehran', name: 'تهران' },
  { id: 'karaj', name: 'کرج' },
  { id: 'isfahan', name: 'اصفهان' },
  { id: 'shiraz', name: 'شیراز' },
  { id: 'mashhad', name: 'مشهد' }
];

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  city?: string;
  vehicleType?: string;
  plateNumber?: string;
  vehicleImage?: string;
}

const inputStyles = {
  base: "block w-full pr-10 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200",
  hover: "hover:border-indigo-400 hover:shadow-sm",
  error: "border-red-300 focus:ring-red-500 focus:border-red-500",
  success: "border-green-300 focus:ring-green-500 focus:border-green-500",
  disabled: "bg-gray-50 cursor-not-allowed opacity-75"
};

const labelStyles = {
  base: "block text-sm font-medium text-gray-700 mb-2",
  required: "after:content-['*'] after:ml-1 after:text-red-500"
};

const DriverRegister: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    vehicleType: '',
    plateNumber: '',
    vehicleImage: null as File | null,
    googleConnected: false
  });

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'نام الزامی است';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'شماره موبایل الزامی است';
      isValid = false;
    } else if (!/^09[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'شماره موبایل نامعتبر است';
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.city) {
      newErrors.city = 'شهر الزامی است';
      isValid = false;
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = 'نوع وسیله نقلیه الزامی است';
      isValid = false;
    }

    if (!formData.plateNumber.trim()) {
      newErrors.plateNumber = 'شماره پلاک الزامی است';
      isValid = false;
    } else if (!/^[0-9]{2}[الف-ی][0-9]{3}$/.test(formData.plateNumber)) {
      newErrors.plateNumber = 'شماره پلاک نامعتبر است';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          vehicleImage: 'حجم تصویر نباید بیشتر از ۵ مگابایت باشد'
        }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          vehicleImage: 'فایل باید تصویر باشد'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        vehicleImage: file
      }));
      setErrors(prev => ({
        ...prev,
        vehicleImage: undefined
      }));
    }
  };

  const handleGoogleConnect = () => {
    // Here you would implement Google OAuth
    setFormData(prev => ({
      ...prev,
      googleConnected: true
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    try {
      // Here you would implement form submission
      console.log(formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle success
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
              ثبت‌نام راننده تبلیغاتی
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              به خانواده بزرگ تبلیغران بپیوندید و درآمد خود را افزایش دهید
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step >= stepNumber ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {stepNumber}
                  </motion.div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-24 h-1 transition-colors duration-300 ${
                        step > stepNumber ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  {...slideIn}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                >
                  <motion.h2 
                    className="text-2xl font-bold text-gray-900 mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    اطلاعات شخصی
                  </motion.h2>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label htmlFor="firstName" className={labelStyles.base}>
                        نام
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.firstName ? inputStyles.error : ''
                          }`}
                          placeholder="نام خود را وارد کنید"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.firstName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.firstName}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <label htmlFor="lastName" className={labelStyles.base}>
                        نام خانوادگی
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.lastName ? inputStyles.error : ''
                          }`}
                          placeholder="نام خانوادگی خود را وارد کنید"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.lastName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.lastName}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <label htmlFor="phone" className={labelStyles.base}>
                        شماره موبایل
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.phone ? inputStyles.error : ''
                          }`}
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <label htmlFor="email" className={labelStyles.base}>
                        ایمیل (اختیاری)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.email ? inputStyles.error : ''
                          }`}
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      ادامه
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Location Information */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  {...slideIn}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                >
                  <motion.h2 
                    className="text-2xl font-bold text-gray-900 mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    اطلاعات موقعیت
                  </motion.h2>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label htmlFor="city" className={labelStyles.base}>
                        شهر محل تردد
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <select
                          id="city"
                          name="city"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.city ? inputStyles.error : ''
                          } appearance-none bg-white`}
                          value={formData.city}
                          onChange={handleInputChange}
                        >
                          <option value="">انتخاب شهر</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.city && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.city}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <label htmlFor="vehicleType" className={labelStyles.base}>
                        نوع وسیله نقلیه
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <TruckIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <select
                          id="vehicleType"
                          name="vehicleType"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.vehicleType ? inputStyles.error : ''
                          }`}
                          value={formData.vehicleType}
                          onChange={handleInputChange}
                        >
                          <option value="">انتخاب کنید</option>
                          {vehicleTypes.map(type => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.vehicleType && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.vehicleType}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <label htmlFor="plateNumber" className={labelStyles.base}>
                        شماره پلاک
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <DocumentIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <input
                          type="text"
                          name="plateNumber"
                          id="plateNumber"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.plateNumber ? inputStyles.error : ''
                          }`}
                          placeholder="۱۲۳ الف ۴۵"
                          value={formData.plateNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.plateNumber && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.plateNumber}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-8 flex justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      بازگشت
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:shadow-lg"
                    >
                      ادامه
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Vehicle Image and Google Connection */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  {...slideIn}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                >
                  <motion.h2 
                    className="text-2xl font-bold text-gray-900 mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    تصویر خودرو و اتصال به گوگل
                  </motion.h2>
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label className={labelStyles.base}>
                        تصویر خودرو
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200 group">
                        <div className="space-y-1 text-center">
                          {formData.vehicleImage ? (
                            <motion.div 
                              className="relative"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <img
                                src={URL.createObjectURL(formData.vehicleImage)}
                                alt="Vehicle preview"
                                className="mx-auto h-32 w-auto object-cover rounded-lg shadow-md"
                              />
                              <motion.button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, vehicleImage: null }))}
                                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </motion.button>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="group-hover:scale-105 transition-transform duration-200"
                            >
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="vehicleImage"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>آپلود تصویر</span>
                                  <input
                                    id="vehicleImage"
                                    name="vehicleImage"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                  />
                                </label>
                                <p className="pr-1">یا فایل را اینجا رها کنید</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF تا ۵MB</p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      {errors.vehicleImage && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.vehicleImage}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <button
                        type="button"
                        onClick={handleGoogleConnect}
                        className={`w-full flex justify-center items-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium transition-all duration-200 ${
                          formData.googleConnected
                            ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        <img
                          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                          alt="Google"
                          className="h-5 w-5 ml-2"
                        />
                        {formData.googleConnected ? 'متصل به گوگل' : 'اتصال به گوگل (اختیاری)'}
                      </button>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-8 flex justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      بازگشت
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'
                      }`}
                    >
                      {isSubmitting ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center"
                        >
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          در حال ثبت‌نام...
                        </motion.div>
                      ) : (
                        'ثبت‌نام'
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DriverRegister; 