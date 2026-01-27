
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Crown, Truck, TicketPercent, Zap, Headphones, ShieldCheck, CheckCircle2 } from 'lucide-react';

const MembershipPage: React.FC = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const benefits = [
    { icon: <TicketPercent size={28} />, title: '全场9.6折', desc: '叠加优惠券' },
    { icon: <Truck size={28} />, title: '免配送费', desc: '无限次免邮' },
    { icon: <Zap size={28} />, title: '优先配送', desc: '高峰期优先' },
    { icon: <Headphones size={28} />, title: '专属客服', desc: '极速响应' },
  ];

  const handlePay = () => {
    if (!agreed) return;
    alert('支付成功！您已成为尊贵的豪华会员');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-24 relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-gray-800 to-gray-900 z-0" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl z-0" />

      {/* Navbar */}
      <div className="relative z-10 px-4 py-3 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-100 active:opacity-70">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">开通会员</h1>
      </div>

      {/* User Info & Card */}
      <div className="relative z-10 px-4 mt-4">
        <div className="flex items-center gap-3 mb-6 px-2">
          <img src="https://picsum.photos/100/100?random=50" className="w-10 h-10 rounded-full border border-gray-600" alt="" />
          <div>
            <p className="text-sm font-bold text-gray-100">水源用户_8829</p>
            <p className="text-xs text-gray-400">未开通会员</p>
          </div>
        </div>

        {/* VIP Card */}
        <div className="w-full aspect-[1.8/1] rounded-2xl bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-6 relative overflow-hidden shadow-2xl shadow-amber-900/50">
           {/* Card Texture */}
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute -bottom-10 -right-10 text-black opacity-10 rotate-12">
             <Crown size={180} />
           </div>
           
           <div className="relative z-10 h-full flex flex-col justify-between text-gray-900">
             <div className="flex justify-between items-start">
               <div>
                 <h2 className="text-2xl font-black italic tracking-tight">豪华会员</h2>
                 <p className="text-xs font-bold opacity-70 mt-1 uppercase tracking-wider">Premium Membership</p>
               </div>
               <Crown size={32} />
             </div>
             
             <div className="flex items-end gap-1">
               <span className="text-3xl font-black">9.6</span>
               <span className="text-sm font-bold mb-1.5">折</span>
               <div className="w-[1px] h-4 bg-gray-900/20 mx-2 mb-2" />
               <span className="text-sm font-bold mb-1.5">免配送费</span>
             </div>
           </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="relative z-10 px-4 mt-8">
        <h3 className="text-amber-200/80 font-bold text-sm mb-4 text-center">—— 会员尊享 4 大特权 ——</h3>
        <div className="grid grid-cols-2 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                {b.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-amber-100">{b.title}</div>
                <div className="text-[10px] text-gray-400">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Plan */}
      <div className="relative z-10 px-4 mt-8">
        <div className="bg-gradient-to-r from-amber-200 to-yellow-400 p-[1px] rounded-2xl">
          <div className="bg-gray-900 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden">
             <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-[10px] font-bold text-gray-900 px-2 py-0.5 rounded-br-lg z-10">
               限时特惠
             </div>
             <div>
               <p className="text-base font-bold text-white">年度会员</p>
               <p className="text-xs text-gray-400 mt-1 line-through">原价 ¥99.00</p>
             </div>
             <div className="flex items-baseline gap-1 text-amber-400">
                <span className="text-sm">¥</span>
                <span className="text-3xl font-black">9.9</span>
                <span className="text-xs text-gray-400">/年</span>
             </div>
          </div>
        </div>
      </div>

      {/* Agreement */}
      <div className="relative z-10 px-4 mt-6 flex items-center gap-2" onClick={() => setAgreed(!agreed)}>
        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${agreed ? 'bg-amber-500 border-amber-500 text-gray-900' : 'border-gray-500 bg-transparent'}`}>
          {agreed && <CheckCircle2 size={12} strokeWidth={4} />}
        </div>
        <p className="text-[10px] text-gray-400">
          开通即代表同意 <span className="text-amber-500">《会员服务协议》</span>，订阅周期内不可退款
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 safe-bottom z-50 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">总计</p>
          <div className="flex items-baseline gap-1 text-amber-500">
             <span className="text-sm font-bold">¥</span>
             <span className="text-2xl font-black">9.9</span>
          </div>
        </div>
        <button 
          onClick={handlePay}
          className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
            agreed 
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 shadow-lg shadow-amber-900/50 active:scale-95' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          立即支付开通
        </button>
      </div>
    </div>
  );
};

export default MembershipPage;
