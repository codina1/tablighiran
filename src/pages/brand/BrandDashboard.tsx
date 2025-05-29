import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PlusCircleIcon,
  MapIcon,
  ChartBarIcon,
  BellIcon,
  CreditCardIcon,
  PhotoIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

// تایپ‌های مورد نیاز
interface Campaign {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'completed';
  budget: number;
  startDate: string;
  endDate: string;
  cities: string[];
  vehicleTypes: string[];
  drivers: number;
  views: number;
  designUrl: string;
}

interface Payment {
  id: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed';
}

// داده‌های نمونه
const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'تبلیغات محصول جدید',
    status: 'active',
    budget: 5000000,
    startDate: '1403/01/01',
    endDate: '1403/02/01',
    cities: ['تهران', 'اصفهان', 'شیراز'],
    vehicleTypes: ['سواری', 'وانت'],
    drivers: 15,
    views: 25000,
    designUrl: '/designs/campaign1.jpg',
  },
  {
    id: '2',
    title: 'فروش ویژه تابستانه',
    status: 'pending',
    budget: 3000000,
    startDate: '1403/03/01',
    endDate: '1403/04/01',
    cities: ['تهران'],
    vehicleTypes: ['سواری'],
    drivers: 8,
    views: 12000,
    designUrl: '/designs/campaign2.jpg',
  },
];

const samplePayments: Payment[] = [
  {
    id: '1',
    campaignId: '1',
    campaignTitle: 'تبلیغات محصول جدید',
    amount: 5000000,
    date: '1403/01/01',
    status: 'completed',
  },
  {
    id: '2',
    campaignId: '2',
    campaignTitle: 'فروش ویژه تابستانه',
    amount: 3000000,
    date: '1403/03/01',
    status: 'pending',
  },
];

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
        {Icon}
      </div>
    </div>
  </motion.div>
);

const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">بودجه:</span> {campaign.budget.toLocaleString()} تومان
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">بازه زمانی:</span> {campaign.startDate} تا {campaign.endDate}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">شهرها:</span> {campaign.cities.join('، ')}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">نوع خودرو:</span> {campaign.vehicleTypes.join('، ')}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          campaign.status === 'active' ? 'bg-green-100 text-green-800' :
          campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {campaign.status === 'active' ? 'فعال' :
           campaign.status === 'pending' ? 'در انتظار' :
           'تکمیل شده'}
        </span>
        <div className="mt-4 flex space-x-2">
          <Link
            to={`/brand/campaigns/${campaign.id}/map`}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <MapIcon className="h-5 w-5" />
          </Link>
          <Link
            to={`/brand/campaigns/${campaign.id}/analytics`}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <ChartBarIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm">
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">
          <TruckIcon className="h-4 w-4 inline-block ml-1" />
          {campaign.drivers} راننده
        </span>
        <span className="text-gray-600">
          <PhotoIcon className="h-4 w-4 inline-block ml-1" />
          {campaign.views.toLocaleString()} بازدید
        </span>
      </div>
      <Link
        to={`/brand/campaigns/${campaign.id}`}
        className="text-indigo-600 hover:text-indigo-500 font-medium"
      >
        مشاهده جزئیات
      </Link>
    </div>
  </motion.div>
);

const PaymentCard = ({ payment }: { payment: Payment }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{payment.campaignTitle}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {payment.date}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">
          {payment.amount.toLocaleString()} تومان
        </p>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
          payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {payment.status === 'completed' ? 'پرداخت شده' : 'در انتظار پرداخت'}
        </span>
      </div>
    </div>
  </motion.div>
);

const BrandDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'payments'>('campaigns');

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">داشبورد برند</h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-600">
            مدیریت کمپین‌های تبلیغاتی و پرداخت‌ها
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="کمپین‌های فعال"
            value="3"
            icon={<ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-blue-500"
          />
          <StatCard
            title="بازدید کل"
            value="12,500"
            icon={<ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-green-500"
          />
          <StatCard
            title="پرداخت‌های در انتظار"
            value="2,500,000"
            icon={<CreditCardIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-yellow-500"
          />
          <StatCard
            title="اعلان‌های جدید"
            value="5"
            icon={<BellIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            color="bg-red-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`mr-4 sm:mr-8 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'campaigns'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                کمپین‌ها
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`mr-4 sm:mr-8 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'payments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                پرداخت‌ها
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'campaigns' ? (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">کمپین‌های تبلیغاتی</h2>
                  <Link
                    to="/brand/campaigns/create"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusCircleIcon className="h-5 w-5 ml-2" />
                    ایجاد کمپین جدید
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {sampleCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">تاریخچه پرداخت‌ها</h2>
                <div className="space-y-4">
                  {samplePayments.map((payment) => (
                    <PaymentCard key={payment.id} payment={payment} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard; 