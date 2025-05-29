import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const navigation = {
  main: [
    { name: 'درباره ما', href: '/about' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'قیمت‌ها', href: '/pricing' },
    { name: 'تماس با ما', href: '/contact' },
  ],
  social: [
    {
      name: 'Instagram',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const contactInfo = [
  {
    name: 'تلفن تماس',
    value: '۰۲۱-۱۲۳۴۵۶۷۸',
    icon: PhoneIcon,
  },
  {
    name: 'ایمیل',
    value: 'info@tablighran.com',
    icon: EnvelopeIcon,
  },
  {
    name: 'آدرس',
    value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    icon: MapPinIcon,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/images/pattern.svg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl bg-primary/5 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground">به خبرنامه ما بپیوندید</h3>
          <p className="mt-2 text-muted-foreground">
            برای اطلاع از آخرین اخبار و تخفیف‌ها، ایمیل خود را وارد کنید
          </p>
          <div className="mt-6 flex max-w-md mx-auto gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              آدرس ایمیل
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-lg border-0 bg-white/5 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="ایمیل خود را وارد کنید"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex-none rounded-lg bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              عضویت
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-4"
        >
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo.svg"
                alt="Tablighran"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-foreground">تبلیغران</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              پلتفرم هوشمند تبلیغات خودرویی برای رانندگان و برندها
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.1 }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">دسترسی سریع</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: -5 }}
                >
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">اطلاعات تماس</h3>
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: -5 }}
                  className="flex items-center space-x-3 text-sm text-muted-foreground"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <span>{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Download App */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">دانلود اپلیکیشن</h3>
            <p className="text-sm text-muted-foreground">
              اپلیکیشن تبلیغران را دانلود کنید و در هر زمان و مکان به خدمات ما دسترسی داشته باشید
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 transition-all hover:bg-primary/20"
              >
                <span>دانلود از کافه‌بازار</span>
                <ArrowRightIcon className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} تبلیغران. تمامی حقوق محفوظ است.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 