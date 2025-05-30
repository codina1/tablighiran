import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  EyeIcon,
  MapPinIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  CalendarIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

// تایپ‌های مورد نیاز
interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleType: string;
  vehicleModel: string;
  status: 'pending' | 'approved' | 'rejected';
  images: {
    before: string;
    during: string;
    after: string;
  };
}

interface CampaignStats {
  totalViews: number;
  dailyViews: number;
  activeDrivers: number;
  totalEarnings: number;
  cities: {
    name: string;
    views: number;
  }[];
}

// داده‌های نمونه
const sampleCampaign = {
  id: '1',
  title: 'تبلیغات محصول جدید',
  status: 'active',
  budget: 5000000,
  startDate: '1403/01/01',
  endDate: '1403/02/01',
  cities: ['تهران', 'اصفهان', 'شیراز'],
  vehicleTypes: ['سواری', 'وانت'],
  description: 'تبلیغات محصول جدید ما با طراحی جذاب و خلاقانه',
  designUrl: '/designs/campaign1.jpg',
};

const sampleDrivers: Driver[] = [
  {
    id: '1',
    name: 'علی محمدی',
    phone: '09123456789',
    vehicleType: 'سواری',
    vehicleModel: 'پراید',
    status: 'approved',
    images: {
      before: '/images/driver1-before.jpg',
      during: '/images/driver1-during.jpg',
      after: '/images/driver1-after.jpg',
    },
  },
  {
    id: '2',
    name: 'رضا احمدی',
    phone: '09123456790',
    vehicleType: 'وانت',
    vehicleModel: 'پیکان',
    status: 'pending',
    images: {
      before: '/images/driver2-before.jpg',
      during: '/images/driver2-during.jpg',
      after: '/images/driver2-after.jpg',
    },
  },
];

const sampleStats: CampaignStats = {
  totalViews: 25000,
  dailyViews: 1200,
  activeDrivers: 15,
  totalEarnings: 4500000,
  cities: [
    { name: 'تهران', views: 15000 },
    { name: 'اصفهان', views: 6000 },
    { name: 'شیراز', views: 4000 },
  ],
};

// کامپوننت‌های کوچک
const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const DriverCard = ({ driver }: { driver: Driver }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">شماره تماس:</span> {driver.phone}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">نوع خودرو:</span> {driver.vehicleType}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">مدل خودرو:</span> {driver.vehicleModel}
          </p>
        </div>
      </div>
      <div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          driver.status === 'approved' ? 'bg-green-100 text-green-800' :
          driver.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {driver.status === 'approved' ? 'تایید شده' :
           driver.status === 'pending' ? 'در انتظار تایید' :
           'رد شده'}
        </span>
      </div>
    </div>

    <div className="mt-6 grid grid-cols-3 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">قبل از نصب</p>
        <img
          src={driver.images.before}
          alt="قبل از نصب"
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">حین نصب</p>
        <img
          src={driver.images.during}
          alt="حین نصب"
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">بعد از نصب</p>
        <img
          src={driver.images.after}
          alt="بعد از نصب"
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
    </div>

    {driver.status === 'pending' && (
      <div className="mt-6 flex justify-end space-x-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <CheckCircleIcon className="h-5 w-5 ml-2" />
          تایید
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <XCircleIcon className="h-5 w-5 ml-2" />
          رد
        </button>
      </div>
    )}
  </motion.div>
);

export default function CampaignDetails() {
  const [activeTab, setActiveTab] = useState<'overview' | 'drivers' | 'analytics'>('overview');

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{sampleCampaign.title}</h1>
              <p className="mt-1 sm:mt-2 text-sm text-gray-600">
                جزئیات و آمار کمپین تبلیغاتی
              </p>
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              <button
                onClick={() => {/* Handle edit */}}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PencilIcon className="h-5 w-5 ml-2" />
                ویرایش
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="رانندگان فعال"
            value={sampleStats.activeDrivers}
            icon={<TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-blue-500"
          />
          <StatCard
            title="بازدید کل"
            value={sampleStats.totalViews.toLocaleString()}
            icon={<EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-green-500"
          />
          <StatCard
            title="شهرهای هدف"
            value={sampleCampaign.cities.length}
            icon={<MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-yellow-500"
          />
          <StatCard
            title="نوع خودروها"
            value={sampleCampaign.vehicleTypes.length}
            icon={<TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-purple-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`mr-4 sm:mr-8 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <DocumentTextIcon className="h-5 w-5 ml-2 inline-block" />
                اطلاعات کلی
              </button>
              <button
                onClick={() => setActiveTab('drivers')}
                className={`mr-4 sm:mr-8 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'drivers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TruckIcon className="h-5 w-5 ml-2 inline-block" />
                رانندگان
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`mr-4 sm:mr-8 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 ml-2 inline-block" />
                آمار و تحلیل
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">اطلاعات کمپین</h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">عنوان</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sampleCampaign.title}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">توضیحات</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sampleCampaign.description}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">بودجه</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sampleCampaign.budget.toLocaleString()} تومان</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">بازه زمانی</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {sampleCampaign.startDate} تا {sampleCampaign.endDate}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">محدوده فعالیت</h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">شهرها</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {sampleCampaign.cities.join('، ')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">نوع خودروها</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {sampleCampaign.vehicleTypes.join('، ')}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">تصویر تبلیغات</h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={sampleCampaign.designUrl}
                      alt={sampleCampaign.title}
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'drivers' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {sampleDrivers.map((driver) => (
                    <DriverCard key={driver.id} driver={driver} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">آمار کلی</h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">تعداد رانندگان فعال</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sampleStats.activeDrivers} نفر</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">بازدید کل</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sampleStats.totalViews.toLocaleString()} بازدید</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">میانگین بازدید روزانه</dt>
                        <dd className="mt-1 text-sm text-gray-900">{sampleStats.dailyViews.toLocaleString()} بازدید</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">آمار به تفکیک شهر</h3>
                    <dl className="space-y-4">
                      {sampleStats.cities.map((city) => (
                        <div key={city.name}>
                          <dt className="text-sm font-medium text-gray-500">{city.name}</dt>
                          <dd className="mt-1 text-sm text-gray-900">{city.views.toLocaleString()} بازدید</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 