import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BuildingOfficeIcon, PhoneIcon, EnvelopeIcon, PhotoIcon } from '@heroicons/react/24/outline';

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
};

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

// دسته‌بندی‌های کاری
const businessCategories = [
  { id: 'retail', name: 'خرده فروشی' },
  { id: 'wholesale', name: 'عمده فروشی' },
  { id: 'service', name: 'خدمات' },
  { id: 'manufacturing', name: 'تولید' },
  { id: 'technology', name: 'فناوری' },
  { id: 'food', name: 'رستوران و فست فود' },
  { id: 'fashion', name: 'مد و پوشاک' },
  { id: 'beauty', name: 'زیبایی و آرایشی' },
  { id: 'health', name: 'سلامت و پزشکی' },
  { id: 'education', name: 'آموزش' },
  { id: 'entertainment', name: 'سرگرمی' },
  { id: 'other', name: 'سایر' }
];

interface FormData {
  brandName: string;
  phone: string;
  email: string;
  category: string;
  logo: File | null;
  googleConnected: boolean;
  phoneVerified: boolean;
}

interface FormErrors {
  brandName?: string;
  phone?: string;
  email?: string;
  category?: string;
  logo?: string;
}

const BrandRegister: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    phone: '',
    email: '',
    category: '',
    logo: null,
    googleConnected: false,
    phoneVerified: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.brandName.trim()) {
      newErrors.brandName = 'نام برند الزامی است';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'شماره تماس الزامی است';
    } else if (!/^09[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'شماره تماس معتبر نیست';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.category) {
      newErrors.category = 'دسته‌بندی کاری الزامی است';
    }
    
    if (!formData.logo) {
      newErrors.logo = 'لوگوی برند الزامی است';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // پاک کردن خطای مربوطه هنگام شروع تایپ
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({ ...prev, logo: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد' }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'فقط فایل‌های تصویری مجاز هستند' }));
        return;
      }
      setFormData(prev => ({ ...prev, logo: file }));
      setErrors(prev => ({ ...prev, logo: undefined }));
    }
  };

  const handleGoogleConnect = () => {
    // اینجا می‌توانید منطق اتصال به گوگل را پیاده‌سازی کنید
    setFormData(prev => ({ ...prev, googleConnected: !prev.googleConnected }));
  };

  const handlePhoneVerification = () => {
    // اینجا می‌توانید منطق تأیید شماره تلفن را پیاده‌سازی کنید
    setFormData(prev => ({ ...prev, phoneVerified: !prev.phoneVerified }));
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateStep1() || !validateStep2()) return;
    
    setIsSubmitting(true);
    
    try {
      // اینجا می‌توانید منطق ارسال فرم به سرور را پیاده‌سازی کنید
      await new Promise(resolve => setTimeout(resolve, 2000)); // شبیه‌سازی درخواست
      console.log('Form submitted:', formData);
      // نمایش پیام موفقیت یا ریدایرکت
    } catch (error) {
      console.error('Error submitting form:', error);
      // نمایش پیام خطا
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
              ثبت‌نام شرکت/برند
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              به تبلیغران بپیوندید و کسب و کار خود را رشد دهید
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
              {[1, 2].map((stepNumber) => (
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
                  {stepNumber < 2 && (
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
              {/* Step 1: Basic Information */}
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
                    اطلاعات پایه
                  </motion.h2>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label htmlFor="brandName" className={labelStyles.base}>
                        نام برند
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <input
                          type="text"
                          name="brandName"
                          id="brandName"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.brandName ? inputStyles.error : ''
                          }`}
                          placeholder="نام برند خود را وارد کنید"
                          value={formData.brandName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.brandName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.brandName}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <label htmlFor="phone" className={labelStyles.base}>
                        شماره تماس
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
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.phone}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <label htmlFor="email" className={labelStyles.base}>
                        ایمیل
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
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
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
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

              {/* Step 2: Business Details */}
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
                    اطلاعات کسب و کار
                  </motion.h2>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label htmlFor="category" className={labelStyles.base}>
                        دسته‌بندی کاری
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm group">
                        <select
                          id="category"
                          name="category"
                          required
                          className={`${inputStyles.base} ${inputStyles.hover} ${
                            errors.category ? inputStyles.error : ''
                          } appearance-none bg-white`}
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="">انتخاب دسته‌بندی</option>
                          {businessCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.category && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.category}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <label className={labelStyles.base}>
                        لوگوی برند
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200 group">
                        <div className="space-y-1 text-center">
                          {formData.logo ? (
                            <motion.div 
                              className="relative"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <img
                                src={URL.createObjectURL(formData.logo)}
                                alt="Logo preview"
                                className="mx-auto h-32 w-auto object-contain rounded-lg shadow-md"
                              />
                              <motion.button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, logo: null }))}
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
                              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="logo"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>آپلود لوگو</span>
                                  <input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleLogoUpload}
                                  />
                                </label>
                                <p className="pr-1">یا فایل را اینجا رها کنید</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF تا ۵MB</p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      {errors.logo && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.logo}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <button
                        type="button"
                        onClick={handleGoogleConnect}
                        className={`w-full flex justify-center items-center py-3 px-4 border rounded-lg shadow-sm text-sm font-medium transition-all duration-200 ${
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

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <button
                        type="button"
                        onClick={handlePhoneVerification}
                        className={`w-full flex justify-center items-center py-3 px-4 border rounded-lg shadow-sm text-sm font-medium transition-all duration-200 ${
                          formData.phoneVerified
                            ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        <PhoneIcon className="h-5 w-5 ml-2" />
                        {formData.phoneVerified ? 'تلفن تأیید شده' : 'تأیید شماره تلفن'}
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
                      onClick={() => setStep(1)}
                      className="flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      بازگشت
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
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

export default BrandRegister; 