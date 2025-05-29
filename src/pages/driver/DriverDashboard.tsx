import * as React from 'react';
import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PauseCircleIcon,
  TruckIcon,
  PhotoIcon,
  UserCircleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

// تایپ‌های مورد نیاز
interface Campaign {
  id: string;
  title: string;
  brand: string;
  status: 'active' | 'pending' | 'completed';
  startDate: string;
  endDate: string;
  payment: number;
  images: {
    before?: string;
    during?: string;
    after?: string;
  };
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed';
  campaign: string;
}

// داده‌های نمونه
const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'کمپین تبلیغاتی برند X',
    brand: 'برند X',
    status: 'active',
    startDate: '1403/01/01',
    endDate: '1403/03/31',
    payment: 5000000,
    images: {
      before: '/images/before1.jpg',
      during: '/images/during1.jpg',
    },
  },
  {
    id: '2',
    title: 'کمپین تبلیغاتی برند Y',
    brand: 'برند Y',
    status: 'pending',
    startDate: '1403/02/01',
    endDate: '1403/04/30',
    payment: 4500000,
    images: {},
  },
];

const samplePayments: Payment[] = [
  {
    id: '1',
    amount: 5000000,
    date: '1403/01/15',
    status: 'completed',
    campaign: 'کمپین تبلیغاتی برند X',
  },
  {
    id: '2',
    amount: 4500000,
    date: '1403/02/15',
    status: 'pending',
    campaign: 'کمپین تبلیغاتی برند Y',
  },
];

// کامپوننت‌های کوچک
const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg shadow-sm p-6"
  >
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="mr-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </motion.div>
);

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-gray-100 text-gray-800',
  };

  const statusIcons = {
    active: CheckCircleIcon,
    pending: PauseCircleIcon,
    completed: XCircleIcon,
  };

  const StatusIcon = statusIcons[campaign.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
          <p className="text-sm text-gray-500">{campaign.brand}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
          <StatusIcon className="ml-1 h-4 w-4" />
          {campaign.status === 'active' ? 'فعال' : campaign.status === 'pending' ? 'معلق' : 'پایان‌یافته'}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">تاریخ شروع</p>
          <p className="text-sm font-medium text-gray-900">{campaign.startDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">تاریخ پایان</p>
          <p className="text-sm font-medium text-gray-900">{campaign.endDate}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">مبلغ پرداختی</p>
        <p className="text-lg font-semibold text-gray-900">{campaign.payment.toLocaleString()} تومان</p>
      </div>
      <div className="mt-4 flex space-x-2 space-x-reverse">
        {!campaign.images.before && (
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PhotoIcon className="ml-2 h-4 w-4" />
            آپلود تصویر قبل
          </button>
        )}
        {!campaign.images.during && (
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PhotoIcon className="ml-2 h-4 w-4" />
            آپلود تصویر حین
          </button>
        )}
        {!campaign.images.after && (
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PhotoIcon className="ml-2 h-4 w-4" />
            آپلود تصویر بعد
          </button>
        )}
      </div>
    </motion.div>
  );
};

const PaymentCard = ({ payment }: { payment: Payment }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg shadow-sm p-6"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{payment.campaign}</h3>
        <p className="text-sm text-gray-500">{payment.date}</p>
      </div>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {payment.status === 'completed' ? 'پرداخت شده' : 'در انتظار پرداخت'}
      </span>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-500">مبلغ</p>
      <p className="text-lg font-semibold text-gray-900">{payment.amount.toLocaleString()} تومان</p>
    </div>
  </motion.div>
);

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = React.useState('campaigns');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* هدر */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">داشبورد راننده</h1>
              <p className="mt-1 text-sm text-gray-500">مدیریت کمپین‌ها و درآمدها</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <UserCircleIcon className="ml-2 h-5 w-5" />
              ویرایش پروفایل
            </button>
          </div>
        </div>

        {/* آمار کلی */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="درآمد کل"
            value="9,500,000 تومان"
            icon={CurrencyDollarIcon}
            color="text-green-600"
          />
          <StatCard
            title="کمپین‌های فعال"
            value="2"
            icon={TruckIcon}
            color="text-blue-600"
          />
          <StatCard
            title="درآمد این ماه"
            value="5,000,000 تومان"
            icon={ChartBarIcon}
            color="text-indigo-600"
          />
          <StatCard
            title="پرداخت‌های در انتظار"
            value="4,500,000 تومان"
            icon={ClockIcon}
            color="text-yellow-600"
          />
        </div>

        {/* تب‌ها */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`${
                  activeTab === 'campaigns'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                کمپین‌ها
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`${
                  activeTab === 'payments'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                پرداخت‌ها
              </button>
            </nav>
          </div>
        </div>

        {/* محتوای تب‌ها */}
        <div className="mt-8">
          {activeTab === 'campaigns' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sampleCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {samplePayments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 