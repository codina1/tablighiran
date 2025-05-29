import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Pricing from './pages/Pricing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SelectUserType from './pages/auth/SelectUserType';
import DriverRegister from './pages/DriverRegister';
import BrandRegister from './pages/BrandRegister';
import DriverDashboard from './pages/driver/DriverDashboard';
import BrandDashboard from './pages/brand/BrandDashboard';
import CampaignDetails from './pages/brand/CampaignDetails';
import CreateCampaign from './pages/brand/CreateCampaign';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register/select-type" element={<SelectUserType />} />
        <Route path="register/driver" element={<DriverRegister />} />
        <Route path="register/brand" element={<BrandRegister />} />
        <Route path="driver/dashboard" element={<DriverDashboard />} />
        <Route path="brand/dashboard" element={<BrandDashboard />} />
        <Route path="brand/campaigns/:id" element={<CampaignDetails />} />
        <Route path="brand/campaigns/create" element={<CreateCampaign />} />
      </Route>
    </Routes>
  );
} 