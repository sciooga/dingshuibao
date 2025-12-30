
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Wallet, 
  Package, 
  ChevronRight, 
  Truck, 
  Volume2,
  VolumeX,
  AlertCircle,
  Megaphone,
  LogOut
} from 'lucide-react';

const DeliveryDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [audioAlert, setAudioAlert] = useState(true);

  const stats = {
    todayOrders: 18,
    todayEarnings: "126.00",
    serviceScore: 4.9,
    rank: 12
  };

  const pendingReminders = [
    { title: "待接新单", count: 3, color: "text-red-500", bg: "bg-red-50" },
    { title: "配送中", count: 2, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  const notifications = [
    "【公告】本月配送星级考核标准已更新，请各位配送员及时查看。",
    "【预警】今日午后将有短时强降雨，请注意行车安全，做好防雨措施。",
    "【提醒】新版水票扫码核销功能已上线，可在‘工具箱’查看教程。"
  ];

  const handleLogout = () => {
    localStorage.removeItem('delivery_session');
    navigate('/');
  };

  const menuItems = [
    { label: '账目与对账', sub: '对账记录/费用明细', icon: <Wallet size={18} className="text-blue-500" />, path: '/delivery/finance' },
    { label: '采购申请', sub: '门店补货/耗材领用', icon: <Package size={18} className="text-orange-500" />, path: '/delivery/replenish' },
    { label: '服务分详情', sub: '用户评价/分值变动', icon: <Star size={18} className="text-yellow-500" />, path: '/delivery/home' },
    { label: '退出登录', sub: '退出当前配送账号', icon: <LogOut size={18} className="text-red-500" />, onClick: handleLogout, isDanger: true },
  ];

  return (
    <div className="space-y-4 pb-6 px-4 pt-4">
      {/* Profile & Score */}
      <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <Truck size={120} />
        </div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white">王师傅 (工号: 007)</h3>
            <p className="text-xs text-white/50 mt-1 font-medium">归属门店：昆明旗舰店</p>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 backdrop-blur-md border border-white/5 shadow-sm">
             <Star size={14} className="text-yellow-400 fill-yellow-400" />
             <span className="text-sm font-black">{stats.serviceScore}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">今日订单 (单)</p>
            <p className="text-2xl font-black mt-1 leading-none">{stats.todayOrders}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">今日配送费 (元)</p>
            <p className="text-2xl font-black mt-1 leading-none">¥{stats.todayEarnings}</p>
          </div>
        </div>
      </div>

      {/* Scrolling Notification Bar */}
      <div 
        onClick={() => navigate('/delivery/notices')}
        className="bg-blue-50/80 rounded-xl py-2.5 px-3 flex items-center gap-2 overflow-hidden border border-blue-100/50 cursor-pointer active:bg-blue-100 transition-colors"
      >
        <div className="shrink-0 bg-blue-500 text-white p-1.5 rounded-lg flex items-center justify-center">
          <Megaphone size={14} />
        </div>
        <div className="flex-1 overflow-hidden relative h-5">
          <div className="absolute inset-y-0 whitespace-nowrap animate-marquee flex items-center gap-8">
            <style>
              {`
                @keyframes marquee {
                  0% { transform: translateX(100%); }
                  100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                  animation: marquee 20s linear infinite;
                }
              `}
            </style>
            <span className="text-xs text-blue-800 font-bold">
              {notifications.join(' ｜ ')}
            </span>
            <span className="text-xs text-blue-800 font-bold">
              {notifications.join(' ｜ ')}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Access Notification */}
      <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
           <AlertCircle size={18} className="text-orange-500" />
           <span className="text-sm font-black text-gray-800">新订单提醒 (3)</span>
        </div>
        <button 
          onClick={() => setAudioAlert(!audioAlert)}
          className={`p-2 rounded-full transition-all active:scale-90 ${audioAlert ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-400'}`}
        >
          {audioAlert ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Main Grid Actions */}
      <div className="grid grid-cols-2 gap-4">
        {pendingReminders.map((rem, i) => (
          <div 
            key={i} 
            onClick={() => navigate('/delivery/orders')}
            className={`${rem.bg} p-4 rounded-xl border border-transparent shadow-sm active:scale-95 transition-transform cursor-pointer`}
          >
            <h4 className={`text-xs font-black uppercase tracking-wider ${rem.color}`}>{rem.title}</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-2xl font-black ${rem.color}`}>{rem.count}</span>
              <span className="text-[10px] text-gray-400 font-bold">单</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tool List */}
      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50 overflow-hidden border border-gray-100">
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => item.onClick ? item.onClick() : item.path && navigate(item.path)}
            className="flex items-center justify-between p-4 active:bg-gray-50 cursor-pointer group transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`${item.isDanger ? 'bg-red-50' : 'bg-gray-50'} p-2.5 rounded-xl group-active:bg-white transition-colors`}>{item.icon}</div>
              <div>
                <span className={`text-sm font-black block ${item.isDanger ? 'text-red-500' : 'text-gray-800'}`}>{item.label}</span>
                <span className="text-[10px] text-gray-400 font-medium">{item.sub}</span>
              </div>
            </div>
            <ChevronRight size={16} className={`transition-colors ${item.isDanger ? 'text-red-200 group-active:text-red-500' : 'text-gray-300 group-active:text-blue-500'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
