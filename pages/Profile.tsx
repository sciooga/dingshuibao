
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  ChevronRight, 
  Wallet, 
  Ticket, 
  Package, 
  Star, 
  Clock, 
  Headphones, 
  Info,
  Award,
  LogOut,
  MapPin,
  MessageCircle,
  MessageSquare,
  Bell,
  ClipboardCheck,
  Truck,
  CheckCircle2,
  RotateCcw,
  Store,
  Gift,
  Trophy
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const user = {
    nickname: "水源用户_8829",
    avatar: "https://picsum.photos/100/100?random=50",
    phone: "138****9988",
    memberLevel: "普通用户",
    nextLevel: "白金会员",
    balance: "128.50",
    tickets: 12,
    points: 450,
    nextLevelPoints: 1000,
    isActivated: false
  };

  const pointsProgress = (user.points / user.nextLevelPoints) * 100;

  const assetItems = [
    { label: '我的余额', value: `¥${user.balance}`, icon: <Wallet size={20} className="text-blue-500" />, path: '/recharge' },
    { label: '我的水票', value: `${user.tickets}张`, icon: <Ticket size={20} className="text-orange-500" />, path: '/tickets' },
    { label: '我的积分', value: `${user.points}`, icon: <Star size={20} className="text-yellow-500" />, path: '/orders' },
    { label: '水桶押金', value: '2桶', icon: <Package size={20} className="text-indigo-500" />, path: '/deposit' },
  ];

  const orderStatuses = [
    { label: '待付款', icon: <Wallet size={22} />, count: 1 },
    { label: '待接单', icon: <Bell size={22} />, count: 0 },
    { label: '已接单', icon: <ClipboardCheck size={22} />, count: 0 },
    { label: '待配送', icon: <Package size={22} />, count: 2 },
    { label: '配送中', icon: <Truck size={22} />, count: 1 },
    { label: '已完成', icon: <CheckCircle2 size={22} />, count: 0 },
    { label: '售后中', icon: <MessageSquare size={22} />, count: 0 },
    { label: '已退款', icon: <RotateCcw size={22} />, count: 0 },
  ];

  const toolItems = [
    { label: '地址管理', icon: <MapPin size={22} />, color: 'text-gray-500' },
    { label: '我的预约', icon: <Clock size={22} />, color: 'text-gray-500', path: '/appointments' },
    { label: '企业服务', icon: <Headphones size={22} />, color: 'text-gray-500', path: '/corporate' },
    { label: '门店入驻', icon: <Store size={22} />, color: 'text-gray-500' },
    { label: '留言反馈', icon: <MessageCircle size={22} />, color: 'text-gray-500' },
    { label: '服务协议', icon: <Info size={22} />, color: 'text-gray-500' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    navigate('/login');
  };

  return (
    <div className="space-y-4 pb-10">
      {/* User Header */}
      <div className="bg-white p-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow-md" alt="Avatar" />
            <div className="absolute bottom-0 right-0 bg-blue-500 border-2 border-white p-1 rounded-full text-white">
              <Award size={10} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">{user.nickname}</h2>
              {!user.isActivated && (
                <button 
                  onClick={() => navigate('/login')}
                  className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold active:scale-95 transition-transform"
                >
                  立即激活
                </button>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">{user.phone} | {user.memberLevel}</p>
          </div>
        </div>
        <button onClick={() => navigate('/user-info')} className="text-gray-300 p-2 active:text-blue-500 transition-colors">
          <Settings size={22} />
        </button>
      </div>

      {/* Points Progress Bar */}
      <div className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 space-y-3">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-gray-700">积分升级进度</span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">再赚 {user.nextLevelPoints - user.points} 积分可升级</span>
          </div>
          
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${pointsProgress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-blue-600">{user.memberLevel}</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-gray-700">{user.points}</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-300">{user.nextLevelPoints}</span>
            </div>
            <span className="text-gray-400">{user.nextLevel}</span>
          </div>
        </div>
      </div>

      {/* Membership Card */}
      <div className="px-4">
        <div 
          onClick={() => navigate('/membership')}
          className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl shadow-lg relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
            <Award size={100} />
          </div>
          <div className="flex justify-between items-start text-white relative z-10">
            <div>
              <h3 className="text-amber-400 font-bold text-sm italic">豪华会员</h3>
              <p className="text-xs opacity-70 mt-1">开通尊享 1元余额 & 9积分奖励</p>
            </div>
            <button className="bg-amber-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
              立即开通
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="px-4">
        <div className="bg-white rounded-xl shadow-sm grid grid-cols-4 p-4 border border-gray-50">
          {assetItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-2 cursor-pointer active:opacity-70"
              onClick={() => item.path && navigate(item.path)}
            >
              <div className="bg-gray-50 p-2.5 rounded-lg">{item.icon}</div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-800">{item.value}</p>
                <p className="text-[10px] text-gray-400">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="px-4">
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">我的订单</h3>
            <button onClick={() => navigate('/orders')} className="text-xs text-gray-400 flex items-center">
              查看全部 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-y-6 pt-2">
            {orderStatuses.map((status, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-2 relative cursor-pointer active:opacity-60"
                onClick={() => navigate('/orders')}
              >
                <div className="text-gray-500">{status.icon}</div>
                <span className="text-[11px] text-gray-600 font-medium">{status.label}</span>
                {status.count > 0 && (
                  <span className="absolute -top-1 right-2 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {status.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="px-4">
        <div className="w-full h-24 rounded-xl overflow-hidden relative shadow-sm border border-gray-50 active:scale-[0.98] transition-transform cursor-pointer">
          <img 
            src="https://picsum.photos/800/300?random=102" 
            alt="Ad Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6">
             <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm shadow-sm">
               HOT
             </span>
             <h4 className="text-white font-bold text-sm flex items-center gap-2">
               <Gift size={16} className="text-amber-400" /> 推荐有礼
             </h4>
             <p className="text-white/80 text-[10px] mt-1.5">
               邀请好友注册入驻，最高领 <span className="text-amber-400 font-bold">¥50</span> 余额奖励
             </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-4">
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">常用工具</h3>
          </div>
          <div className="grid grid-cols-3 gap-y-6 pt-2">
            {toolItems.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => item.path && navigate(item.path)}
                className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60"
              >
                <div className={item.color}>{item.icon}</div>
                <span className="text-[11px] text-gray-600 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <button 
          onClick={handleLogout}
          className="w-full bg-white text-red-500 border border-red-50 px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <LogOut size={18} /> 退出登录
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
