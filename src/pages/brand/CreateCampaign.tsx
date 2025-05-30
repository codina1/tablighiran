import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface CampaignFormData {
  title: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  cities: string[];
  vehicleTypes: string[];
  adImage: File | null;
  terms: string;
}

interface CampaignFormErrors {
  title?: string;
  description?: string;
  budget?: string;
  startDate?: string;
  endDate?: string;
  cities?: string;
  vehicleTypes?: string;
  adImage?: string;
  terms?: string;
}

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    budget: 0,
    startDate: '',
    endDate: '',
    cities: [],
    vehicleTypes: [],
    adImage: null,
    terms: '',
  });

  const validateStep = (): boolean => {
    const newErrors: CampaignFormErrors = {};

    if (step === 1) {
      if (!formData.title) newErrors.title = 'عنوان کمپین الزامی است';
      if (!formData.description) newErrors.description = 'توضیحات کمپین الزامی است';
      if (formData.budget <= 0) newErrors.budget = 'بودجه باید بیشتر از صفر باشد';
    }

    if (step === 2) {
      if (!formData.startDate) newErrors.startDate = 'تاریخ شروع الزامی است';
      if (!formData.endDate) newErrors.endDate = 'تاریخ پایان الزامی است';
      if (formData.cities.length === 0) newErrors.cities = 'حداقل یک شهر باید انتخاب شود';
      if (formData.vehicleTypes.length === 0) newErrors.vehicleTypes = 'حداقل یک نوع خودرو باید انتخاب شود';
    }

    if (step === 3) {
      if (!formData.adImage) newErrors.adImage = 'تصویر تبلیغات الزامی است';
      if (!formData.terms) newErrors.terms = 'شرایط همکاری الزامی است';
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: any) => {
    try {
      console.log('Campaign data:', data);
      // TODO: Implement API call
      navigate('/brand/dashboard');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, adImage: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ایجاد کمپین جدید</h1>
              <p className="mt-1 sm:mt-2 text-sm text-gray-600">
                اطلاعات کمپین تبلیغاتی خود را وارد کنید
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${
                      s < step ? 'text-green-600' : s === step ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        s < step
                          ? 'border-green-600 bg-green-50'
                          : s === step
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {s < step ? '✓' : s}
                    </div>
                    <span className={`mr-2 text-sm font-medium ${
                      s <= step ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {s === 1 ? 'اطلاعات پایه' : s === 2 ? 'جزئیات کمپین' : 'مستندات'}
                    </span>
                    {s < 3 && (
                      <div
                        className={`h-0.5 w-16 ${
                          s < step ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      عنوان کمپین
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      توضیحات
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                      بودجه (تومان)
                    </label>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Campaign Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        تاریخ شروع
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        تاریخ پایان
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      شهرهای هدف
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="cities"
                          value="tehran"
                          checked={formData.cities.includes("tehran")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, cities: [...formData.cities, "tehran"] });
                            } else {
                              setFormData({ ...formData, cities: formData.cities.filter((c) => c !== "tehran") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">تهران</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="cities"
                          value="mashhad"
                          checked={formData.cities.includes("mashhad")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, cities: [...formData.cities, "mashhad"] });
                            } else {
                              setFormData({ ...formData, cities: formData.cities.filter((c) => c !== "mashhad") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">مشهد</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="cities"
                          value="isfahan"
                          checked={formData.cities.includes("isfahan")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, cities: [...formData.cities, "isfahan"] });
                            } else {
                              setFormData({ ...formData, cities: formData.cities.filter((c) => c !== "isfahan") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">اصفهان</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="cities"
                          value="shiraz"
                          checked={formData.cities.includes("shiraz")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, cities: [...formData.cities, "shiraz"] });
                            } else {
                              setFormData({ ...formData, cities: formData.cities.filter((c) => c !== "shiraz") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">شیراز</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="cities"
                          value="tabriz"
                          checked={formData.cities.includes("tabriz")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, cities: [...formData.cities, "tabriz"] });
                            } else {
                              setFormData({ ...formData, cities: formData.cities.filter((c) => c !== "tabriz") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">تبریز</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع خودرو
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="vehicleTypes"
                          value="sedan"
                          checked={formData.vehicleTypes.includes("sedan")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, vehicleTypes: [...formData.vehicleTypes, "sedan"] });
                            } else {
                              setFormData({ ...formData, vehicleTypes: formData.vehicleTypes.filter((t) => t !== "sedan") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">سدان</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="vehicleTypes"
                          value="suv"
                          checked={formData.vehicleTypes.includes("suv")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, vehicleTypes: [...formData.vehicleTypes, "suv"] });
                            } else {
                              setFormData({ ...formData, vehicleTypes: formData.vehicleTypes.filter((t) => t !== "suv") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">شاسی بلند</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="vehicleTypes"
                          value="van"
                          checked={formData.vehicleTypes.includes("van")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, vehicleTypes: [...formData.vehicleTypes, "van"] });
                            } else {
                              setFormData({ ...formData, vehicleTypes: formData.vehicleTypes.filter((t) => t !== "van") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">ون</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="vehicleTypes"
                          value="truck"
                          checked={formData.vehicleTypes.includes("truck")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, vehicleTypes: [...formData.vehicleTypes, "truck"] });
                            } else {
                              setFormData({ ...formData, vehicleTypes: formData.vehicleTypes.filter((t) => t !== "truck") });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="mr-2 text-sm text-gray-700">کامیون</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Advertisement */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      تصویر تبلیغات
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="adImage"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>آپلود تصویر</span>
                            <input
                              id="adImage"
                              name="adImage"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pr-1">یا فایل را اینجا رها کنید</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF تا 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
                      شرایط همکاری
                    </label>
                    <textarea
                      id="terms"
                      name="terms"
                      rows={4}
                      value={formData.terms}
                      onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    مرحله قبل
                  </button>
                )}
                <button
                  type={step === 3 ? 'submit' : 'button'}
                  onClick={step === 3 ? undefined : handleNext}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {step === 3 ? 'ایجاد کمپین' : 'مرحله بعد'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign; 