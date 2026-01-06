
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, LayoutGrid, User as UserIcon, MessageCircle, Phone, Smartphone, ChevronLeft, Wallet } from 'lucide-react';

import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import RechargePage from './pages/Recharge';
import TicketsPage from './pages/Tickets';
import LoginPage from './pages/Login';
import CorporatePage from './pages/Corporate';
import OrdersPage from './pages/Orders';
import OrderDetailPage from './pages/OrderDetail';
import AppointmentsPage from './pages/Appointments';
import DepositPage from './pages/Deposit';
import UserInfoPage from './pages/UserInfo';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userTabs = [
    { path: '/', label: '首页', icon: <HomeIcon size={22} /> },
    { path: '/recharge', label: '余额充值', icon: <Wallet size={22} /> },
    { path: '/corporate', label: '企业订水', icon: <LayoutGrid size={22} /> },
    { path: '/tickets', label: '水票套餐', icon: <Smartphone size={22} /> },
    { path: '/profile', label: '我的', icon: <UserIcon size={22} /> },
  ];

  const hideOn = ['/login', '/user-info'];
  const isDetailPage = location.pathname.startsWith('/orders/');
  
  if (hideOn.includes(location.pathname) || isDetailPage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 safe-bottom z-50">
      {userTabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
          >
            {tab.icon}
            <span className="text-[10px] sm:text-xs">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Don't show back button on main tabs
  const showBack = !['/', '/profile', '/corporate', '/tickets', '/recharge'].includes(location.pathname);

  const getTitle = () => {
    if (location.pathname.startsWith('/orders/')) return '订单详情';
    switch (location.pathname) {
      case '/': return '订水驿站';
      case '/profile': return '个人中心';
      case '/recharge': return '余额充值';
      case '/tickets': return '水票套餐';
      case '/corporate': return '企业服务';
      case '/orders': return '我的订单';
      case '/appointments': return '我的预约';
      case '/deposit': return '押金管理';
      case '/user-info': return '个人信息管理';
      case '/login': return '用户登录';
      default: return '订水驿站';
    }
  };

  return (
    <div className="sticky top-0 bg-white z-40 px-4 h-12 flex items-center justify-between border-b border-gray-50">
      {showBack ? (
        <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft size={24} /></button>
      ) : <div className="w-8" />}
      <h1 className="text-lg font-bold">{getTitle()}</h1>
      <div className="w-8" />
    </div>
  );
};

const FloatingServices: React.FC = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  if (!['/', '/profile', '/recharge'].includes(location.pathname)) return null;
  
  return (
    <div className="fixed right-4 bottom-24 flex flex-col gap-3 z-40">
       {show && (
         <>
          <a href="tel:10086" className="bg-white p-3 rounded-full shadow-lg border border-gray-100 text-blue-500 hover:scale-110 transition-transform flex items-center justify-center">
            <Phone size={24} />
          </a>
          <button className="bg-white p-3 rounded-full shadow-lg border border-gray-100 text-green-500 hover:scale-110 transition-transform flex items-center justify-center">
            <MessageCircle size={24} />
          </button>
         </>
       )}
       <button 
         onClick={() => setShow(!show)}
         className="bg-blue-600 p-4 rounded-full shadow-xl text-white transform hover:rotate-12 transition-all flex items-center justify-center"
       >
         {show ? <span className="font-bold text-xl">×</span> : <MessageCircle size={24} />}
       </button>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
        <Header />
        <main className="flex-1 pb-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recharge" element={<RechargePage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/corporate" element={<CorporatePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/deposit" element={<DepositPage />} />
            <Route path="/user-info" element={<UserInfoPage />} />
          </Routes>
        </main>
        <FloatingServices />
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
