// کاربران نمونه
export const sampleUsers = {
  driver: {
    id: '1',
    email: 'driver@example.com',
    password: '123456',
    role: 'driver',
    name: 'علی محمدی',
    phone: '09123456789',
  },
  brand: {
    id: '2',
    email: 'brand@example.com',
    password: '123456',
    role: 'brand',
    name: 'شرکت تبلیغاتی نمونه',
    phone: '09123456790',
  },
};

// تایپ‌های مورد نیاز
export interface User {
  id: string;
  email: string;
  role: 'driver' | 'brand';
  name: string;
  phone: string;
}

// توابع مدیریت احراز هویت
export const login = (email: string, password: string): User | null => {
  const user = Object.values(sampleUsers).find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    // حذف رمز عبور از اطلاعات کاربر
    const { password: _, ...userWithoutPassword } = user;
    // ذخیره اطلاعات کاربر در localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return { ...userWithoutPassword, role: userWithoutPassword.role as 'driver' | 'brand' };
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const isDriver = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'driver';
};

export const isBrand = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'brand';
}; 