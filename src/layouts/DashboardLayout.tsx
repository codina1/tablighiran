import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  MegaphoneIcon,
  PhotoIcon,
  WalletIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'داشبورد', href: '/dashboard', icon: HomeIcon },
  { name: 'کمپین‌ها', href: '/dashboard/campaigns', icon: MegaphoneIcon },
  { name: 'تصاویر', href: '/dashboard/images', icon: PhotoIcon },
  { name: 'کیف پول', href: '/dashboard/wallet', icon: WalletIcon },
  { name: 'گزارش‌ها', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'تنظیمات', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-l border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              تبلیغ‌ران
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${
                            location.pathname === item.href
                              ? 'bg-gray-50 text-primary-600'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            location.pathname === item.href ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  to="/logout"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                >
                  <ArrowLeftOnRectangleIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-600"
                    aria-hidden="true"
                  />
                  خروج
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pr-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 