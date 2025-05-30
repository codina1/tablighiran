import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  TruckIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  MapPinIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import HeroSlider from '../components/HeroSlider';

const features = [
  {
    name: 'درآمد هوشمند',
    description: 'با تبلیغات روی خودروی شخصی خود درآمد کسب کنید',
    icon: TruckIcon,
    image: '/images/income.svg',
  },
  {
    name: 'امنیت و حریم خصوصی',
    description: 'اطلاعات شما با بالاترین استانداردهای امنیتی محافظت می‌شود',
    icon: ShieldCheckIcon,
    image: '/images/security.svg',
  },
  {
    name: 'تبلیغات هدفمند',
    description: 'تبلیغات شما به مخاطبان مناسب نمایش داده می‌شود',
    icon: ChartBarIcon,
    image: '/images/target.svg',
  },
  {
    name: 'ناوگان گسترده',
    description: 'به هزاران خودرو در سراسر کشور دسترسی داشته باشید',
    icon: UserGroupIcon,
    image: '/images/fleet.svg',
  },
];

const stats = [
  { name: 'راننده فعال', value: '۵,۰۰۰+', icon: '/images/driver.svg' },
  { name: 'برند همکار', value: '۲۰۰+', icon: '/images/brand.svg' },
  { name: 'خودرو تبلیغاتی', value: '۱۰,۰۰۰+', icon: '/images/car.svg' },
  { name: 'مخاطب روزانه', value: '۵۰۰,۰۰۰+', icon: '/images/audience.svg' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <motion.div
          style={{ opacity, scale }}
          className="mx-auto max-w-7xl px-6 pb-16 pt-8 sm:pb-24 lg:flex lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                <SparklesIcon className="h-4 w-4" />
                <span>جدیدترین پلتفرم تبلیغات خودرویی</span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                تبلیغات هوشمند روی خودروهای شخصی
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                با تبلیغران، خودروی شخصی شما به یک رسانه تبلیغاتی تبدیل می‌شود. درآمد کسب کنید و در عین حال به رشد کسب و کارها کمک کنید.
              </p>
            </motion.div>
            <div className="mt-8 flex items-center gap-x-6">
              <Link
                to="/register/driver"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <span>شروع کنید</span>
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                className="group text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                بیشتر بدانید
                <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl sm:mt-12 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <motion.div
              variants={floatAnimation}
              initial="initial"
              animate="animate"
              className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none"
            >
              <img
                src="/images/hero.svg"
                alt="تبلیغات خودرویی"
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary">ویژگی‌های منحصر به فرد</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              همه چیز برای تبلیغات هوشمند
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              با تبلیغران، تبلیغات خودرویی را به روشی نوین و هوشمند تجربه کنید.
            </p>
          </motion.div>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={itemVariants}
                className="group relative flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-6 h-16 w-16 rounded-full bg-primary/10 p-3 text-primary ring-1 ring-primary/20 transition-all group-hover:bg-primary/20"
                >
                  <feature.icon className="h-10 w-10" aria-hidden="true" />
                </motion.div>
                <dt className="text-base font-semibold leading-7 text-foreground">{feature.name}</dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-4"
                >
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="h-32 w-32 rounded-lg object-cover opacity-75 transition-all group-hover:opacity-100"
                  />
                </motion.div>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              آمار و ارقام
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              با هزاران راننده و برند همکاری می‌کنیم
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative flex flex-col items-center bg-card p-8 transition-all hover:bg-card/80"
              >
                <motion.img
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  src={stat.icon}
                  alt={stat.name}
                  className="mb-4 h-12 w-12 opacity-75 transition-all group-hover:opacity-100"
                />
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">{stat.value}</dd>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden bg-primary px-6 py-20 text-center shadow-2xl sm:rounded-3xl sm:px-16"
        >
          <div className="absolute inset-0 -z-10 opacity-20">
            <img
              src="/images/pattern.svg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              همین حالا به تبلیغران بپیوندید
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/80">
              چه راننده هستید و چه صاحب برند، تبلیغران بهترین گزینه برای شماست.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-x-6"
          >
            <Link
              to="/register/driver"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-primary shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
            >
              <span>ثبت‌نام راننده</span>
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/register/brand"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-primary shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
            >
              <span>ثبت‌نام برند</span>
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 